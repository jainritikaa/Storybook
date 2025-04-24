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
  mode?: 'light' | 'dark';
};

const statusColors = {
  default: {
    light: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      border: 'border-blue-300',
    },
    dark: {
      bg: 'bg-blue-900',
      text: 'text-blue-200',
      border: 'border-blue-700',
    },
  },
  success: {
    light: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      border: 'border-green-300',
    },
    dark: {
      bg: 'bg-green-900',
      text: 'text-green-200',
      border: 'border-green-700',
    },
  },
  info: {
    light: {
      bg: 'bg-sky-100',
      text: 'text-sky-600',
      border: 'border-sky-300',
    },
    dark: {
      bg: 'bg-sky-900',
      text: 'text-sky-200',
      border: 'border-sky-700',
    },
  },
  warning: {
    light: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-600',
      border: 'border-yellow-300',
    },
    dark: {
      bg: 'bg-yellow-900',
      text: 'text-yellow-200',
      border: 'border-yellow-700',
    },
  },
  error: {
    light: {
      bg: 'bg-red-100',
      text: 'text-red-600',
      border: 'border-red-300',
    },
    dark: {
      bg: 'bg-red-900',
      text: 'text-red-200',
      border: 'border-red-700',
    },
  },
};

export const Timeline = ({
  items,
  orientation = 'vertical',
  showConnectors = true,
  connectorStyle = 'solid',
  variant = 'default',
  mode = 'light',
}: TimelineProps) => {
  const bgWrapper = mode === 'dark' ? 'bg-gray-900' : 'bg-white';

  return (
    <div className={`p-6 rounded-xl ${bgWrapper}`}>
      <ol
        className={`flex ${
          orientation === 'horizontal' ? 'flex-row space-x-8' : 'flex-col space-y-10'
        }`}
      >
        {items.map((item, index) => {
          const status = statusColors[item.status][mode];
          const isLast = index === items.length - 1;

          return (
            <li
              key={item.id}
              className={`relative flex ${
                orientation === 'horizontal' ? 'flex-col' : 'flex-row'
              }`}
            >
              {showConnectors && !isLast && (
                <div
                  className={`absolute ${
                    orientation === 'horizontal'
                      ? `left-1/2 top-5 w-full border-t-2`
                      : `left-4 top-8 h-full border-l-2`
                  } ${connectorStyle === 'dashed' ? 'border-dashed' : 'border-solid'} ${status.border}`}
                />
              )}

              <div className={`flex-shrink-0 ${orientation === 'horizontal' ? 'mb-2' : 'mr-4'}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition transform group-hover:scale-105 ${status.bg} ${status.text}`}
                >
                  {item.icon ?? <span className="text-sm font-bold">{index + 1}</span>}
                </div>
              </div>

              <div className={`flex-1 ${variant === 'compact' ? 'py-1' : 'pb-6'}`}>
                <div className="flex flex-col space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className={`text-lg font-semibold ${mode === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                      {item.title}
                    </h3>
                    <span className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.date}
                    </span>
                  </div>
                  {variant !== 'compact' && (
                    <p className={`text-sm ${mode === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

