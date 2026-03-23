/**
 * SEO content section container — below-the-fold content for tool pages.
 * Source: 04-UI规范 §2.1 (bg-gray-50 视觉分隔), 01-主线 §6.4
 */

import type { ConvertFormat } from '@/lib/types';
import { HowToSteps } from './how-to-steps';
import { FeaturesGrid } from './features-grid';
import { FaqAccordion } from './faq-accordion';
import { GuideRecommendations } from './guide-recommendations';
import { JsonLd } from './json-ld';
import { softwareApplicationSchema, faqSchema } from '@/lib/seo/json-ld-schemas';

interface SeoContentSectionProps {
  format: ConvertFormat;
  lang: string;
  content: {
    howToTitle: string;
    howToSteps: string[];
    whyTitle: string;
    whyContent: string;
    features: Array<{ title: string; desc: string }>;
    faq: Array<{ q: string; a: string }>;
  };
}

export function SeoContentSection({ format, lang, content }: SeoContentSectionProps) {
  return (
    <section className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-16 space-y-16">
        {/* How to */}
        <HowToSteps title={content.howToTitle} steps={content.howToSteps} />

        {/* Why */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{content.whyTitle}</h2>
          <p className="text-base text-gray-600 leading-7">{content.whyContent}</p>
        </div>

        {/* Features */}
        <FeaturesGrid features={content.features} />

        {/* FAQ */}
        <FaqAccordion items={content.faq} />

        {/* Guide recommendations */}
        <GuideRecommendations lang={lang} />
      </div>

      {/* JSON-LD */}
      <JsonLd data={softwareApplicationSchema()} />
      <JsonLd data={faqSchema(content.faq)} />
    </section>
  );
}
