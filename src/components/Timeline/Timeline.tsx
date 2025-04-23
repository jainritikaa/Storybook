import React from 'react';

export type TimelineItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'default' | 'success' | 'info' | 'warning' | 'error';
  icon?: React.ReactNode;
};

export type TimelineProps = {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
  showConnectors?: boolean;
  connectorStyle?: 'solid' | 'dashed';
  variant?: 'default' | 'compact';
};

const statusColors = {
  default: {
    bg: 'bg-primary-500',
    text: 'text-primary-500',
    border: 'border-primary-500',
  },
  success: {
    bg: 'bg-success-500',
    text: 'text-success-500',
    border: 'border-success-500',
  },
  info: {
    bg: 'bg-info-500',
    text: 'text-info-500',
    border: 'border-info-500',
  },
  warning: {
    bg: 'bg-warning-500',
    text: 'text-warning-500',
    border: 'border-warning-500',
  },
  error: {
    bg: 'bg-error-500',
    text: 'text-error-500',
    border: 'border-error-500',
  },
};

export const Timeline = ({
  items,
  orientation = 'vertical',
  showConnectors = true,
  connectorStyle = 'solid',
  variant = 'default',
}: TimelineProps) => {
  const connectorClasses = `h-full ${
    connectorStyle === 'dashed' ? 'border-dashed' : 'border-solid'
  } border-l-2 ${statusColors.default.border} absolute left-4 top-8`;

  return (
    <ol
      className={`flex ${
        orientation === 'horizontal'
          ? 'flex-row space-x-8'
          : 'flex-col space-y-8'
      }`}
      aria-label="Timeline"
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className={`relative flex ${
            orientation === 'horizontal' ? 'flex-col' : 'flex-row'
          }`}
          aria-label={`Timeline item: ${item.title}`}
        >
          {/* Connector line */}
          {showConnectors && index !== items.length - 1 && (
            <div
              className={`
                ${
                  orientation === 'horizontal'
                    ? 'w-full border-t-2 absolute left-0 top-4 h-0'
                    : connectorClasses
                }
                ${statusColors[item.status].border}
              `}
              aria-hidden="true"
            />
          )}

          {/* Timeline dot */}
          <div
            className={`flex-shrink-0 ${
              orientation === 'horizontal' ? 'mb-2' : 'mr-4'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                statusColors[item.status].bg
              } text-white`}
              aria-hidden="true"
            >
              {item.icon || (
                <span className="text-sm font-medium">
                  {index + 1}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div
            className={`flex-1 ${
              variant === 'compact' ? 'py-1' : 'pb-8'
            }`}
          >
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between items-start">
                <h3
                  className={`text-base font-semibold ${
                    variant === 'compact' ? 'mb-0' : 'mb-1'
                  } text-text-primary`}
                >
                  {item.title}
                </h3>
                <span
                  className={`text-sm ${
                    variant === 'compact'
                      ? 'text-text-tertiary'
                      : 'text-text-secondary'
                  }`}
                >
                  {item.date}
                </span>
              </div>
              {variant !== 'compact' && (
                <p className="text-sm text-text-secondary">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};