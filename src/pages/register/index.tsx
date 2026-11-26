import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';
import AuthLayout from '../../components/AuthLayout';
import AuthStepper from '../../components/AuthStepper';
import FormError from '../../components/FormError';
import { bodyFieldClassName } from '../../components/fieldClassName';
import { primaryButtonClassName } from '../../components/buttonClassName';
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
    <AuthLayout>
      <AuthStepper current={1} />

      <h1 className="font-page text-page-lg-mobile text-on-surface lg:text-page-lg">
        {t.register.step1Title}
      </h1>

      <Form
        name="register-email"
        layout="vertical"
        requiredMark={false}
        onValuesChange={() => setError(null)}
        onFinish={onFinish}
        className="flex flex-col gap-grid-4"
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
            className={bodyFieldClassName}
          />
        </Form.Item>

        {error && <FormError message={t.errors[error]} />}

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className={primaryButtonClassName}
        >
          {submitting ? t.register.submitting : t.register.continue}
        </button>
      </Form>

      <p className="font-body text-body-sm text-text-secondary">
        <Link
          to={`/${locale}/login`}
          className="inline-flex min-h-11 items-center rounded-control font-label text-label-md text-primary transition-colors duration-hover-colour ease-hover-colour hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          {t.register.backToLogin}
        </Link>
      </p>
    </AuthLayout>
  );
}
