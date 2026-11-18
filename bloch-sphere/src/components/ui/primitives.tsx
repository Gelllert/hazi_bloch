// src/components/ui/primitives.tsx
import React from 'react';

type AccentColor = 'blue' | 'emerald' | 'purple' | 'amber' | 'orange' | 'slate';

const TITLE_COLORS: Record<AccentColor, string> = {
  blue: 'text-blue-400',
  emerald: 'text-emerald-400',
  purple: 'text-purple-400',
  amber: 'text-amber-400',
  orange: 'text-orange-400',
  slate: 'text-slate-300',
};

const BUTTON_VARIANTS: Record<AccentColor, string> = {
  blue: 'bg-blue-600 hover:bg-blue-500 border-blue-500 text-white',
  emerald: 'bg-emerald-700/80 hover:bg-emerald-600 border-emerald-500/60 text-white',
  purple: 'bg-purple-600 hover:bg-purple-500 border-purple-500 text-white',
  amber: 'bg-amber-600 hover:bg-amber-500 border-amber-500 text-white',
  orange: 'bg-orange-600 hover:bg-orange-500 border-orange-500 text-white',
  slate: 'bg-slate-700/80 hover:bg-slate-600 border-slate-600 text-slate-200',
};

interface PanelProps {
  title?: string;
  accent?: AccentColor;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const Panel: React.FC<PanelProps> = ({
  title,
  accent = 'slate',
  action,
  children,
  className = '',
}) => (
  <section
    className={`bg-slate-800/90 backdrop-blur-sm p-4 rounded-xl border border-slate-700/80 shadow-lg flex flex-col gap-3 ${className}`}
  >
    {(title || action) && (
      <header className="flex items-center justify-between border-b border-slate-700/60 pb-2">
        {title && (
          <h2 className={`text-sm font-semibold uppercase tracking-wider ${TITLE_COLORS[accent]}`}>
            {title}
          </h2>
        )}
        {action && <div>{action}</div>}
      </header>
    )}
    {children}
  </section>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: AccentColor;
  active?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'slate',
  active = false,
  fullWidth = false,
  className = '',
  children,
  ...props
}) => (
  <button
    {...props}
    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all duration-150 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
      active
        ? 'bg-amber-600 border-amber-400 text-white shadow-sm'
        : BUTTON_VARIANTS[variant]
    } ${fullWidth ? 'w-full' : ''} ${className}`}
  >
    {children}
  </button>
);

interface SliderFieldProps {
  label: string;
  valueDisplay: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}

export const SliderField: React.FC<SliderFieldProps> = ({
  label,
  valueDisplay,
  min,
  max,
  step,
  value,
  onChange,
}) => (
  <div className="flex flex-col gap-1.5">
    <div className="flex justify-between text-xs text-slate-300">
      <span>{label}</span>
      <span className="font-mono text-slate-100 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
        {valueDisplay}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full accent-amber-500 cursor-pointer"
    />
  </div>
);