'use client'

import { notFound, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft, ExternalLink, Github, CheckCircle2,
  Zap, Calendar, GitBranch, Box
} from 'lucide-react'
import { projects } from '@/data/projects'

const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }
const stagger = { show: { transition: { staggerChildren: 0.07 } } }

const badgeMap: Record<string, string> = {
  success: 'bg-green-500/10 text-green-400 border border-green-500/25',
  accent:  'bg-blue-500/10  text-blue-400  border border-blue-500/25',
  warning: 'bg-orange-500/10 text-orange-400 border border-orange-500/25',
  muted:   'bg-white/5 text-slate-400 border border-white/10',
}

export default function ProjetoPage() {
  const { slug } = useParams() as { slug: string }
  const p = projects.find(x => x.slug === slug)
  if (!p) notFound()

  return (
    <main className="min-h-screen bg-bg">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-bg/70 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/"
            className="flex items-center gap-2 text-sm text-text2 hover:text-text transition-colors group">
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            miguel.dev
          </Link>
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium ${badgeMap[p.badgeColor]}`}>
              {p.badge}
            </span>
            <span className="text-xs text-muted font-mono">{p.year}</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-24">
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-16">

          {/* ── HERO ─────────────────────────────────────────────────── */}
          <motion.div variants={fadeUp} className="relative">
            {/* Background glow */}
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${badgeMap[p.badgeColor]}`}>
                  {p.badge}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted border border-border rounded-full px-2.5 py-1">
                  <Calendar size={10} /> {p.year}
                </span>
                <span className="flex items-center gap-1 text-xs text-green-400 border border-green-500/20 bg-green-500/5 rounded-full px-2.5 py-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> {p.status}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight gradient-text mb-4">
                {p.title}
              </h1>

              <p className="text-base sm:text-lg text-text2 leading-relaxed max-w-2xl mb-6">
                {p.tagline}
              </p>

              {/* Stack badges */}
              <div className="flex flex-wrap gap-1.5 mb-8">
                {p.stack.map(t => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-white/5 border border-border text-xs text-text2 font-mono hover:border-accent/30 transition-colors">
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                {p.url && (
                  <a href={p.url} target="_blank"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white hover:bg-accent2 hover:shadow-[0_0_24px_rgba(79,142,247,0.4)] transition-all text-sm font-medium">
                    <ExternalLink size={14} /> Ver ao vivo
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-white/5 hover:border-accent/40 hover:bg-accent/5 transition-all text-sm font-medium">
                    <Github size={14} /> Ver no GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* ── METRICS ──────────────────────────────────────────────── */}
          <motion.div variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {p.metrics.map(m => (
              <div key={m.label}
                className="rounded-xl border border-border bg-card p-4 text-center hover:border-accent/25 transition-colors">
                <div className="text-xl font-bold text-text mb-1">{m.value}</div>
                <div className="text-[11px] text-muted">{m.label}</div>
              </div>
            ))}
          </motion.div>

          {/* ── SOBRE O PROJETO ──────────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <h2 className="text-xl font-bold text-text mb-2">Sobre o projeto</h2>
            <div className="h-px w-10 bg-accent mb-6" />
            <div className="flex flex-col gap-4">
              {p.overview.map((para, i) => (
                <p key={i} className="text-sm text-text2 leading-7">{para}</p>
              ))}
            </div>
          </motion.div>

          {/* ── FUNCIONALIDADES ──────────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <h2 className="text-xl font-bold text-text mb-2">Funcionalidades</h2>
            <div className="h-px w-10 bg-accent mb-6" />
            <div className="grid sm:grid-cols-2 gap-3">
              {p.features.map(f => (
                <div key={f.title}
                  className="group rounded-xl border border-border bg-card p-4 flex gap-3
                             hover:border-accent/30 hover:shadow-[0_0_20px_rgba(79,142,247,0.06)] transition-all duration-300">
                  <span className="text-xl shrink-0 mt-0.5">{f.icon}</span>
                  <div>
                    <div className="font-semibold text-sm text-text mb-1">{f.title}</div>
                    <p className="text-xs text-text2 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── COMO FUNCIONA ────────────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <h2 className="text-xl font-bold text-text mb-2">Como funciona</h2>
            <div className="h-px w-10 bg-accent mb-6" />
            <div className="rounded-2xl border border-border bg-card p-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
              <p className="text-sm text-text2 leading-7 whitespace-pre-line">{p.howItWorks}</p>
            </div>
          </motion.div>

          {/* ── STACK TÉCNICA ────────────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <h2 className="text-xl font-bold text-text mb-2">Stack técnica</h2>
            <div className="h-px w-10 bg-accent mb-6" />
            <div className="flex flex-col gap-2">
              {p.stackDetails.map((s, i) => (
                <motion.div key={s.name}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-card
                             hover:border-accent/30 transition-all duration-300">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                    <GitBranch size={13} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-sm text-text font-mono">{s.name}</span>
                    <p className="text-xs text-text2 mt-0.5 leading-relaxed">{s.role}</p>
                  </div>
                  <CheckCircle2 size={14} className="text-accent/40 group-hover:text-accent/70 transition-colors shrink-0 mt-1" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── LINKS ────────────────────────────────────────────────── */}
          <motion.div variants={fadeUp}
            className="rounded-2xl border border-border bg-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-text mb-1">Ver o projeto</div>
              <p className="text-sm text-text2">{p.url ? 'Acesse ao vivo ou veja o código-fonte.' : 'Veja o código-fonte no GitHub.'}</p>
            </div>
            <div className="flex gap-3 shrink-0">
              {p.url && (
                <a href={p.url} target="_blank"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white hover:bg-accent2 hover:shadow-[0_0_24px_rgba(79,142,247,0.4)] transition-all text-sm font-medium">
                  <ExternalLink size={14} /> Ao vivo
                </a>
              )}
              {p.github && (
                <a href={p.github} target="_blank"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-white/5 hover:border-accent/40 transition-all text-sm font-medium">
                  <Github size={14} /> GitHub
                </a>
              )}
              <Link href="/"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-white/5 hover:border-accent/40 transition-all text-sm font-medium">
                <ArrowLeft size={14} /> Voltar
              </Link>
            </div>
          </motion.div>

          {/* ── OUTROS PROJETOS ──────────────────────────────────────── */}
          <motion.div variants={fadeUp}>
            <div className="text-sm text-muted mb-4">Outros projetos</div>
            <div className="grid sm:grid-cols-2 gap-3">
              {projects.filter(x => x.slug !== slug).slice(0, 2).map(x => (
                <Link key={x.slug} href={`/projetos/${x.slug}`}
                  className="group rounded-xl border border-border bg-card p-4 flex items-center justify-between
                             hover:border-accent/30 hover:shadow-[0_0_20px_rgba(79,142,247,0.06)] transition-all duration-300">
                  <div>
                    <div className="font-semibold text-sm text-text">{x.title}</div>
                    <div className="text-xs text-muted mt-0.5">{x.subtitle}</div>
                  </div>
                  <ArrowLeft size={14} className="text-muted group-hover:text-accent rotate-180 group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} Miguel Pires
          <span className="mx-2 text-border">·</span>
          <Link href="/" className="hover:text-text2 transition-colors">miguel.dev</Link>
        </p>
      </footer>
    </main>
  )
}
