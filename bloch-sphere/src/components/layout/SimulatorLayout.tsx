import React from 'react';

interface SimulatorLayoutProps {
  headerTitle: string;
  headerBadge?: React.ReactNode;
  leftSidebar: React.ReactNode;
  viewport: React.ReactNode;
  rightSidebar: React.ReactNode;
}

export const SimulatorLayout: React.FC<SimulatorLayoutProps> = ({
  headerTitle,
  headerBadge,
  leftSidebar,
  viewport,
  rightSidebar,
}) => {
  return (
    <div className="min-h-screen lg:h-screen w-full lg:overflow-hidden bg-slate-950 text-slate-200 flex flex-col font-sans select-none">
      <header className="h-12 px-4 border-b border-slate-800 bg-slate-900 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
          <h1 className="text-sm font-bold tracking-wide text-white">{headerTitle}</h1>
        </div>
        {headerBadge}
      </header>

      <main className="flex-1 min-h-0 w-full grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)_330px] gap-3 p-3">
        {/* közép: mobilon elsőként jelenik meg (order-first lg:order-none) és fix 380px magas */}
        <section className="order-first lg:order-none h-[380px] sm:h-[440px] lg:h-full min-h-0 w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-900 relative">
          {viewport}
        </section>

        {/* bal oldal: history (desktopon az 1. oszlopba kerül) */}
        <aside className="lg:order-first min-h-0 max-h-[300px] lg:max-h-none flex flex-col overflow-hidden">
          {leftSidebar}
        </aside>

        {/* jobb oldal: Kontrollok */}
        <aside className="min-h-0 flex flex-col gap-3 lg:overflow-y-auto pr-1">
          {rightSidebar}
        </aside>
      </main>
    </div>
  );
};