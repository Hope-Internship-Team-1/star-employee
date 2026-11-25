import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input } from 'antd';
import { AsideNote } from '../../components/AuthAside';
import AuthLayout from '../../components/AuthLayout';
import FormError from '../../components/FormError';
import { fieldClassName } from '../../components/fieldClassName';
import { format, useMessages } from '../../i18n';
import { loginWithPassword, requestOtp, verifyOtp } from '../../services/auth';
import { errorKey } from '../../services/errors';
import type { ErrorKey } from '../../services/errors';

type TabId = 'password' | 'code';

interface EmailValues {
  email: string;
}

interface PasswordValues extends EmailValues {
  password: string;
}

interface CodeValues extends EmailValues {
  code: string;
}

export default function LoginPage() {
  const t = useMessages();
  const navigate = useNavigate();
  const [passwordForm] = Form.useForm<PasswordValues>();
  const [codeForm] = Form.useForm<CodeValues>();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [tab, setTab] = useState<TabId>('password');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sending, setSending] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<ErrorKey | null>(null);

  const tabs: Array<{ id: TabId; label: string }> = [
    { id: 'password', label: t.login.tabPassword },
    { id: 'code', label: t.login.tabCode },
  ];

  useEffect(() => {
    if (seconds === 0) return;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds]);

  function selectTab(next: TabId) {
    setTab(next);
    setError(null);
    setCodeSent(false);
    setSeconds(0);

    if (next === 'password') passwordForm.setFieldsValue({ email });
    else codeForm.setFieldsValue({ email });
  }

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;

    event.preventDefault();
    const last = tabs.length - 1;
    let next: number;

    if (event.key === 'ArrowLeft') next = index === 0 ? last : index - 1;
    else if (event.key === 'ArrowRight') next = index === last ? 0 : index + 1;
    else if (event.key === 'Home') next = 0;
    else next = last;

    selectTab(tabs[next].id);
    tabRefs.current[next]?.focus();
  }

  async function onPasswordFinish(values: PasswordValues) {
    setSubmitting(true);
    setError(null);

    try {
      await loginWithPassword(values.email, values.password);
      navigate('/', { replace: true });
    } catch (caught) {
      setError(errorKey(caught, 'login'));
    } finally {
      setSubmitting(false);
    }
  }

  async function sendCode() {
    setError(null);

    let emailValue: string;
    try {
      const values = await codeForm.validateFields(['email']);
      emailValue = values.email;
    } catch {
      return;
    }

    setSending(true);
    try {
      await requestOtp(emailValue);
      setEmail(emailValue);
      setCodeSent(true);
      setSeconds(60);
    } catch (caught) {
      setError(errorKey(caught, 'login'));
    } finally {
      setSending(false);
    }
  }

  async function onCodeFinish(values: CodeValues) {
    setSubmitting(true);
    setError(null);

    try {
      await verifyOtp(values.email, values.code);
      navigate('/', { replace: true });
    } catch (caught) {
      setError(errorKey(caught, 'verify'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthLayout panel={<AsideNote text={t.panel.loginLine} />}>
      <h1 className="font-display text-[2.5rem] leading-none tracking-tight text-ink">
        {t.login.title}
      </h1>

      <div
        role="tablist"
        aria-label={t.login.title}
        className="mt-8 flex gap-6 border-b border-line"
      >
        {tabs.map((item, index) => {
          const selected = tab === item.id;

          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`login-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`login-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectTab(item.id)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
              className={[
                '-mb-px border-b-2 pb-3 text-sm font-medium transition-colors',
                selected
                  ? 'border-clay text-ink'
                  : 'border-transparent text-ink-soft hover:text-ink',
              ].join(' ')}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        id="login-panel-password"
        role="tabpanel"
        aria-labelledby="login-tab-password"
        tabIndex={0}
        hidden={tab !== 'password'}
        className="mt-6"
      >
        <Form
          name="login-password"
          form={passwordForm}
          layout="vertical"
          requiredMark={false}
          initialValues={{ email }}
          onValuesChange={(_, all) => {
            setEmail(all.email ?? '');
            setError(null);
          }}
          onFinish={onPasswordFinish}
          className="[&_.ant-form-item]:mb-4"
        >
          <Form.Item
            label={t.login.emailLabel}
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

          <Form.Item
            label={t.login.passwordLabel}
            name="password"
            rules={[{ required: true, message: t.errors.passwordRequired }]}
          >
            <Input.Password
              autoComplete="current-password"
              placeholder={t.login.passwordPlaceholder}
              className={fieldClassName}
            />
          </Form.Item>

          {error && <FormError message={t.errors[error]} />}

          <Button type="primary" htmlType="submit" block loading={submitting} className="!h-10">
            {t.login.submit}
          </Button>
        </Form>
      </div>

      <div
        id="login-panel-code"
        role="tabpanel"
        aria-labelledby="login-tab-code"
        tabIndex={0}
        hidden={tab !== 'code'}
        className="mt-6"
      >
        <Form
          name="login-code"
          form={codeForm}
          layout="vertical"
          requiredMark={false}
          initialValues={{ email }}
          onValuesChange={(_, all) => {
            setEmail(all.email ?? '');
            setError(null);
          }}
          onFinish={onCodeFinish}
          className="[&_.ant-form-item]:mb-4"
        >
          <Form.Item
            label={t.login.emailLabel}
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

          <Button
            type="default"
            htmlType="button"
            block
            loading={sending}
            disabled={seconds > 0}
            onClick={sendCode}
            className="!h-10 border-line"
          >
            {seconds > 0 ? format(t.login.resendIn, { seconds }) : t.login.sendCode}
          </Button>

          {codeSent && (
            <Form.Item
              label={t.login.codeLabel}
              name="code"
              extra={t.login.codeHint}
              rules={[{ required: true, message: t.errors.codeRequired }]}
              className="!mt-4"
            >
              <Input
                autoComplete="one-time-code"
                inputMode="numeric"
                maxLength={6}
                className={fieldClassName}
              />
            </Form.Item>
          )}

          {error && <FormError message={t.errors[error]} />}

          {codeSent && (
            <Button type="primary" htmlType="submit" block loading={submitting} className="!h-10">
              {t.login.submit}
            </Button>
          )}
        </Form>
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        {t.login.noAccount}{' '}
        <Link to="/register" className="text-clay hover:underline">
          {t.login.registerLink}
        </Link>
      </p>
    </AuthLayout>
  );
}
