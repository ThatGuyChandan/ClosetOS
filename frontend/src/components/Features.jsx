import { ShieldCheck, Images, Sparkles, Cloud, Trash2 } from 'lucide-react'

const features = [
  {
    icon: Images,
    title: 'Wardrobe Library',
    desc: 'Upload items with image, category, season, and colors. Your personal clothing database.'
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Private',
    desc: 'JWT-protected routes keep your wardrobe safe. Auth flows are simple and reliable.'
  },
  {
    icon: Sparkles,
    title: 'Deterministic Outfits',
    desc: 'Rule-based outfit engine based on occasion, weather, and season—no randomness.'
  },
  {
    icon: Cloud,
    title: 'Cloud Uploads',
    desc: 'Optimized image uploads with Cloudinary and multer integration.'
  },
  {
    icon: Trash2,
    title: 'Declutter Fast',
    desc: 'Delete items you don’t wear and get insights on what’s underused.'
  },
]

export default function Features() {
  return (
    <section id="features" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Everything you need to manage your wardrobe</h2>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">Designed to be fast, secure, and delightful. Start with basics, then add insights and AI when you’re ready.</p>
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6 text-white">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-fuchsia-500 via-sky-500 to-emerald-400 grid place-items-center">
                <f.icon className="h-5 w-5 text-white"/>
              </div>
              <h3 className="mt-4 font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-white/70 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
