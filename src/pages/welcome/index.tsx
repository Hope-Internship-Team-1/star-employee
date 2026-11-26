import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import { primaryButtonClassName, secondaryButtonClassName } from '../../components/buttonClassName';
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
        // The greeting is optional, so the page stays usable without it.
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <AuthLayout>
      <h1 className="font-page text-page-lg-mobile text-on-surface lg:text-page-lg">
        {t.welcome.title}
      </h1>

      {name && (
        <p className="font-body text-body-md text-text-secondary">
          {format(t.welcome.greeting, { name })}
        </p>
      )}
      <p className="font-body text-body-md text-text-secondary">{t.welcome.subtitle}</p>

      <ul className="divide-y divide-outline rounded-card border border-outline bg-surface-raised">
        {resume.modules.map((module) => (
          <li key={module.key} className="flex items-center justify-between px-card-pad py-grid-3">
            <span className="font-body text-body-md text-on-surface">
              {moduleLabels[module.key] ?? module.key}
            </span>
            <span className="font-meta text-meta-sm text-text-secondary">
              {t.welcome.notFilled}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-grid-3">
        <button
          type="button"
          className={primaryButtonClassName}
          onClick={() => navigate(path('/my-profile'))}
        >
          {t.welcome.completeResume}
        </button>
        <button
          type="button"
          className={secondaryButtonClassName}
          onClick={() => navigate(path('/jobs'))}
        >
          {t.welcome.browseJobs}
        </button>
      </div>
    </AuthLayout>
  );
}
