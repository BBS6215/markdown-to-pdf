'use client';

import { useEffect, useState } from 'react';

/**
 * Debounce a value by the given delay (ms).
 * Source: 05-技术方案 §5.1 (debounce 300ms for preview)
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
