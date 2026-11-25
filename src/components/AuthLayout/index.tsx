import type { ReactNode } from 'react';
import Brand from '../Brand';
import LocaleSwitch from '../LocaleSwitch';

interface AuthLayoutProps {
  children: ReactNode;
  panel?: ReactNode;
}

export default function AuthLayout({ children, panel }: AuthLayoutProps) {
  return (
    <div className="grid min-h-dvh grid-cols-1 bg-cream lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)]">
      <div className="flex min-h-dvh flex-col px-6 py-6 lg:px-8">
        <header className="flex h-16 items-center justify-between">
          <Brand />
          <LocaleSwitch />
        </header>
        <main className="flex-1 pt-[10vh] lg:pt-[14vh]">
          <div className="w-full max-w-[400px] lg:max-w-[360px]">{children}</div>
        </main>
      </div>

      <aside className="relative hidden overflow-hidden bg-sand lg:block">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span className="absolute inset-y-0 left-1/3 w-px bg-sand-line/40" />
          <span className="absolute inset-y-0 left-2/3 w-px bg-sand-line/40" />
        </div>
        <div className="relative flex h-full items-center p-12">{panel}</div>
      </aside>
    </div>
  );
}
