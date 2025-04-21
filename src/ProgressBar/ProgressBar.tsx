import React from 'react';

export type ProgressBarProps = {
  /** Current progress value (0–max) */
  value: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Show percentage label above the bar */
  showLabel?: boolean;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showLabel = false,
}) => {
  // clamp between 0 and max, then compute percentage
  const pct = Math.round((Math.min(Math.max(value, 0), max) / max) * 100);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="mb-1 text-sm font-medium text-gray-700">
          {pct}%
        </div>
      )}
      <div className="bg-gray-200 rounded h-4 overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-width duration-200"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
