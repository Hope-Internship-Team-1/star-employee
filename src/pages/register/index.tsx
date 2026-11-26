import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { AsideSteps } from '../../components/AuthAside';
import AuthLayout from '../../components/AuthLayout';
import FormError from '../../components/FormError';
import { fieldClassName } from '../../components/fieldClassName';
import { useAuthFlow } from '../../context/authFlowContext';
import { useLocale, useMessages } from '../../i18n';
import { register } from '../../services/auth';
import { errorKey } from '../../services/errors';
import type { ErrorKey } from '../../services/errors';

interface EmailValues {
  email: string;
}

export default function RegisterPage() {
  const t = useMessages();
  const { locale } = useLocale();
  const navigate = useNavigate();
  const { setEmail } = useAuthFlow();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<ErrorKey | null>(null);

  async function onFinish(values: EmailValues) {
    setSubmitting(true);
    setError(null);

    try {
      await register({ email: values.email });
      setEmail(values.email);
      navigate(`/${locale}/register/code`);
    } catch (caught) {
      setError(errorKey(caught));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout panel={<AsideSteps current={1} />}>
      <h1 className="font-display text-[2.5rem] leading-none tracking-tight text-ink">
        {t.register.step1Title}
      </h1>

      <Form
        name="register-email"
        layout="vertical"
        requiredMark={false}
        onValuesChange={() => setError(null)}
        onFinish={onFinish}
        className="mt-8 [&_.ant-form-item]:mb-4"
      >
        <Form.Item
          label={t.register.emailLabel}
          name="email"
          rules={[
            { required: true, message: t.errors.emailInvalid },
            { type: 'email', message: t.errors.emailInvalid },
          ]}
        >
          <Input
            autoComplete="email"
            inputMode="email"
            placeholder={t.login.emailPlaceholder}
            className={fieldClassName}
          />
        </Form.Item>

        {error && <FormError message={t.errors[error]} />}

        <Button type="primary" htmlType="submit" block loading={submitting} className="!h-10">
          {t.register.continue}
        </Button>
      </Form>

      <p className="mt-6 text-sm text-ink-soft">
        <Link to={`/${locale}/login`} className="text-clay hover:underline">
          {t.register.backToLogin}
        </Link>
      </p>
    </AuthLayout>
  );
}
