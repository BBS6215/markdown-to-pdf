'use client';

import { useEffect, useState } from 'react';

/**
 * Detect mobile viewport (< 768px).
 * Source: 03-1-交互补充 §1.5 (移动端上下排列)
 */
export function useMobileDetect(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}
