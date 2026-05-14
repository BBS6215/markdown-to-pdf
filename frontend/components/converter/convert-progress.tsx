'use client';

/**
 * Conversion progress feedback overlay.
 * Source: 03-1-交互补充 §6 风险 3
 */

import { Spinner } from '@/components/ui/spinner';
import type { ConvertFormat, ConversionStatus, ConversionAction } from '@/lib/types';
import { FORMAT_CONFIG } from '@/lib/types';

interface ConvertProgressProps {
  status: ConversionStatus;
  format: ConvertFormat;
  lastAction?: ConversionAction;
  errorMessage?: string;
  onRetry?: () => void;
}

export function ConvertProgress({ status, format, lastAction, errorMessage, onRetry }: ConvertProgressProps) {
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
    // Pick the success line based on what the user actually just did.
    // Single 'success' status is shared by three different actions:
    //   - copy   -> "Copied!"   (Copy HTML button)
    //   - print  -> "Print dialog opened. Choose 'Save as PDF'."
    //   - download (default) -> "Downloaded!"
    let message: string;
    if (lastAction === 'copy') {
      message = 'Copied!';
    } else if (lastAction === 'print') {
      message = 'Print dialog opened. Choose "Save as PDF".';
    } else {
      message = 'Downloaded!';
    }
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
