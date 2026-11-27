import type { ReactNode } from 'react';
import Brand from '../Brand';
import LocaleSwitch from '../LocaleSwitch';
import Poster from '../Poster';

interface AuthLayoutProps {
  children: ReactNode;
  withPoster?: boolean;
}

export default function AuthLayout({ children, withPoster = false }: AuthLayoutProps) {
  return (
    <div className="grid min-h-dvh grid-cols-1 bg-surface lg:grid-cols-12">
      <div className="es-page-enter flex min-h-dvh flex-col bg-surface px-grid-4 py-card-pad sm:px-page-edge sm:py-section-md lg:col-span-5 lg:border-r lg:border-outline lg:px-section-md lg:py-card-pad-lg">
        <header className="flex h-16 items-center justify-between gap-grid-4">
          <Brand />
          <LocaleSwitch />
        </header>
        <main className="mx-auto flex w-full max-w-[520px] flex-1 flex-col gap-card-pad-lg pb-section-md pt-section-sm md:pt-section-md lg:mx-0">
          {children}
        </main>
      </div>

      {withPoster && <Poster />}
    </div>
  );
}
