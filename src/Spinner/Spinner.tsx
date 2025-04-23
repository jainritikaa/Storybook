import React, { useEffect, useState } from 'react';

// Define all types at the top
export const spinnerVariants = ['primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral'] as const;
export type SpinnerVariant = typeof spinnerVariants[number];

export const spinnerSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type SpinnerSize = typeof spinnerSizes[number];

export const spinnerSpeeds = ['slow', 'normal', 'fast'] as const;
export type SpinnerSpeed = typeof spinnerSpeeds[number];

export const spinnerStyles = ['classic', 'striped', 'gradient', 'pulse'] as const;
export type SpinnerStyle = typeof spinnerStyles[number];

export const spinnerThicknesses = ['thin', 'normal', 'thick'] as const;
export type SpinnerThickness = typeof spinnerThicknesses[number];

export const spinnerDirections = ['clockwise', 'counter-clockwise'] as const;
export type SpinnerDirection = typeof spinnerDirections[number];

export const spinnerStates = ['loading', 'success', 'error'] as const;
export type SpinnerState = typeof spinnerStates[number];

export type LabelColor = 'primary' | 'secondary' | 'neutral';

interface SpinnerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  speed?: SpinnerSpeed;
  spinnerStyle?: SpinnerStyle;
  label?: string;
  labelColor?: LabelColor;
  showTrack?: boolean;
  trackColor?: string;
  thickness?: SpinnerThickness;
  direction?: SpinnerDirection;
  state?: SpinnerState;
  onComplete?: () => void;
  pulseColor?: string;
  showCompletionTick?: boolean;
}

// Utility objects
const sizeClasses: Record<SpinnerSize, string> = {
  xs: 'h-4 w-4',
  sm: 'h-6 w-6',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16'
};

const borderClasses: Record<SpinnerSize, string> = {
  xs: 'border-2',
  sm: 'border-[3px]',
  md: 'border-4',
  lg: 'border-[5px]',
  xl: 'border-[6px]'
};

const thicknessClasses: Record<SpinnerThickness, string> = {
  thin: 'border-[2px]',
  normal: 'border-[3px]',
  thick: 'border-[6px]'
};

const speedClasses: Record<SpinnerSpeed, string> = {
  slow: 'animate-[spin_2s_linear_infinite]',
  normal: 'animate-[spin_1s_linear_infinite]',
  fast: 'animate-[spin_0.5s_linear_infinite]'
};

const directionClasses: Record<SpinnerDirection, string> = {
  clockwise: '',
  'counter-clockwise': 'animate-[spin-reverse_1s_linear_infinite]'
};

const variantBorderColors: Record<SpinnerVariant, string> = {
  primary: 'border-t-primary-500 border-r-primary-500',
  secondary: 'border-t-secondary-500 border-r-secondary-500',
  success: 'border-t-success-500 border-r-success-500',
  warning: 'border-t-warning-500 border-r-warning-500',
  error: 'border-t-error-500 border-r-error-500',
  info: 'border-t-info-500 border-r-info-500',
  neutral: 'border-t-neutral-500 border-r-neutral-500'
};

const stateBackgroundColors: Record<SpinnerState, string> = {
  loading: 'bg-primary-500',
  success: 'bg-success-500',
  error: 'bg-error-500'
};

const labelSizeClasses: Record<SpinnerSize, string> = {
  xs: 'text-xs mt-1',
  sm: 'text-sm mt-1.5',
  md: 'text-base mt-2',
  lg: 'text-lg mt-3',
  xl: 'text-xl mt-4'
};

const labelColorClasses: Record<LabelColor, string> = {
  primary: 'text-primary-500',
  secondary: 'text-secondary-500',
  neutral: 'text-neutral-900 dark:text-neutral-100'
};

