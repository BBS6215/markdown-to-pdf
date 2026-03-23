'use client';

/**
 * FAQ accordion for SEO content area.
 */

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function FaqAccordion({ items }: { items: Array<{ q: string; a: string }> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="text-sm font-medium text-gray-900">{item.q}</span>
              <ChevronDown
                size={16}
                className={`text-gray-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}
              />
            </button>
            {openIndex === i && (
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-600 leading-6">{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
