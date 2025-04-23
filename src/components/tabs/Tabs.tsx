import React, { useState, useEffect, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const tabsListVariants = cva(
  'flex items-center border-b border-border-light dark:border-border-dark',
  {
    variants: {
      variant: {
        default: '',
        primary: '',
        secondary: '',
      },
      size: {
        sm: 'space-x-4',
        md: 'space-x-6',
        lg: 'space-x-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const tabsTriggerVariants = cva(
  'relative py-3 text-sm font-medium transition-all duration-200 focus:outline-none',
  {
    variants: {
      variant: {
        default:
          'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100',
        primary:
          'text-neutral-600 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400',
        secondary:
          'text-neutral-600 hover:text-secondary-600 dark:text-neutral-400 dark:hover:text-secondary-400',
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

const tabsIndicatorVariants = cva(
  'absolute bottom-0 left-0 h-0.5 transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-neutral-900 dark:bg-neutral-100',
        primary: 'bg-primary-500',
        secondary: 'bg-secondary-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

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