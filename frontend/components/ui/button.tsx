/**
 * Button component — 4 hierarchy levels.
 * Source: 04-UI规范 §4.4
 */

import { type ButtonHTMLAttributes, forwardRef } from 'react';
import type { ConvertFormat } from '@/lib/types';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
type ButtonSize = 'lg' | 'md' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  format?: ConvertFormat;
  loading?: boolean;
}

const FORMAT_COLORS: Record<ConvertFormat, string> = {
  pdf: 'bg-red-600 hover:bg-red-700',
  word: 'bg-blue-600 hover:bg-blue-700',
  html: 'bg-orange-500 hover:bg-orange-600',
};

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: 'text-white shadow-sm font-medium',
  secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium',
  tertiary: 'text-blue-600 hover:text-blue-700 hover:underline',
  ghost: 'text-gray-600 hover:text-gray-900',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  lg: 'h-11 px-8 text-base',
  md: 'h-10 px-6 text-sm',
  sm: 'h-8 px-3 text-sm',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', format, loading, disabled, className = '', children, ...props },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const colorClass =
      variant === 'primary' && format
        ? FORMAT_COLORS[format]
        : variant === 'primary'
          ? 'bg-blue-600 hover:bg-blue-700'
          : '';

    const disabledClass = isDisabled
      ? 'bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-200 border-none shadow-none'
      : '';

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`
          inline-flex items-center justify-center rounded-lg transition-colors duration-150
          ${VARIANT_STYLES[variant]}
          ${SIZE_STYLES[size]}
          ${disabledClass || colorClass}
          ${className}
        `.trim()}
        {...props}
      >
        {loading && <Spinner className="mr-2" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

function Spinner({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`animate-spin h-4 w-4 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
