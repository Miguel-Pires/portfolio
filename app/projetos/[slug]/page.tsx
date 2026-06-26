'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Calendar, GitBranch, ArrowRight } from 'lucide-react'
import { projects } from '@/data/projects'

const ease = [0.22, 1, 0.36, 1] as const
const fadeUp  = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } } }
const stagger = { show: { transition: { staggerChildren: 0.07 } } }

const badge: Record<string, string> = {
  success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  accent:  'bg-violet-500/10  text-violet-400  border border-violet-500/20',
  warning: 'bg-amber-500/10   text-amber-400   border border-amber-500/20',
  muted:   'bg-white/[0.05]   text-text2       border border-border',
}

export default function ProjetoPage() {
  const { slug } = useParams() as { slug: string }
  const p = projects.find(x => x.slug === slug)

  if (!p) return (
    <main className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center">
        <p className="text-text2 mb-4">Projeto não encontrado.</p>
        <Link href="/" className="btn-ghost">← Voltar</Link>
      </div>
    </main>
  )

  return (
    <main className="min-h-screen bg-bg">

      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/75 backdrop-blur-2xl">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-[13px] text-text2 hover:text-text transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            miguel.dev
          </Link>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium ${badge[p.badgeColor]}`}>
              {p.badge}
            </span>
            <span className="text-[11px] text-muted font-mono">{p.year}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-16">

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <motion.div variants={fadeUp} className="relative">
            <div className="absolute -top-16 -left-16 w-80 h-80 bg-accent/[0.06] rounded-full blur-[100px] pointer-events-none" />
            <div className="relative">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${badge[p.badgeColor]}`}>
                  {p.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-muted border border-border rounded-full px-2.5 py-1">
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
              <p className="text-[15px] sm:text-base text-text2 leading-relaxed max-w-2xl mb-6">{p.tagline}</p>

              {/* Stack */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {p.stack.map(t => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-white/[0.04] border border-border text-[11px] text-text2 font-mono hover:border-accent/30 transition-colors">
                    {t}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                {p.url && (
                  <a href={p.url} target="_blank" className="btn-primary">
                    <ExternalLink size={14} /> Ver ao vivo
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" className="btn-ghost">
                    <Github size={14} /> Ver no GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* ── SCREENSHOT ───────────────────────────────────────────────── */}
          {p.screenshot && (
            <motion.div variants={fadeUp}
              className="rounded-2xl overflow-hidden border border-border bg-surface">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                </div>
                <div className="flex-1 bg-bg/60 border border-border/60 rounded-md px-3 py-1 min-w-0">
                  <span className="text-[11px] text-muted/70 font-mono">{p.url ?? 'github.com/Miguel-Pires'}</span>
                </div>
              </div>
              <img src={p.screenshot} alt={p.title} className="w-full object-cover object-top" />
            </motion.div>
          )}

          {/* ── METRICS ──────────────────────────────────────────────────── */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {p.metrics.map(m => (
              <div key={m.label}
                className="card p-4 text-center hover:border-accent/25 transition-colors">
                <div className="text-xl font-black text-text mb-1">{m.value}</div>
                <div className="text-[11px] text-muted leading-tight">{m.label}</div>
              </div>
            ))}
          </motion.div>

          {/* ── SOBRE ────────────────────────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <h2 className="text-xl font-bold text-text mb-1">Sobre o projeto</h2>
            <div className="h-0.5 w-8 bg-accent rounded-full mb-6" />
            <div className="flex flex-col gap-4">
              {p.overview.map((para, i) => (
                <p key={i} className="text-[14px] text-text2 leading-7">{para}</p>
              ))}
            </div>
          </motion.div>

          {/* ── FUNCIONALIDADES ──────────────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <h2 className="text-xl font-bold text-text mb-1">Funcionalidades</h2>
            <div className="h-0.5 w-8 bg-accent rounded-full mb-6" />
            <div className="grid sm:grid-cols-2 gap-3">
              {p.features.map(f => (
                <div key={f.title}
                  className="card card-glow p-4 flex gap-3 hover:border-accent/25 transition-colors">
                  <span className="text-2xl shrink-0 mt-0.5">{f.icon}</span>
                  <div>
                    <p className="font-semibold text-[13px] text-text mb-1">{f.title}</p>
                    <p className="text-[12px] text-text2 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── COMO FUNCIONA ────────────────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <h2 className="text-xl font-bold text-text mb-1">Como funciona</h2>
            <div className="h-0.5 w-8 bg-accent rounded-full mb-6" />
            <div className="card relative overflow-hidden p-6">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              <p className="text-[14px] text-text2 leading-7 whitespace-pre-line">{p.howItWorks}</p>
            </div>
          </motion.div>

          {/* ── STACK ────────────────────────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <h2 className="text-xl font-bold text-text mb-1">Stack técnica</h2>
            <div className="h-0.5 w-8 bg-accent rounded-full mb-6" />
            <div className="flex flex-col gap-2">
              {p.stackDetails.map((s, i) => (
                <motion.div key={s.name}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.045, ease }}
                  className="card card-glow flex items-start gap-4 p-4 hover:border-accent/25 transition-colors">
                  <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <GitBranch size={13} />
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-[13px] text-text font-mono">{s.name}</p>
                    <p className="text-[12px] text-text2 mt-0.5 leading-relaxed">{s.role}</p>
                  </div>
                  <CheckCircle2 size={14} className="text-accent/30 hover:text-accent/60 transition-colors shrink-0 mt-1" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── LINKS CTA ────────────────────────────────────────────────── */}
          <motion.div variants={fadeUp}
            className="card relative overflow-hidden p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-accent/[0.06] rounded-full blur-[60px] pointer-events-none" />
            <div className="relative">
              <p className="font-semibold text-text mb-1">Ver o projeto</p>
              <p className="text-[13px] text-text2">{p.url ? 'Acesse ao vivo ou veja o código-fonte.' : 'Veja o código-fonte no GitHub.'}</p>
            </div>
            <div className="relative flex flex-wrap gap-3 shrink-0">
              {p.url && (
                <a href={p.url} target="_blank" className="btn-primary">
                  <ExternalLink size={13} /> Ao vivo
                </a>
              )}
              {p.github && (
                <a href={p.github} target="_blank" className="btn-ghost">
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
            <p className="text-[12px] text-muted font-mono mb-4">OUTROS PROJETOS</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {projects.filter(x => x.slug !== slug).slice(0, 2).map(x => (
                <Link key={x.slug} href={`/projetos/${x.slug}`}
                  className="group card card-glow flex items-center gap-4 p-4 hover:border-accent/25 transition-all">
                  {x.screenshot && (
                    <div className="w-16 h-10 rounded-lg overflow-hidden border border-border shrink-0">
                      <img src={x.screenshot} alt={x.title} className="w-full h-full object-cover object-top" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[13px] text-text truncate">{x.title}</p>
                    <p className="text-[11px] text-muted truncate">{x.subtitle}</p>
                  </div>
                  <ArrowRight size={14} className="text-muted group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <footer className="border-t border-border py-6 text-center">
        <p className="text-[12px] text-muted">
          © {new Date().getFullYear()} Miguel Pires
          <span className="mx-2 opacity-30">·</span>
          <Link href="/" className="hover:text-text2 transition-colors">miguel.dev</Link>
        </p>
      </footer>
    </main>
  )
}
