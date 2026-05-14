'use client';

/**
 * Conversion progress feedback overlay.
 * Source: 03-1-交互补充 §6 风险 3
 */

import { Spinner } from '@/components/ui/spinner';
import type { ConvertFormat, ConversionStatus } from '@/lib/types';
import { FORMAT_CONFIG } from '@/lib/types';

interface ConvertProgressProps {
  status: ConversionStatus;
  format: ConvertFormat;
  errorMessage?: string;
  onRetry?: () => void;
}

export function ConvertProgress({ status, format, errorMessage, onRetry }: ConvertProgressProps) {
  if (status === 'idle') return null;

  const formatLabel = FORMAT_CONFIG[format].label;

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Spinner size="sm" />
        <span>Generating your {formatLabel}...</span>
      </div>
    );
  }

  if (status === 'success') {
    // PDF goes through the browser print dialog instead of a direct
    // download, so the success message must reflect that — the user still
    // has to pick "Save as PDF" in the dialog to actually get the file.
    const message =
      format === 'pdf'
        ? 'Print dialog opened. Choose "Save as PDF".'
        : 'Downloaded!';
    return (
      <div className="text-sm text-green-600 font-medium">
        {message}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex items-center gap-2 text-sm text-red-600">
        <span>{errorMessage || `Failed to generate ${formatLabel}.`}</span>
        {onRetry && (
          <button
            onClick={onRetry}
            className="underline hover:no-underline font-medium"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return null;
}
