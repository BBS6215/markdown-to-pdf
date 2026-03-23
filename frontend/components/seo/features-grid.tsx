/**
 * Features grid for SEO content area.
 */

export function FeaturesGrid({ features }: { features: Array<{ title: string; desc: string }> }) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{f.title}</h3>
            <p className="text-sm text-gray-500 leading-6">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
