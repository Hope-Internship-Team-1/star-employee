import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { AsideSteps } from '../../../components/AuthAside';
import AuthLayout from '../../../components/AuthLayout';
import FormError from '../../../components/FormError';
import { fieldClassName } from '../../../components/fieldClassName';
import { useAuthFlow } from '../../../context/authFlowContext';
import { useLocalePath, useMessages } from '../../../i18n';
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
  const path = useLocalePath();
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
      navigate(path('/welcome'), { replace: true });
    } catch (caught) {
      setError(errorKey(caught));
    } finally {
      setSubmitting(false);
    }
  }

  if (!email) return <Navigate to={path('/register')} replace />;

  return (
    <AuthLayout panel={<AsideSteps current={3} />}>
      <h1 className="font-display text-[2.5rem] leading-none tracking-tight text-ink">
        {t.register.step3Title}
      </h1>
      <p className="mt-4 text-sm text-ink-soft">
        {t.register.emailLabel}: {email}
      </p>

      <Form
        form={form}
        name="register-setup"
        layout="vertical"
        requiredMark={false}
        onValuesChange={() => setError(null)}
        onFinish={onFinish}
        className="mt-6 [&_.ant-form-item]:mb-4"
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
            className={fieldClassName}
          />
        </Form.Item>

        <Form.Item
          label={t.register.passwordLabel}
          name="password"
          extra={t.register.passwordHint}
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
          <Input.Password autoComplete="new-password" className={fieldClassName} />
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
          <Input.Password autoComplete="new-password" className={fieldClassName} />
        </Form.Item>

        {error && <FormError message={t.errors[error]} />}

        <Button type="primary" htmlType="submit" block loading={submitting} className="!h-10">
          {t.register.finish}
        </Button>
      </Form>
    </AuthLayout>
  );
}
