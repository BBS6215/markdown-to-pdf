/**
 * Button component — 4 hierarchy levels.
 * Source: 04-UI规范 §4.4
 */

import { type ButtonHTMLAttributes, forwardRef } from 'react';
import type { ConvertFormat } from '@/lib/types';
import { Spinner } from '@/components/ui/spinner';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
type ButtonSize = 'lg' | 'md' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  format?: ConvertFormat;
  loading?: boolean;
}

const FORMAT_COLORS: Record<ConvertFormat, string> = {
  pdf: 'bg-format-pdf hover:bg-format-pdf-hover',
  word: 'bg-format-word hover:bg-format-word-hover',
  html: 'bg-format-html hover:bg-format-html-hover',
};

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: 'text-white shadow-sm font-medium',
  secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium',
  tertiary: 'text-primary hover:text-primary-hover hover:underline',
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
          ? 'bg-primary hover:bg-primary-hover'
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
        {loading && <Spinner size="sm" className="mr-2" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
