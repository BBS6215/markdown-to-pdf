'use client';

/**
 * FAQ accordion for SEO content area.
 */

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FaqAccordion({
  items,
  lang = 'en',
}: {
  items: ReadonlyArray<{ q: string; a: string }>;
  lang?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const title = lang === 'zh' ? '常见问题' : 'Frequently Asked Questions';
  // Stable id prefix so button ↔ panel aria relationships survive re-renders.
  const baseId = useId();

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>
      <div className="space-y-2">
        {items.map((item, i) => {
          const buttonId = `${baseId}-q-${i}`;
          const panelId = `${baseId}-a-${i}`;
          const isOpen = openIndex === i;
          return (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900">{item.q}</span>
                <ChevronDown
                  size={16}
                  className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && (
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="px-4 py-3 bg-gray-50 border-t border-gray-200"
                >
                  <p className="text-sm text-gray-600 leading-6">{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
