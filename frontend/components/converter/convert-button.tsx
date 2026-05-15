'use client';

/**
 * Convert button — format-specific color, loading state.
 * Source: 04-UI规范 §4.4 (按钮体系), §4.2 (格式专属色)
 */

import { Button } from '@/components/ui/button';
import type { ConvertFormat, ConversionStatus } from '@/lib/types';
import { FORMAT_CONFIG } from '@/lib/types';
import { Copy } from 'lucide-react';

interface ConvertButtonProps {
  format: ConvertFormat;
  status: ConversionStatus;
  onClick: () => void;
  onCopyHtml?: () => void;
  disabled?: boolean;
  lang?: string;
}

export function ConvertButton({ format, status, onClick, onCopyHtml, disabled, lang = 'en' }: ConvertButtonProps) {
  const config = FORMAT_CONFIG[format];
  const isLoading = status === 'loading';
  const convertLabel = lang === 'zh' ? `转换为 ${config.label}` : `Convert to ${config.label}`;
  const copyLabel = lang === 'zh' ? '复制 HTML' : 'Copy HTML';

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="primary"
        size="lg"
        format={format}
        loading={isLoading}
        disabled={disabled || isLoading}
        onClick={onClick}
      >
        {convertLabel}
      </Button>

      {/* HTML format gets an extra "Copy HTML" button */}
      {format === 'html' && onCopyHtml && (
        <Button variant="secondary" size="md" onClick={onCopyHtml} disabled={isLoading}>
          <Copy size={16} className="mr-1.5" />
          {copyLabel}
        </Button>
      )}
    </div>
  );
}
