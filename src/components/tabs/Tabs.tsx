import React, { useState, useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

// Variants for tab list
const tabsListVariants = cva(
  'flex items-center border-b border-border-light dark:border-border-dark relative bg-white dark:bg-gray-800',  // Dark mode background
  {
    variants: {
      variant: {
        default: '',
        primary: '',
        secondary: '',
      },
      size: {
        sm: 'space-x-2',
        md: 'space-x-4',
        lg: 'space-x-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Variants for tab trigger
const tabsTriggerVariants = cva(
  'relative py-3 text-sm font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 focus:ring-neutral-300 bg-white dark:bg-gray-800',  // Background color for dark mode
        primary:
          'text-primary-700 hover:text-primary-900 dark:text-primary-300 dark:hover:text-primary-100 focus:ring-primary-400 bg-primary-100 dark:bg-primary-700',  // Primary variant
        secondary:
          'text-secondary-700 hover:text-secondary-900 dark:text-secondary-300 dark:hover:text-secondary-100 focus:ring-secondary-400 bg-secondary-100 dark:bg-secondary-700',  // Secondary variant
      },
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

// Variants for indicator
const tabsIndicatorVariants = cva(
  'absolute bottom-0 left-0 h-1 rounded-full transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-neutral-900 dark:bg-neutral-100',  // Dark mode indicator
        primary: 'bg-primary-500',
        secondary: 'bg-secondary-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

// Types
export interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface TabsProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants>,
    VariantProps<typeof tabsTriggerVariants> {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

// Tabs Component
const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      className,
      variant,
      size,
      items,
      value: propValue,
      defaultValue,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [value, setValue] = useState(defaultValue || items[0]?.value || '');
    const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
    const tabsRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

    useEffect(() => {
      if (items.length > 0 && !defaultValue) {
        setValue(items[0].value);
      }
    }, [items, defaultValue]);

    useEffect(() => {
      updateIndicator();
    }, [value, items]);

    const updateIndicator = () => {
      const activeTab = tabRefs.current[value];
      if (activeTab && tabsRef.current) {
        const { offsetLeft, offsetWidth } = activeTab;
        setIndicatorStyle({
          width: offsetWidth,
          left: offsetLeft - tabsRef.current.offsetLeft,
        });
      }
    };

    const handleValueChange = (newValue: string) => {
      if (newValue !== value) {
        setValue(newValue);
        onValueChange?.(newValue);
      }
    };

    return (
      <div className={className} ref={ref} {...props}>
        <div className={tabsListVariants({ variant, size })} ref={tabsRef}>
          {items.map((item) => (
            <button
              key={item.value}
              ref={(el) => {
                if (el) {
                  tabRefs.current[item.value] = el;
                } else {
                  delete tabRefs.current[item.value];
                }
              }}
              className={tabsTriggerVariants({
                variant,
                size,
                className: `flex items-center gap-2 ${
                  item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`,
              })}
              disabled={item.disabled}
              onClick={() => !item.disabled && handleValueChange(item.value)}
              aria-selected={value === item.value}
              role="tab"
            >
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              {item.label}
            </button>
          ))}
          <div
            className={tabsIndicatorVariants({ variant })}
            style={indicatorStyle}
          />
        </div>
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';
export { Tabs };