// Sub-components
const Checkmark = ({ size = 'md', color = 'success-500' }: { size: SpinnerSize, color?: string }) => {
  const strokeWidth = size === 'xl' ? 3 : size === 'lg' ? 2.5 : 2;
  
  return (
    <div className="relative" style={{ width: sizeClasses[size], height: sizeClasses[size] }}>
      <div className={`absolute inset-0 rounded-full bg-${color} bg-opacity-20`} />
      <svg 
        className="absolute animate-checkmark" 
        viewBox="0 0 52 52"
        style={{
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      >
        <path
          className="animate-checkmark-check"
          fill="none"
          stroke="white"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="48"
          strokeDashoffset="48"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
        />
      </svg>
    </div>
  );
};

const ErrorX = ({ size = 'md', color = 'error-500' }: { size: SpinnerSize, color?: string }) => {
  const strokeWidth = size === 'xl' ? 3 : size === 'lg' ? 2.5 : 2;
  
  return (
    <div className="relative" style={{ width: sizeClasses[size], height: sizeClasses[size] }}>
      <div className={`absolute inset-0 rounded-full bg-${color} bg-opacity-20`} />
      <svg 
        className="absolute animate-error-x" 
        viewBox="0 0 52 52"
        style={{
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      >
        <path
          className="animate-error-x-line"
          fill="none"
          stroke="white"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="28"
          strokeDashoffset="28"
          d="M16 16 36 36"
          style={{ animationDelay: '0.1s' }}
        />
        <path
          className="animate-error-x-line"
          fill="none"
          stroke="white"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="28"
          strokeDashoffset="28"
          d="M36 16 16 36"
          style={{ animationDelay: '0.4s' }}
        />
      </svg>
    </div>
  );
};

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      speed = 'normal',
      spinnerStyle = 'classic',
      label,
      labelColor = 'neutral',
      showTrack = false,
      trackColor = 'neutral-100',
      thickness = 'normal',
      direction = 'clockwise',
      state = 'loading',
      onComplete,
      pulseColor = 'primary-500',
      showCompletionTick = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const [internalState, setInternalState] = useState<SpinnerState>(state);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      setInternalState(state);
      if (state !== 'loading') {
        setIsAnimating(true);
        const timer = setTimeout(() => {
          setIsAnimating(false);
          onComplete?.();
        }, 1500);
        return () => clearTimeout(timer);
      }
    }, [state, onComplete]);

    const spinnerClass = `
      rounded-full border-solid
      ${sizeClasses[size]}
      ${thickness === 'normal' ? borderClasses[size] : thicknessClasses[thickness]}
      ${internalState === 'loading' ? speedClasses[speed] : ''}
      ${internalState === 'loading' ? directionClasses[direction] : ''}
      ${spinnerStyle === 'striped' ? 'bg-striped' : ''}
      ${spinnerStyle === 'gradient' ? 'bg-gradient-to-r from-transparent to-surface-light-tertiary dark:to-surface-dark-tertiary' : ''}
      ${spinnerStyle === 'pulse' ? 'animate-pulse' : ''}
      ${variantBorderColors[variant]}
      border-b-transparent border-l-transparent
      ${className}
      transition-all duration-300
    `;

    const pulseRingClass = `
      absolute inset-0 rounded-full
      ${spinnerStyle === 'pulse' ? 'animate-ping' : ''}
      opacity-75
      bg-${pulseColor}
    `;

    return (
      <div className={`flex flex-col items-center ${className}`} ref={ref} {...props}>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes spin-reverse {
            to { transform: rotate(-360deg); }
          }
          @keyframes draw {
            to { stroke-dashoffset: 0; }
          }
          @keyframes checkmark-fade-in {
            to { opacity: 1; }
          }
          .animate-checkmark {
            animation: checkmark-fade-in 0.3s ease-out forwards;
          }
          .animate-checkmark-check {
            animation: draw 0.5s cubic-bezier(0.65, 0, 0.45, 1) 0.2s forwards;
          }
          .animate-error-x {
            animation: checkmark-fade-in 0.3s ease-out forwards;
          }
          .animate-error-x-line {
            animation: draw 0.3s cubic-bezier(0.65, 0, 0.45, 1) forwards;
          }
        `}</style>
        
        <div className="relative">
          {showTrack && (
            <div 
              className={`absolute inset-0 rounded-full border border-solid border-${trackColor}`}
              style={{
                ...(size === 'xs' ? { borderWidth: '1px' } : {}),
                ...(size === 'sm' ? { borderWidth: '2px' } : {}),
                ...(size === 'md' ? { borderWidth: '3px' } : {}),
                ...(size === 'lg' ? { borderWidth: '4px' } : {}),
                ...(size === 'xl' ? { borderWidth: '5px' } : {}),
              }}
            />
          )}

          {spinnerStyle === 'pulse' && <div className={pulseRingClass} />}

          {internalState === 'loading' ? (
            <div
              className={spinnerClass}
              style={{
                animationDirection: direction === 'counter-clockwise' ? 'reverse' : 'normal'
              }}
            />
          ) : internalState === 'success' && showCompletionTick ? (
            <Checkmark size={size} />
          ) : internalState === 'error' ? (
            <ErrorX size={size} />
          ) : null}
        </div>
        {label && (
          <span 
            className={`text-center font-medium transition-colors duration-300 ${labelSizeClasses[size]} ${labelColorClasses[labelColor]}`}
            style={{
              color: isAnimating ? stateBackgroundColors[internalState] : ''
            }}
          >
            {label}
          </span>
        )}
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner };