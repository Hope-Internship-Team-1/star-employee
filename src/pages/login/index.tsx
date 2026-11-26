import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';
import AuthLayout from '../../components/AuthLayout';
import ErrorBanner from '../../components/ErrorBanner';
import { bodyFieldClassName, monoFieldClassName } from '../../components/fieldClassName';
import { primaryButtonClassName } from '../../components/buttonClassName';
import { AlertCircleIcon } from '../../components/Icons';
import { format, useLocalePath, useMessages } from '../../i18n';
import { loginWithPassword, requestOtp, verifyOtp } from '../../services/auth';
import { errorKey } from '../../services/errors';
import type { ErrorKey } from '../../services/errors';

type TabId = 'code' | 'password';

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
  const path = useLocalePath();
  const navigate = useNavigate();
  const [passwordForm] = Form.useForm<PasswordValues>();
  const [codeForm] = Form.useForm<CodeValues>();
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [tab, setTab] = useState<TabId>('code');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sending, setSending] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<ErrorKey | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsMissing, setTermsMissing] = useState(false);

  const tabs: Array<{ id: TabId; label: string }> = [
    { id: 'code', label: t.login.tabCode },
    { id: 'password', label: t.login.tabPassword },
  ];

  useEffect(() => {
    if (seconds === 0) return;
    const timer = window.setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds]);

  function resetError() {
    setError(null);
  }

  function selectTab(next: TabId) {
    setTab(next);
    setError(null);
    setSubmitting(false);
    setCodeSent(false);
    setSeconds(0);
    setTermsMissing(false);

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
    setError(null);
    setTermsMissing(false);

    // The backend has no field for terms consent, so this gate stays client-side.
    if (!termsAccepted) {
      setTermsMissing(true);
      return;
    }

    setSubmitting(true);

    try {
      await loginWithPassword(values.email, values.password);
      navigate(path(), { replace: true });
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
      navigate(path(), { replace: true });
    } catch (caught) {
      setError(errorKey(caught, 'verify'));
    } finally {
      setSubmitting(false);
    }
  }

  function retry() {
    setError(null);
    setSubmitting(false);
    setSending(false);
    setTermsMissing(false);
  }

  return (
    <AuthLayout withPoster>
      <section className="flex flex-col gap-card-pad-lg">
        <h1 className="font-page text-page-lg-mobile text-on-surface lg:text-page-lg">
          {t.login.title}
        </h1>

        {error && <ErrorBanner message={t.errors[error]} onRetry={retry} />}

        <div
          role="tablist"
          aria-label={t.login.title}
          className="flex items-center gap-card-pad-lg border-b border-outline"
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
                  '-mb-px min-h-11 border-b-2 pb-grid-2 transition-colors duration-hover-colour ease-hover-colour focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:min-h-0',
                  selected
                    ? 'border-primary font-label text-label-md text-on-surface'
                    : 'border-transparent font-body text-body-sm text-text-secondary hover:text-on-surface',
                ].join(' ')}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div
          id="login-panel-code"
          role="tabpanel"
          aria-labelledby="login-tab-code"
          hidden={tab !== 'code'}
        >
          <Form
            name="login-code"
            form={codeForm}
            layout="vertical"
            requiredMark={false}
            initialValues={{ email }}
            onValuesChange={(_, all) => {
              setEmail(all.email ?? '');
              resetError();
            }}
            onFinish={onCodeFinish}
            className="flex flex-col gap-grid-4"
          >
            <div className="flex flex-col gap-grid-1">
              <div className="flex items-center gap-grid-2">
                <Form.Item
                  className="!mb-0 w-full flex-1"
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
                    className={monoFieldClassName}
                  />
                </Form.Item>
                <button
                  type="button"
                  onClick={sendCode}
                  disabled={sending || seconds > 0}
                  className="mt-[30px] min-h-11 shrink-0 whitespace-nowrap rounded-control font-label text-label-md text-primary transition-colors duration-hover-colour ease-hover-colour hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {seconds > 0 ? format(t.login.resendInShort, { seconds }) : t.login.sendCode}
                </button>
              </div>
              <span className="sr-only" aria-live="polite">
                {seconds > 0 ? format(t.login.resendIn, { seconds }) : ''}
              </span>
            </div>

            {codeSent && (
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
            )}

            {codeSent && (
              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className={primaryButtonClassName}
              >
                {submitting ? t.login.submitting : t.login.submit}
              </button>
            )}
          </Form>
        </div>

        <div
          id="login-panel-password"
          role="tabpanel"
          aria-labelledby="login-tab-password"
          hidden={tab !== 'password'}
        >
          <Form
            name="login-password"
            form={passwordForm}
            layout="vertical"
            requiredMark={false}
            initialValues={{ email }}
            onValuesChange={(_, all) => {
              setEmail(all.email ?? '');
              resetError();
            }}
            onFinish={onPasswordFinish}
            className="flex flex-col gap-grid-4"
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
                className={bodyFieldClassName}
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
                className={bodyFieldClassName}
              />
            </Form.Item>

            <div className="flex flex-col gap-grid-1 pt-grid-1">
              <label className="inline-flex min-h-11 cursor-pointer items-start gap-grid-2 py-grid-1">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(event) => {
                    setTermsAccepted(event.target.checked);
                    if (event.target.checked) setTermsMissing(false);
                  }}
                  className="mt-grid-1 h-4 w-4 shrink-0 rounded-control border border-outline bg-surface-raised accent-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                />
                <span className="font-body text-body-sm text-text-secondary">{t.login.terms}</span>
              </label>
              {termsMissing && (
                <p
                  role="alert"
                  className="flex items-center gap-grid-1 font-meta text-meta-md text-on-surface"
                >
                  <AlertCircleIcon />
                  <span>{t.login.termsRequired}</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              aria-busy={submitting}
              className={primaryButtonClassName}
            >
              {submitting ? t.login.submitting : t.login.submit}
            </button>
          </Form>
        </div>

        <p className="font-body text-body-sm text-text-secondary">
          {t.login.noAccount}{' '}
          <Link
            to={path('/register')}
            className="ml-grid-1 inline-flex min-h-11 items-center rounded-control font-label text-label-md text-primary transition-colors duration-hover-colour ease-hover-colour hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {t.login.registerLink}
          </Link>
        </p>
      </section>
    </AuthLayout>
  );
}
