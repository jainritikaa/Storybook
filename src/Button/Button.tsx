import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  onClick?: () => void;
};

const variantStyles = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded font-semibold text-sm
        transition-colors duration-200
        ${variantStyles[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {children}
    </button>
  );
};
