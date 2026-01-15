const phases = [
  { phase: 'Phase 0', title: 'Project Setup', items: ['Backend base (Express)', 'Frontend base (Vite + Tailwind)'] },
  { phase: 'Phase 1', title: 'Authentication', items: ['User model in DB', 'Register & Login endpoints', 'Frontend auth integration'] },
  { phase: 'Phase 2', title: 'Wardrobe System', items: ['ClothingItem model & APIs', 'Image upload (Cloudinary)', 'Wardrobe UI'] },
  { phase: 'Phase 3', title: 'Outfit Generation', items: ['Rule-based outfit engine', 'Frontend outfit UI'] },
  { phase: 'Phase 4', title: 'AI Features', items: ['Color extraction', 'Outfit explanation (LLM)', 'Wardrobe insights'] },
  { phase: 'Phase 5', title: 'Polish & Resume', items: ['Rate limiting', 'Caching', 'Performance tuning'] },
]

export default function Phases() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Build roadmap</h2>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">A pragmatic sequence of milestones—from setup to insights and optional AI—so you can ship quickly.</p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((p) => (
            <div key={p.title} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6 text-white">
              <div className="text-xs text-white/70 font-mono">{p.phase}</div>
              <h3 className="mt-1 font-semibold text-lg">{p.title}</h3>
              <ul className="mt-3 space-y-1 text-sm text-white/70">
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-tr from-fuchsia-500 via-sky-500 to-emerald-400" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
