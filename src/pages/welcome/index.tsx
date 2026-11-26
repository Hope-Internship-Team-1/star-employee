import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { AsideDone } from '../../components/AuthAside';
import AuthLayout from '../../components/AuthLayout';
import { format, useLocalePath, useMessages } from '../../i18n';
import { getMe } from '../../services/auth';
import { getResumeStatus } from '../../services/resume';

export default function WelcomePage() {
  const t = useMessages();
  const path = useLocalePath();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const resume = getResumeStatus();

  const moduleLabels: Record<string, string> = {
    education: t.welcome.education,
    work_history: t.welcome.workHistory,
  };

  useEffect(() => {
    let active = true;

    getMe()
      .then((user) => {
        if (active) setName(user.name ?? '');
      })
      .catch(() => {
        // Keep the page usable without a greeting.
      });

    return () => {
      active = false;
    };
  }, []);

  // Resume and job routes are not built yet.
  function goTo(target: string) {
    navigate(path(target));
  }

  return (
    <AuthLayout panel={<AsideDone text={t.panel.done} />}>
      <h1 className="font-display text-[2.5rem] leading-none tracking-tight text-ink">
        {t.welcome.title}
      </h1>

      {name && <p className="mt-3 text-sm text-ink-soft">{format(t.welcome.greeting, { name })}</p>}
      <p className="mt-4 text-sm text-ink-soft">{t.welcome.subtitle}</p>

      <ul className="mt-8 divide-y divide-line rounded-card border border-line bg-white">
        {resume.modules.map((module) => (
          <li key={module.key} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-ink">{moduleLabels[module.key] ?? module.key}</span>
            <span className="text-xs text-ink-soft">{t.welcome.notFilled}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-3">
        <Button type="primary" block className="!h-10" onClick={() => goTo('/my-profile')}>
          {t.welcome.completeResume}
        </Button>
        <Button block className="!h-10 border-line" onClick={() => goTo('/jobs')}>
          {t.welcome.browseJobs}
        </Button>
      </div>
    </AuthLayout>
  );
}
