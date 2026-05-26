'use client';

/**
 * Rate limit exceeded modal — fallback when inline prompt is missed.
 * Source: 03-1-交互补充 §流程4
 */

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

interface RateLimitModalProps {
  open: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
}

export function RateLimitModal({ open, onClose, isLoggedIn }: RateLimitModalProps) {
  const pathname = usePathname();
  const lang = pathname.startsWith('/zh') ? 'zh' : 'en';

  return (
    <Modal open={open} onClose={onClose} title="Conversion limit reached">
      {isLoggedIn ? (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            You&apos;ve used all 5 free conversions today. Your limit resets daily at midnight UTC.
          </p>
          <p className="text-sm text-gray-500">
            Come back tomorrow for 5 more free conversions!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            You&apos;ve used your 2 free conversions for today.
          </p>
          <p className="text-sm text-gray-600">
            Sign up for <strong>5 free conversions per day</strong> — no credit card needed.
          </p>
          <Link href={`/${lang}/auth/login?redirect=${encodeURIComponent(pathname)}`}>
            <Button variant="primary" size="lg" className="w-full">
              Sign up for free
            </Button>
          </Link>
          <p className="text-xs text-gray-400 text-center">
            HTML conversion is free to use and runs in your browser.
          </p>
        </div>
      )}
    </Modal>
  );
}
