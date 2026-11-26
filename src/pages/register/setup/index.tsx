import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';
import AuthLayout from '../../../components/AuthLayout';
import AuthStepper from '../../../components/AuthStepper';
import FormError from '../../../components/FormError';
import { bodyFieldClassName } from '../../../components/fieldClassName';
import { primaryButtonClassName } from '../../../components/buttonClassName';
import { useAuthFlow } from '../../../context/authFlowContext';
import { useLocale, useMessages } from '../../../i18n';
import { errorKey } from '../../../services/errors';
import { completeRegistration } from '../../../services/registration';
import { isPasswordLengthValid, passwordsMatch } from '../../../services/validation';
import type { ErrorKey } from '../../../services/errors';

interface SetupValues {
  name: string;
  password: string;
  confirm: string;
}

export default function RegisterSetupPage() {
  const t = useMessages();
  const { locale } = useLocale();
  const navigate = useNavigate();
  const { email, reset } = useAuthFlow();
  const [form] = Form.useForm<SetupValues>();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<ErrorKey | null>(null);

  async function onFinish(values: SetupValues) {
    setSubmitting(true);
    setError(null);

    try {
      await completeRegistration({ name: values.name, password: values.password });
      reset();
      navigate(`/${locale}/welcome`, { replace: true });
    } catch (caught) {
      setError(errorKey(caught));
    } finally {
      setSubmitting(false);
    }
  }

  if (!email) return <Navigate to={`/${locale}/register`} replace />;

  return (
    <AuthLayout>
      <AuthStepper current={3} />

      <h1 className="font-page text-page-lg-mobile text-on-surface lg:text-page-lg">
        {t.register.step3Title}
      </h1>
      <p className="font-body text-body-sm text-text-secondary">
        {t.register.emailLabel}: <span className="font-mono text-mono-meta">{email}</span>
      </p>

      <Form
        form={form}
        name="register-setup"
        layout="vertical"
        requiredMark={false}
        onValuesChange={() => setError(null)}
        onFinish={onFinish}
        className="flex flex-col gap-grid-4"
      >
        <Form.Item
          label={t.register.fullName}
          name="name"
          rules={[
            { required: true, message: t.errors.nameRequired },
            { max: 100, message: t.errors.nameTooLong },
          ]}
        >
          <Input
            autoComplete="name"
            placeholder={t.register.fullNamePlaceholder}
            className={bodyFieldClassName}
          />
        </Form.Item>

        <Form.Item
          label={t.register.passwordLabel}
          name="password"
          extra={<span className="font-meta text-meta-sm">{t.register.passwordHint}</span>}
          rules={[
            { required: true, message: t.errors.passwordRequired },
            {
              validator: (_, value: string) => {
                if (!value || isPasswordLengthValid(value)) return Promise.resolve();
                return Promise.reject(new Error(t.register.passwordHint));
              },
            },
          ]}
        >
          <Input.Password autoComplete="new-password" className={bodyFieldClassName} />
        </Form.Item>

        <Form.Item
          label={t.register.confirmPasswordLabel}
          name="confirm"
          validateTrigger="onBlur"
          rules={[
            { required: true, message: t.errors.confirmRequired },
            {
              validator: (_, value: string) => {
                const password = (form.getFieldValue('password') as string | undefined) ?? '';
                if (!value || passwordsMatch(password, value)) return Promise.resolve();
                return Promise.reject(new Error(t.register.passwordMismatch));
              },
            },
          ]}
        >
          <Input.Password autoComplete="new-password" className={bodyFieldClassName} />
        </Form.Item>

        {error && <FormError message={t.errors[error]} />}

        <button
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
          className={primaryButtonClassName}
        >
          {submitting ? t.register.submitting : t.register.finish}
        </button>
      </Form>
    </AuthLayout>
  );
}
