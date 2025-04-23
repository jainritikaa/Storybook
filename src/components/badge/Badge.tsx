// src/components/badge/Badge.tsx
import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white focus:ring-primary-500',
        secondary: 'bg-secondary-500 text-white focus:ring-secondary-500',
        tertiary: 'bg-tertiary-500 text-white focus:ring-tertiary-500',
        success: 'bg-success-500 text-white focus:ring-success-500',
        warning: 'bg-warning-500 text-white focus:ring-warning-500',
        error: 'bg-error-500 text-white focus:ring-error-500',
        info: 'bg-info-500 text-white focus:ring-info-500',
        outline: 'border border-neutral-300 bg-transparent text-neutral-700 dark:border-neutral-600 dark:text-neutral-300',
        subtle: 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100',
      },
      size: {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-0.5',
        lg: 'text-base px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// Export the variant types
type BadgeVariantProps = VariantProps<typeof badgeVariants>;

export type BadgeVariant = BadgeVariantProps['variant'];
export type BadgeSize = BadgeVariantProps['size'];


export interface BadgeProps 
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  as?: React.ElementType;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, icon, iconPosition = 'left', as: Component = 'span', children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={badgeVariants({ variant, size, className })}
        {...props}
      >
        {icon && iconPosition === 'left' && (
          <span className="mr-1.5 flex items-center">{icon}</span>
        )}
        {children}
        {icon && iconPosition === 'right' && (
          <span className="ml-1.5 flex items-center">{icon}</span>
        )}
      </Component>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };