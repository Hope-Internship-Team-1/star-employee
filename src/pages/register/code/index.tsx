import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';
import AuthLayout from '../../../components/AuthLayout';
import AuthStepper from '../../../components/AuthStepper';
import FormError from '../../../components/FormError';
import { monoFieldClassName } from '../../../components/fieldClassName';
import { primaryButtonClassName } from '../../../components/buttonClassName';
import { useAuthFlow } from '../../../context/authFlowContext';
import { format, useLocale, useMessages } from '../../../i18n';
import { requestOtp, verifyOtp } from '../../../services/auth';
import { errorKey } from '../../../services/errors';
import type { ErrorKey } from '../../../services/errors';

interface CodeValues {
  code: string;
}

export default function RegisterCodePage() {
  const t = useMessages();
  const { locale } = useLocale();
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
      navigate(`/${locale}/register/setup`);
    } catch (caught) {
      setError(errorKey(caught, 'verify'));
    } finally {
      setSubmitting(false);
    }
  }

  if (!email) return <Navigate to={`/${locale}/register`} replace />;

  return (
    <AuthLayout>
      <AuthStepper current={2} />

      <h1 className="font-page text-page-lg-mobile text-on-surface lg:text-page-lg">
        {t.register.step2Title}
      </h1>
      <p className="font-body text-body-md text-text-secondary">
        {format(t.register.sentTo, { email })}
      </p>

      <Form
        name="register-code"
        layout="vertical"
        requiredMark={false}
        onValuesChange={() => setError(null)}
        onFinish={onFinish}
        className="flex flex-col gap-grid-4"
      >
        <Form.Item
          label={t.login.codeLabel}
          name="code"
          extra={<span className="font-meta text-meta-sm">{t.login.codeHint}</span>}
          rules={[{ required: true, message: t.errors.codeRequired }]}
        >
          <Input
            autoComplete="one-time-code"
            inputMode="numeric"
            maxLength={6}
            placeholder={t.login.codePlaceholder}
            className={monoFieldClassName}
          />
        </Form.Item>

        {error && <FormError message={t.errors[error]} />}

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className={primaryButtonClassName}
        >
          {submitting ? t.login.submitting : t.register.verify}
        </button>
      </Form>

      <button
        type="button"
        onClick={resend}
        disabled={seconds > 0 || sending}
        className="min-h-11 self-start rounded-control font-label text-label-md text-primary transition-colors duration-hover-colour ease-hover-colour hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:text-text-secondary"
      >
        {seconds > 0 ? format(t.register.resendIn, { seconds }) : t.register.resend}
      </button>
    </AuthLayout>
  );
}
