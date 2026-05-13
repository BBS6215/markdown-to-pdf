/**
 * How-to steps component for SEO content area.
 */

export function HowToSteps({ title, steps }: { title: string; steps: readonly string[] }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">{title}</h2>
      <ol className="space-y-4">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-medium">
              {i + 1}
            </span>
            <span className="text-base text-gray-700 pt-1">{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
