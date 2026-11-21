import React from 'react';
import { ArrowUpRight, ArrowDownRight, AlertTriangle } from 'lucide-react';

export const MetricCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'indigo', // 'indigo', 'rose', 'emerald', 'amber'
  trend,
  isAlert = false,
}) => {
  const variantStyles = {
    indigo: {
      border: 'border-slate-800 hover:border-indigo-500/50',
      iconBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      valueColor: 'text-white',
      glow: 'hover:shadow-indigo-500/10',
    },
    rose: {
      border: 'border-rose-900/60 bg-rose-950/20 hover:border-rose-500/80',
      iconBg: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      valueColor: 'text-rose-400',
      glow: 'shadow-lg shadow-rose-950/40 glow-rose',
    },
    emerald: {
      border: 'border-slate-800 hover:border-emerald-500/50',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      valueColor: 'text-white',
      glow: 'hover:shadow-emerald-500/10',
    },
    amber: {
      border: 'border-slate-800 hover:border-amber-500/50',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      valueColor: 'text-white',
      glow: 'hover:shadow-amber-500/10',
    },
  };

  const style = variantStyles[variant] || variantStyles.indigo;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-slate-900/70 backdrop-blur-xl p-5 border transition-all duration-200 ${style.border} ${style.glow}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className={`text-3xl font-extrabold tracking-tight ${style.valueColor}`}>
              {value}
            </h3>
            {isAlert && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-400 px-2 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 animate-pulse">
                <AlertTriangle className="w-3 h-3" /> Urgent
              </span>
            )}
          </div>
          {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
        </div>

        <div className={`p-3 rounded-xl border ${style.iconBg}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {trend && (
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-slate-400">
          {trend.positive ? (
            <span className="flex items-center text-emerald-400 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
              {trend.value}
            </span>
          ) : (
            <span className="flex items-center text-rose-400 font-semibold">
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
              {trend.value}
            </span>
          )}
          <span>{trend.label}</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;
