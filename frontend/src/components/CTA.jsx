export default function CTA() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-tr from-fuchsia-500 via-sky-500 to-emerald-400 p-1">
          <div className="rounded-2xl bg-slate-950 px-8 py-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white">Ready to simplify your wardrobe?</h3>
            <p className="mt-3 text-white/80">Create an account and start adding your clothing. Outfit suggestions are one click away.</p>
            <div className="mt-6 flex justify-center gap-3">
              <a href="/register" className="px-5 py-3 rounded-lg bg-white text-slate-900 font-semibold hover:bg-white/90">Get started</a>
              <a href="/login" className="px-5 py-3 rounded-lg bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20">I already have an account</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
