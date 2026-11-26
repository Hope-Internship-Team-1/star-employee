import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { AsideSteps } from '../../../components/AuthAside';
import AuthLayout from '../../../components/AuthLayout';
import FormError from '../../../components/FormError';
import { fieldClassName } from '../../../components/fieldClassName';
import { useAuthFlow } from '../../../context/authFlowContext';
import { format, useLocalePath, useMessages } from '../../../i18n';
import { requestOtp, verifyOtp } from '../../../services/auth';
import { errorKey } from '../../../services/errors';
import type { ErrorKey } from '../../../services/errors';

interface CodeValues {
  code: string;
}

export default function RegisterCodePage() {
  const t = useMessages();
  const path = useLocalePath();
  const navigate = useNavigate();
  const { email } = useAuthFlow();
  const [submitting, setSubmitting] = useState(false);
  const [sending, setSending] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [error, setError] = useState<ErrorKey | null>(null);

  useEffect(() => {
    if (seconds === 0) return;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds]);

  async function resend() {
    if (seconds > 0) return;

    setSending(true);
    setError(null);

    try {
      await requestOtp(email);
      setSeconds(60);
    } catch (caught) {
      setError(errorKey(caught));
    } finally {
      setSending(false);
    }
  }

  async function onFinish(values: CodeValues) {
    setSubmitting(true);
    setError(null);

    try {
      await verifyOtp(email, values.code);
      navigate(path('/register/setup'));
    } catch (caught) {
      setError(errorKey(caught, 'verify'));
    } finally {
      setSubmitting(false);
    }
  }

  if (!email) return <Navigate to={path('/register')} replace />;

  return (
    <AuthLayout panel={<AsideSteps current={2} />}>
      <h1 className="font-display text-[2.5rem] leading-none tracking-tight text-ink">
        {t.register.step2Title}
      </h1>
      <p className="mt-4 text-sm text-ink-soft">{format(t.register.sentTo, { email })}</p>

      <Form
        name="register-code"
        layout="vertical"
        requiredMark={false}
        onValuesChange={() => setError(null)}
        onFinish={onFinish}
        className="mt-6 [&_.ant-form-item]:mb-4"
      >
        <Form.Item
          label={t.login.codeLabel}
          name="code"
          extra={t.login.codeHint}
          rules={[{ required: true, message: t.errors.codeRequired }]}
        >
          <Input
            autoComplete="one-time-code"
            inputMode="numeric"
            maxLength={6}
            className={fieldClassName}
          />
        </Form.Item>

        {error && <FormError message={t.errors[error]} />}

        <Button type="primary" htmlType="submit" block loading={submitting} className="!h-10">
          {t.register.verify}
        </Button>
      </Form>

      <button
        type="button"
        onClick={resend}
        disabled={seconds > 0 || sending}
        className="mt-4 text-sm text-clay hover:underline disabled:text-ink-soft disabled:no-underline"
      >
        {seconds > 0 ? format(t.register.resendIn, { seconds }) : t.register.resend}
      </button>
    </AuthLayout>
  );
}
