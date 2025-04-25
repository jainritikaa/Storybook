import React, { useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const sidebarVariants = cva(
  'flex flex-col h-full bg-surface-light-primary dark:bg-surface-dark-primary border-r border-border-light dark:border-border-dark transition-all duration-300 ease-in-out overflow-hidden',
  {
    variants: {
      size: {
        sm: 'w-16',
        md: 'w-56',
        lg: 'w-72',
      },
      collapsed: {
        true: 'w-10',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const sidebarHeaderVariants = cva(
  'flex items-center justify-between p-4 border-b border-border-light dark:border-border-dark',
  {
    variants: {
      size: {
        sm: 'px-0',
        md: 'px-4',
        lg: 'px-7',
      },
      collapsed: {
        true: 'px-2 justify-center',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const sidebarItemVariants = cva(
  'flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors duration-200',
  {
    variants: {
      active: {
        true: 'bg-primary-500/10 text-primary-600 dark:text-primary-400',
        false:
          'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800',
      },
      size: {
        sm: 'px-2 justify-center',
        md: 'px-4',
        lg: 'px-6',
      },
      collapsed: {
        true: 'px-2 justify-center',
      },
    },
    defaultVariants: {
      active: false,
      size: 'md',
    },
  }
);

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  logo?: React.ReactNode;
  items: SidebarItem[];
  footer?: React.ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      size,
      logo,
      items,
      footer,
      collapsible = true,
      defaultCollapsed = false,
      ...props
    },
    ref
  ) => {
    const [collapsed, setCollapsed] = useState(defaultCollapsed);
    const [isHovered, setIsHovered] = useState(false);

    const toggleCollapse = () => {
      if (collapsible) {
        setCollapsed(!collapsed);
      }
    };

    return (
      <div
        ref={ref}
        className={sidebarVariants({ size, collapsed, className })}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div className={sidebarHeaderVariants({ size, collapsed })}>
          {!collapsed || isHovered ? (
            <>
              {logo && <div className="flex-shrink-0">{logo}</div>}
              {collapsible && (
                <button
                  onClick={toggleCollapse}
                  className="p-1 rounded-md text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
                  aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
            </>
          ) : (
            collapsible && (
              <button
                onClick={toggleCollapse}
                className="p-1 rounded-md text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-700"
                aria-label="Expand sidebar"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )
          )}
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {items.map((item) => (
            <a
              key={item.id}
              href="#"
              className={sidebarItemVariants({
                active: item.active,
                size,
                collapsed,
              })}
              onClick={(e) => {
                e.preventDefault();
                item.onClick?.();
              }}
              aria-current={item.active ? 'page' : undefined}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {(!collapsed || isHovered) && (
                <span className="ml-3 truncate">{item.label}</span>
              )}
            </a>
          ))}
        </nav>

        {footer && (
          <div className="p-4 border-t border-border-light dark:border-border-dark">
            {(!collapsed || isHovered) && footer}
          </div>
        )}
      </div>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export { Sidebar };