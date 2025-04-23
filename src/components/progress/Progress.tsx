import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const progressVariants = cva(
  'w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800',
  {
    variants: {
      size: {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const progressBarVariants = cva(
  'h-full rounded-full transition-all duration-500 ease-out',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500',
        secondary: 'bg-secondary-500',
        tertiary: 'bg-tertiary-500',
        success: 'bg-success-500',
        warning: 'bg-warning-500',
        error: 'bg-error-500',
        info: 'bg-info-500',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressBarVariants> {
  value?: number;
  max?: number;
  showValue?: boolean;
  striped?: boolean;
  animated?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      size,
      variant,
      value = 0,
      max = 100,
      showValue = false,
      striped = false,
      animated = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div className="space-y-1">
        {showValue && (
          <div className="flex justify-between text-sm text-neutral-600 dark:text-neutral-400">
            <span>Progress</span>
            <span>{Math.round(percentage)}%</span>
          </div>
        )}
        <div
          ref={ref}
          className={progressVariants({ size, className })}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          {...props}
        >
          <div
            className={progressBarVariants({
              variant,
              className: `${striped ? 'progress-striped' : ''} ${
                animated ? 'progress-animated' : ''
              }`,
            })}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';

export { Progress };