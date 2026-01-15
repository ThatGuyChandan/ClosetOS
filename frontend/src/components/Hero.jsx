import { Wand2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur">
              <span className="text-xs text-white/80">Smart Wardrobe Platform</span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-white">
                <Wand2 className="h-3 w-3" /> Rule-based outfits • No AI required
              </span>
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Organize your wardrobe. Generate outfits. Look great every day.
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-xl">
              Upload your clothing, tag it with categories and colors, and get deterministic, context-aware outfits for any occasion.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/register" className="px-5 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-white/90">
                Get started
              </a>
              <a href="#features" className="px-5 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20">
                Explore features
              </a>
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
