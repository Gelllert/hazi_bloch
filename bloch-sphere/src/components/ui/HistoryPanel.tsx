import React from 'react';
import type { StateHistoryItem } from '../../types/quantum';
import { Panel, Button } from './primitives';

interface Props {
  history: StateHistoryItem[];
  onRevert: (index: number) => void;
  onReset: () => void;
}

export const HistoryPanel: React.FC<Props> = ({ history, onRevert, onReset }) => (
  <Panel
    className="flex-1 min-h-0"
    title={`Műveletek`}
    accent="slate"
    action={
      <Button variant="slate" className="text-xs py-1 px-2.5" onClick={onReset}>
        Reset
      </Button>
    }
  >
    <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
      {history.map((item, index) => {
        const isCurrent = index === history.length - 1;
        return (
          <div
            key={index}
            className={`flex items-center justify-between text-xs px-3 py-2 rounded-lg border ${
              isCurrent
                ? 'bg-slate-700/80 border-amber-500/50 text-white font-medium'
                : 'bg-slate-900/70 border-slate-800 text-slate-300'
            }`}
          >
            <span>
              <span className="font-mono text-slate-400 mr-2">#{index}</span>
              {item.label}
            </span>
            {!isCurrent && (
              <button
                onClick={() => onRevert(index)}
                className="text-amber-400 hover:text-amber-300 underline cursor-pointer"
              >
                Vissza ide
              </button>
            )}
          </div>
        );
      })}
    </div>
  </Panel>
);