'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Calendar, GitBranch, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { projects } from '@/data/projects'

const ease = [0.22, 1, 0.36, 1] as const
const fadeUp  = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }
const stagger = { show: { transition: { staggerChildren: 0.07 } } }

const badge: Record<string, string> = {
  success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  accent:  'bg-violet-500/10  text-violet-400  border border-violet-500/20',
  warning: 'bg-amber-500/10   text-amber-400   border border-amber-500/20',
  muted:   'bg-white/[0.05]   text-[#9390a8]   border border-white/[0.065]',
}

function Lightbox({ images, start, onClose }: { images: string[]; start: number; onClose: () => void }) {
  const [idx, setIdx] = useState(start)
  const prev = () => setIdx(i => (i - 1 + images.length) % images.length)
  const next = () => setIdx(i => (i + 1) % images.length)

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
      >
        <X size={16} />
      </button>
      <button
        onClick={e => { e.stopPropagation(); prev() }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
      >
        <ChevronLeft size={20} />
      </button>
      <img
        src={images[idx]}
        alt=""
        className="max-w-[90vw] max-h-[88vh] rounded-xl shadow-2xl object-contain"
        onClick={e => e.stopPropagation()}
      />
      <button
        onClick={e => { e.stopPropagation(); next() }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
      >
        <ChevronRight size={20} />
      </button>
      <p className="absolute bottom-4 text-[11px] text-white/40 font-mono">
        {idx + 1} / {images.length}
      </p>
    </div>
  )
}

export default function ProjetoPage() {
  const { slug } = useParams() as { slug: string }
  const p = projects.find(x => x.slug === slug)
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (!p) return (
    <main className="min-h-screen bg-[#07070f] flex items-center justify-center">
      <div className="text-center">
        <p className="text-[#9390a8] mb-4">Projeto não encontrado.</p>
        <Link href="/" className="btn-ghost">← Voltar</Link>
      </div>
    </main>
  )

  const galleryImages = p.gallery ?? (p.screenshot ? [p.screenshot] : [])

  return (
    <main className="min-h-screen bg-[#07070f]">

      {lightbox !== null && (
        <Lightbox images={galleryImages} start={lightbox} onClose={() => setLightbox(null)} />
      )}

      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.065] bg-[#07070f]/80 backdrop-blur-2xl">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[13px] text-[#9390a8] hover:text-[#f0eeff] transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            miguel.dev
          </Link>
          <div className="flex items-center gap-2">
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-[#9390a8] border border-white/[0.065] bg-white/[0.04] hover:border-violet-500/40 hover:text-[#a78bfa] transition-all"
              >
                <Github size={12} /> GitHub
              </a>
            )}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium ${badge[p.badgeColor]}`}>
              {p.badge}
            </span>
            <span className="text-[11px] text-[#4a4766] font-mono">{p.year}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-16">

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <motion.div variants={fadeUp} className="relative">
            <div className="absolute -top-16 -left-16 w-80 h-80 bg-violet-500/[0.06] rounded-full blur-[100px] pointer-events-none" />
            <div className="relative">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge[p.badgeColor]}`}>
                  {p.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-[#4a4766] border border-white/[0.065] rounded-full px-2.5 py-1">
                  <Calendar size={10} /> {p.year}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 border border-emerald-500/20 bg-emerald-500/[0.06] rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {p.status}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight gradient-text mb-4 leading-tight">
                {p.title}
              </h1>
              <p className="text-[15px] sm:text-base text-[#9390a8] leading-relaxed max-w-2xl mb-6">{p.tagline}</p>

              {/* Stack */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {p.stack.map(t => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.065] text-[11px] text-[#9390a8] font-mono hover:border-violet-500/30 transition-colors">
                    {t}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                {p.url && (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <ExternalLink size={14} /> Ver ao vivo
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                    <Github size={14} /> Ver no GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* ── SCREENSHOT PRINCIPAL ─────────────────────────────────────── */}
          {p.screenshot && (
            <motion.div variants={fadeUp}
              className="rounded-2xl overflow-hidden border border-white/[0.065] bg-[#0e0e1a] cursor-zoom-in"
              onClick={() => setLightbox(0)}
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.065] bg-[#141428]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                </div>
                <div className="flex-1 bg-[#07070f]/60 border border-white/[0.065] rounded-md px-3 py-1 min-w-0">
                  <span className="text-[11px] text-[#4a4766]/70 font-mono">
                    {(p.url ?? p.github ?? 'github.com/Miguel-Pires').replace('https://', '')}
                  </span>
                </div>
              </div>
              <img src={p.screenshot} alt={p.title} className="w-full object-cover object-top" />
            </motion.div>
          )}

          {/* ── GALERIA ───────────────────────────────────────────────────── */}
          {p.gallery && p.gallery.length > 0 && (
            <motion.div variants={fadeUp}>
              <h2 className="text-xl font-bold text-[#f0eeff] mb-1">Screenshots</h2>
              <div className="h-0.5 w-8 bg-violet-500 rounded-full mb-6" />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {p.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setLightbox(i)}
                    className="group relative rounded-xl overflow-hidden border border-white/[0.065] bg-[#0e0e1a] hover:border-violet-500/30 transition-all aspect-video"
                  >
                    <img
                      src={img}
                      alt={`${p.title} screenshot ${i + 1}`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-white font-medium bg-black/60 px-2 py-1 rounded-md">
                        Ver maior
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── METRICS ──────────────────────────────────────────────────── */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {p.metrics.map(m => (
              <div key={m.label}
                className="card p-4 text-center hover:border-violet-500/25 transition-colors">
                <div className="text-xl font-black text-[#f0eeff] mb-1">{m.value}</div>
                <div className="text-[11px] text-[#4a4766] leading-tight">{m.label}</div>
              </div>
            ))}
          </motion.div>

          {/* ── SOBRE ────────────────────────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <h2 className="text-xl font-bold text-[#f0eeff] mb-1">Sobre o projeto</h2>
            <div className="h-0.5 w-8 bg-violet-500 rounded-full mb-6" />
            <div className="flex flex-col gap-4">
              {p.overview.map((para, i) => (
                <p key={i} className="text-[14px] text-[#9390a8] leading-7">{para}</p>
              ))}
            </div>
          </motion.div>

          {/* ── FUNCIONALIDADES ──────────────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <h2 className="text-xl font-bold text-[#f0eeff] mb-1">Funcionalidades</h2>
            <div className="h-0.5 w-8 bg-violet-500 rounded-full mb-6" />
            <div className="grid sm:grid-cols-2 gap-3">
              {p.features.map(f => (
                <div key={f.title}
                  className="card card-glow p-4 flex gap-3 hover:border-violet-500/25 transition-colors">
                  <span className="text-2xl shrink-0 mt-0.5">{f.icon}</span>
                  <div>
                    <p className="font-semibold text-[13px] text-[#f0eeff] mb-1">{f.title}</p>
                    <p className="text-[12px] text-[#9390a8] leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── COMO FUNCIONA ────────────────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <h2 className="text-xl font-bold text-[#f0eeff] mb-1">Como funciona</h2>
            <div className="h-0.5 w-8 bg-violet-500 rounded-full mb-6" />
            <div className="card relative overflow-hidden p-6">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
              <p className="text-[14px] text-[#9390a8] leading-7 whitespace-pre-line">{p.howItWorks}</p>
            </div>
          </motion.div>

          {/* ── STACK ────────────────────────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <h2 className="text-xl font-bold text-[#f0eeff] mb-1">Stack técnica</h2>
            <div className="h-0.5 w-8 bg-violet-500 rounded-full mb-6" />
            <div className="flex flex-col gap-2">
              {p.stackDetails.map((s, i) => (
                <motion.div key={s.name}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.045, ease }}
                  className="card card-glow flex items-start gap-4 p-4 hover:border-violet-500/25 transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 flex items-center justify-center shrink-0 mt-0.5">
                    <GitBranch size={13} />
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-[13px] text-[#f0eeff] font-mono">{s.name}</p>
                    <p className="text-[12px] text-[#9390a8] mt-0.5 leading-relaxed">{s.role}</p>
                  </div>
                  <CheckCircle2 size={14} className="text-violet-500/30 hover:text-violet-500/60 transition-colors shrink-0 mt-1" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── CTA COM GITHUB DESTAQUE ──────────────────────────────────── */}
          <motion.div variants={fadeUp}
            className="card relative overflow-hidden p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-violet-500/[0.06] rounded-full blur-[60px] pointer-events-none" />
            <div className="relative">
              <p className="font-semibold text-[#f0eeff] mb-1">Ver o projeto</p>
              <p className="text-[13px] text-[#9390a8]">
                {p.github
                  ? 'Acesse o código-fonte no GitHub ou veja ao vivo.'
                  : p.url
                  ? 'Acesse o projeto ao vivo.'
                  : 'Veja o código-fonte no GitHub.'}
              </p>
            </div>
            <div className="relative flex flex-wrap gap-3 shrink-0">
              {p.url && (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <ExternalLink size={13} /> Ao vivo
                </a>
              )}
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <Github size={13} /> GitHub
                </a>
              )}
              <Link href="/" className="btn-ghost">
                <ArrowLeft size={13} /> Voltar
              </Link>
            </div>
          </motion.div>

          {/* ── OUTROS PROJETOS ──────────────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <p className="text-[12px] text-[#4a4766] font-mono mb-4">OUTROS PROJETOS</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {projects.filter(x => x.slug !== slug).slice(0, 2).map(x => (
                <Link key={x.slug} href={`/projetos/${x.slug}`}
                  className="group card card-glow flex items-center gap-4 p-4 hover:border-violet-500/25 transition-all">
                  {x.screenshot && (
                    <div className="w-16 h-10 rounded-lg overflow-hidden border border-white/[0.065] shrink-0">
                      <img src={x.screenshot} alt={x.title} className="w-full h-full object-cover object-top" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[13px] text-[#f0eeff] truncate">{x.title}</p>
                    <p className="text-[11px] text-[#4a4766] truncate">{x.subtitle}</p>
                  </div>
                  <ArrowRight size={14} className="text-[#4a4766] group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>

      <footer className="border-t border-white/[0.065] py-6 text-center">
        <p className="text-[12px] text-[#4a4766]">
          © {new Date().getFullYear()} Miguel Pires
          <span className="mx-2 opacity-30">·</span>
          <Link href="/" className="hover:text-[#9390a8] transition-colors">miguel.dev</Link>
        </p>
      </footer>
    </main>
  )
}
