// @vitest-environment jsdom
import { expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import GuidePage from '../app/(localized)/[lang]/guides/[slug]/page';
import { getGuides } from '../lib/guides/content';

// Only the playground needs client-side behavior. Keep the actual page,
// Markdown pipeline, links, FAQ and structured data in this SSR regression.
vi.mock('../components/editor/mini-editor', () => ({ MiniEditor: () => null }));

it.each(['en', 'zh'])('renders every %s guide body without running browser effects', async lang => {
  for (const guide of getGuides(lang)) {
    const page = await GuidePage({ params: Promise.resolve({ lang, slug: guide.slug }) });
    const container = document.createElement('div');
    container.innerHTML = renderToStaticMarkup(page);
    const body = container.querySelector('[data-guide-body]');
    expect(body, guide.slug).not.toBeNull();
    expect(body!.querySelector('h2'), guide.slug).not.toBeNull();
    expect(body!.querySelector('p'), guide.slug).not.toBeNull();
    expect(body!.textContent!.length, guide.slug).toBeGreaterThan(500);
    expect(body!.querySelector('textarea, script, [role="alert"]'), guide.slug).toBeNull();
    expect(container.querySelectorAll('h1'), guide.slug).toHaveLength(1);
    expect(container.querySelector(`a[href="/${lang}"]`), guide.slug).not.toBeNull();
    const schemas = Array.from(container.querySelectorAll('script[type="application/ld+json"]'))
      .map(node => JSON.parse(node.textContent!));
    expect(schemas.find(schema => schema['@type'] === 'Article')?.url, guide.slug)
      .toBe(`https://markdown-to-pdf.app/${lang}/guides/${guide.slug}`);
  }
});
