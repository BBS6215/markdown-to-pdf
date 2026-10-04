'use client';

/**
 * Convert button — format-specific color, loading state.
 * Source: 04-UI规范 §4.4 (按钮体系), §4.2 (格式专属色)
 */

import { Button } from '@/components/ui/button';
import type { ConvertFormat, ConversionStatus } from '@/lib/types';
import { Copy } from 'lucide-react';
import { getTranslations } from '@/lib/i18n/get-translations';

interface ConvertButtonProps {
  format: ConvertFormat;
  status: ConversionStatus;
  onClick: () => void;
  onCopyHtml?: () => void;
  disabled?: boolean;
  lang?: string;
}

export function ConvertButton({ format, status, onClick, onCopyHtml, disabled, lang = 'en' }: ConvertButtonProps) {
  const isLoading = status === 'loading';
  const t = getTranslations(lang);
  const convertLabel = format === 'html' ? t.conversion.downloadHtml : t.tool[format].convertButton;
  const copyLabel = t.conversion.copySource;

  return (
    <div className={`order-2 w-full gap-2 sm:order-3 sm:flex sm:w-auto ${format === 'html' ? 'grid min-[360px]:grid-cols-2' : 'flex'}`}>
      <Button
        variant="primary"
        size="lg"
        format={format}
        loading={isLoading}
        disabled={disabled || isLoading}
        onClick={onClick}
        className="flex-1 min-w-0 whitespace-nowrap sm:flex-none"
        style={{ paddingInline: '12px' }}
      >
        {convertLabel}
      </Button>

      {/* HTML format gets an extra "Copy HTML" button */}
      {format === 'html' && onCopyHtml && (
        <Button variant="secondary" size="lg" onClick={onCopyHtml} disabled={disabled || isLoading}
          className="flex-1 min-w-0 whitespace-nowrap sm:flex-none" style={{ paddingInline: '12px' }}>
          <Copy size={16} className="mr-1.5" />
          {copyLabel}
        </Button>
      )}
    </div>
  );
}
