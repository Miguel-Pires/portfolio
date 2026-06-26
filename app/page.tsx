'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
  Github, Linkedin, Mail, ExternalLink, Terminal, Zap, Brain,
  Database, Code2, GitBranch, Globe, ChevronDown, Award,
  ArrowRight, CheckCircle2, Cpu, Box, Sparkles
} from 'lucide-react'
import { projects, automations } from '@/data/projects'
import type { Certificate } from '@/lib/supabase'

// ── Motion variants ────────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const
const fadeUp  = { hidden: { opacity: 0, y: 28  }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }
const fadeIn  = { hidden: { opacity: 0         }, show: { opacity: 1,     transition: { duration: 0.5 } } }
const stagger = (delay = 0.09) => ({ show: { transition: { staggerChildren: delay } } })

// ── Reusable section wrapper ───────────────────────────────────────────────────
function Section({ children, id, className = '' }: { children: React.ReactNode; id?: string; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.section id={id} ref={ref}
      variants={stagger()} initial="hidden" animate={inView ? 'show' : 'hidden'}
      className={`max-w-5xl mx-auto px-6 ${className}`}>
      {children}
    </motion.section>
  )
}

// ── Section heading ────────────────────────────────────────────────────────────
function Heading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <motion.div variants={fadeUp} className="mb-14">
      <p className="font-mono text-[11px] font-semibold tracking-[0.18em] text-accent uppercase mb-3">
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight leading-tight">{title}</h2>
      {body && <p className="mt-3 text-text2 text-[15px] leading-relaxed max-w-lg">{body}</p>}
      <div className="mt-4 h-[2px] w-10 bg-gradient-to-r from-accent to-transparent rounded-full" />
    </motion.div>
  )
}

// ── Badge palette ──────────────────────────────────────────────────────────────
const badge: Record<string, string> = {
  success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  accent:  'bg-violet-500/10  text-violet-400  border border-violet-500/20',
  warning: 'bg-amber-500/10   text-amber-400   border border-amber-500/20',
  muted:   'bg-white/[0.05]   text-text2       border border-border',
}

// ── Animated counter ───────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref  = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let n = 0
    const step = Math.max(1, Math.floor(to / 40))
    const t = setInterval(() => { n = Math.min(n + step, to); setVal(n); if (n >= to) clearInterval(t) }, 28)
    return () => clearInterval(t)
  }, [inView, to])
  return <span ref={ref}>{val}{suffix}</span>
}

// ── Browser mockup card ────────────────────────────────────────────────────────
function BrowserMockup({ src, domain, alt }: { src?: string; domain: string; alt: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-surface2 group-hover:border-accent/20 transition-colors">
      {/* Browser chrome */}
      <div className="browser-bar gap-3">
        <div className="flex gap-1.5 shrink-0">
          <div className="browser-dot bg-red-500/50" />
          <div className="browser-dot bg-amber-500/50" />
          <div className="browser-dot bg-emerald-500/50" />
        </div>
        <div className="flex-1 rounded-md bg-bg/60 border border-border/60 px-3 py-[3px] min-w-0">
          <span className="text-[10px] text-muted/80 font-mono truncate block">{domain}</span>
        </div>
      </div>
      {/* Screenshot / placeholder */}
      <div className="aspect-[16/9] overflow-hidden bg-surface2">
        {src ? (
          <img src={src} alt={alt}
            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-surface to-surface2">
            <Globe size={22} className="text-muted/40" />
            <span className="text-[11px] text-muted/40">{domain}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Skills ─────────────────────────────────────────────────────────────────────
const skills = {
  'Linguagens':           ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML', 'CSS'],
  'Frontend':             ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  'Backend':              ['Flask', 'APIs REST', 'Node.js', 'Auth por sessão'],
  'Banco de Dados':       ['PostgreSQL', 'MySQL', 'Supabase', 'Redis', 'RLS'],
  'Automação':            ['n8n', 'Webhooks', 'WAHA', 'Google Sheets API'],
  'IA & LLMs':            ['OpenAI GPT-4o', 'Claude API', 'Engenharia de Prompt', 'Agentes IA'],
  'Deploy & Ferramentas': ['Git', 'GitHub', 'Vercel', 'Docker', 'PyInstaller'],
}
const skillIcon: Record<string, React.ReactNode> = {
  'Linguagens':           <Code2 size={12} />,
  'Frontend':             <Globe size={12} />,
  'Backend':              <Terminal size={12} />,
  'Banco de Dados':       <Database size={12} />,
  'Automação':            <Zap size={12} />,
  'IA & LLMs':            <Brain size={12} />,
  'Deploy & Ferramentas': <GitBranch size={12} />,
}

// ── Certs fetcher ──────────────────────────────────────────────────────────────
function useCerts() {
  const [certs, setCerts] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('/api/certificates').then(r => r.json())
      .then(d => { setCerts(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])
  return { certs, loading }
}

// ── Floating orb ──────────────────────────────────────────────────────────────
function Orb({ className }: { className: string }) {
  return <div className={`absolute rounded-full pointer-events-none ${className}`} />
}

// ═════════════════════════════════════════════════════════════════════════════════
export default function Home() {
  const { certs, loading } = useCerts()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY   = useTransform(scrollYProgress, [0, 1], [0, 80])
  const heroOp  = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <main className="min-h-screen bg-bg">

      {/* ── NAV ────────────────────────────────────────────────────────────── */}
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg/75 backdrop-blur-2xl">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <motion.span
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="font-mono text-sm font-semibold text-accent tracking-tight">
            miguel.dev
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            className="hidden sm:flex items-center gap-7 text-[13px] text-text2">
            {['projetos','automações','stack','certificados','contato'].map(s => (
              <a key={s} href={`#${s}`} className="relative group capitalize hover:text-text transition-colors">
                {s}
                <span className="absolute -bottom-px left-0 w-0 h-px bg-accent rounded group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </motion.div>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-14 overflow-hidden">

        {/* Grid bg */}
        <div className="absolute inset-0 grid-bg opacity-70" />

        {/* Gradient orbs */}
        <Orb className="w-[700px] h-[700px] bg-violet-600/[0.07] blur-[130px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <Orb className="w-[350px] h-[350px] bg-blue-600/[0.06] blur-[100px] top-1/4 right-1/4" />
        <Orb className="w-[250px] h-[250px] bg-purple-800/[0.08] blur-[80px] bottom-1/3 left-1/5" />

        <motion.div style={{ y: heroY, opacity: heroOp }} className="relative z-10 text-center max-w-3xl">

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            className="flex justify-center mb-7">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 blur-[10px] opacity-40" />
              <img
                src="/photos/miguel-portrait.jpg"
                alt="Miguel Pires"
                className="relative w-full h-full rounded-full object-cover object-top border-2 border-violet-500/30 shadow-xl"
              />
            </div>
          </motion.div>

          {/* Status pill */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/[0.07] text-emerald-400 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Disponível para estágio e posições júnior
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="text-6xl sm:text-8xl font-black tracking-tight leading-[1.0] mb-3">
            <span className="gradient-text">Miguel<br />Pires</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-[11px] text-muted font-mono tracking-widest mb-5">
            Miguel Camargo Stevanato Pires
          </motion.p>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="text-lg sm:text-xl text-text2 font-medium mb-2">
            Desenvolvedor Full Stack
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-muted font-mono tracking-widest mb-12">
            Next.js · Python · n8n · OpenAI · Supabase
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-3">
            <a href="https://github.com/Miguel-Pires" target="_blank" className="btn-ghost text-[13px]">
              <Github size={15} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/devmiguelpires/" target="_blank" className="btn-ghost text-[13px]">
              <Linkedin size={15} /> LinkedIn
            </a>
            <a href="mailto:devmiguelpires@gmail.com" className="btn-primary text-[13px]">
              <Mail size={15} /> devmiguelpires@gmail.com
            </a>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="relative z-10 mt-20 flex items-center gap-12 sm:gap-20">
          {[
            { n: 5, s: '', label: 'projetos entregues' },
            { n: 2, s: '', label: 'clientes reais' },
            { n: 4, s: '+', label: 'workflows n8n' },
          ].map(({ n, s, label }, i) => (
            <div key={label} className={`text-center ${i > 0 ? 'border-l border-border pl-12 sm:pl-20' : ''}`}>
              <div className="text-3xl sm:text-4xl font-black text-text tabular-nums tracking-tight">
                <Counter to={n} suffix={s} />
              </div>
              <div className="text-[11px] text-muted mt-1">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.a href="#projetos"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="relative z-10 mt-10 flex flex-col items-center gap-1 text-muted hover:text-accent-l transition-colors">
          <span className="text-[10px] font-mono tracking-widest">SCROLL</span>
          <ChevronDown size={16} className="animate-bounce" />
        </motion.a>
      </section>

      <div className="section-divider my-0" />

      {/* ── PROJETOS ───────────────────────────────────────────────────────── */}
      <Section id="projetos" className="py-28">
        <Heading
          eyebrow="Portfolio"
          title="Projetos em Produção"
          body="Aplicações reais entregues para clientes e publicadas — com código limpo, deploy ativo e resultados mensuráveis."
        />

        {/* Featured row — 3 cols */}
        <motion.div variants={stagger(0.08)} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
          {projects.filter(p => p.featured).map(p => (
            <motion.div key={p.slug} variants={fadeUp}
              className="group card card-glow flex flex-col overflow-hidden">

              {/* Browser mockup with screenshot */}
              <div className="p-3 pb-0">
                <BrowserMockup
                  src={p.screenshot}
                  domain={(p.url ?? p.github ?? 'github.com/Miguel-Pires').replace('https://', '')}
                  alt={p.title}
                />
              </div>

              <div className="p-5 flex flex-col gap-3.5 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-text text-[15px] leading-tight">{p.title}</h3>
                    <p className="text-[11px] text-muted mt-0.5">{p.subtitle}</p>
                  </div>
                  <span className={`pill shrink-0 ${badge[p.badgeColor]}`}>{p.badge}</span>
                </div>

                <p className="text-[13px] text-text2 leading-relaxed flex-1">{p.description}</p>

                <div className="flex flex-wrap gap-1">
                  {p.stack.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-text2 font-mono border border-border group-hover:border-accent/20 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-border/50">
                  <div className="flex gap-4">
                    {p.url && (
                      <a href={p.url} target="_blank"
                        className="flex items-center gap-1 text-[12px] text-accent hover:text-accent-l transition-colors font-medium">
                        <ExternalLink size={11} /> Ao vivo
                      </a>
                    )}
                    {p.github && (
                      <a href={p.github} target="_blank"
                        className="flex items-center gap-1 text-[12px] text-text2 hover:text-text transition-colors">
                        <Github size={11} /> GitHub
                      </a>
                    )}
                  </div>
                  <Link href={`/projetos/${p.slug}`}
                    className="flex items-center gap-1 text-[12px] text-text2 hover:text-accent transition-colors group/l">
                    Ver mais <ArrowRight size={11} className="group-hover/l:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Secondary row — 2 cols */}
        <motion.div variants={stagger(0.06)} className="grid sm:grid-cols-2 gap-5">
          {projects.filter(p => !p.featured).map(p => (
            <motion.div key={p.slug} variants={fadeUp}
              className="group card card-glow flex flex-col overflow-hidden">
              <div className="p-3 pb-0">
                <BrowserMockup
                  src={p.screenshot}
                  domain={(p.url ?? p.github ?? 'github.com/Miguel-Pires').replace('https://', '')}
                  alt={p.title}
                />
              </div>
              <div className="p-5 flex flex-col gap-3.5 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-text text-[15px]">{p.title}</h3>
                    <p className="text-[11px] text-muted mt-0.5">{p.subtitle}</p>
                  </div>
                  <span className={`pill shrink-0 ${badge[p.badgeColor]}`}>{p.badge}</span>
                </div>
                <p className="text-[13px] text-text2 leading-relaxed flex-1">{p.description}</p>
                <div className="flex flex-wrap gap-1">
                  {p.stack.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-text2 font-mono border border-border">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-border/50">
                  <div className="flex gap-4">
                    {p.url && (
                      <a href={p.url} target="_blank" className="flex items-center gap-1 text-[12px] text-accent hover:text-accent-l transition-colors font-medium">
                        <ExternalLink size={11} /> Ao vivo
                      </a>
                    )}
                  </div>
                  <Link href={`/projetos/${p.slug}`}
                    className="flex items-center gap-1 text-[12px] text-text2 hover:text-accent transition-colors group/l">
                    Ver mais <ArrowRight size={11} className="group-hover/l:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <div className="section-divider" />

      {/* ── AUTOMAÇÕES ─────────────────────────────────────────────────────── */}
      <Section id="automações" className="py-28">
        <Heading
          eyebrow="n8n"
          title="Automações"
          body="Workflows ativos integrando WhatsApp, IA e APIs — eliminando tarefas manuais repetitivas."
        />

        <motion.div variants={stagger(0.08)} className="grid sm:grid-cols-3 gap-5">
          {automations.map((a) => (
            <motion.div key={a.title} variants={fadeUp}
              className="group card card-glow flex flex-col gap-5 p-6">

              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-text text-[15px]">{a.title}</h3>
                  <p className="text-[11px] text-muted mt-0.5">{a.subtitle}</p>
                </div>
                <span className="shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/10 text-accent-l border border-accent/20 text-[10px] font-mono font-semibold">
                  <Box size={9} /> {a.nodes} nós
                </span>
              </div>

              {/* Screenshot único */}
              {a.screenshot && !a.gallery && (
                <div className="rounded-xl overflow-hidden border border-border/60 bg-bg/60">
                  <img src={a.screenshot} alt={a.title}
                    className="w-full object-cover object-center" />
                </div>
              )}

              {/* Galeria 2 imgs (Barone) */}
              {a.gallery && (
                <div className="grid grid-cols-2 gap-2">
                  {a.gallery.map((img, i) => (
                    <div key={i} className="rounded-xl overflow-hidden border border-border/60 bg-bg/60">
                      <img src={img} alt={`${a.title} ${i + 1}`}
                        className="w-full object-cover object-center" />
                    </div>
                  ))}
                </div>
              )}

              <p className="text-[13px] text-text2 leading-relaxed">{a.description}</p>

              {/* Steps */}
              <div className="flex flex-col gap-2">
                {a.details.slice(0, 5).map((d, i) => (
                  <div key={i} className="flex gap-2.5 items-start">
                    <span className="shrink-0 w-4 h-4 rounded-full bg-accent/15 border border-accent/20 text-accent text-[9px] font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-[12px] text-text2 leading-relaxed">{d}</span>
                  </div>
                ))}
              </div>

              {/* Highlight */}
              <div className="mt-auto rounded-xl bg-bg border border-border/80 px-4 py-3">
                <p className="text-[11px] text-accent-l font-medium flex items-center gap-1.5">
                  <Zap size={10} className="shrink-0" /> {a.highlight}
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                {a.stack.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-text2 font-mono border border-border">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <div className="section-divider" />

      {/* ── STACK ──────────────────────────────────────────────────────────── */}
      <Section id="stack" className="py-28">
        <Heading eyebrow="Competências" title="Stack Técnica" />

        <motion.div variants={stagger(0.06)} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(skills).map(([cat, items]) => (
            <motion.div key={cat} variants={fadeUp} className="group card p-5">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center">
                  {skillIcon[cat]}
                </span>
                <span className="text-[13px] font-semibold text-text">{cat}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item, i) => (
                  <motion.span key={item}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.035 }}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-border text-[11px] text-text2 font-mono
                               hover:border-accent/30 hover:text-accent-l hover:bg-accent/[0.06] transition-all duration-200 cursor-default">
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Education + languages */}
        <motion.div variants={fadeUp} className="mt-4 card p-6 grid sm:grid-cols-2 gap-6">
          <div className="flex gap-3.5">
            <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center shrink-0 mt-0.5">
              <Cpu size={14} />
            </span>
            <div>
              <p className="text-[13px] font-semibold text-text mb-2">Formação</p>
              <p className="text-[13px] text-text2 leading-relaxed">
                Técnico em Análise e Desenvolvimento de Sistemas<br />
                <span className="text-muted">ETEC de Cerquilho · 2º ano · Conclusão 2027</span>
              </p>
              <p className="text-[13px] text-text2 mt-2">
                Bootcamp Java<br />
                <span className="text-muted">Santander Academy · Em andamento</span>
              </p>
            </div>
          </div>
          <div className="sm:border-l sm:border-border sm:pl-6 flex gap-3.5">
            <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center shrink-0 mt-0.5">
              <Globe size={14} />
            </span>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-text mb-3">Idiomas</p>
              {[
                { lang: 'Português', level: 'Nativo', pct: 100 },
                { lang: 'Inglês',    level: 'Intermediário', pct: 60 },
              ].map(({ lang, level, pct }) => (
                <div key={lang} className="mb-2.5">
                  <div className="flex justify-between text-[12px] mb-1">
                    <span className="text-text2">{lang}</span>
                    <span className="text-muted">{level}</span>
                  </div>
                  <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }} whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }} transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                      className="h-full rounded-full bg-gradient-to-r from-accent to-blue"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Section>

      <div className="section-divider" />

      {/* ── CERTIFICADOS ───────────────────────────────────────────────────── */}
      <Section id="certificados" className="py-28">
        <Heading eyebrow="Cursos" title="Certificados" />
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1,2,3].map(i => <div key={i} className="h-52 card animate-pulse" />)}
          </div>
        ) : certs.length === 0 ? (
          <motion.div variants={fadeUp} className="card p-14 text-center border-dashed">
            <Award size={26} className="mx-auto text-muted mb-3 opacity-40" />
            <p className="text-sm text-muted">Certificados aparecerão aqui em breve.</p>
          </motion.div>
        ) : (
          <motion.div variants={stagger(0.07)} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certs.map(c => (
              <motion.div key={c.id} variants={fadeUp} className="group card overflow-hidden">
                <div className="overflow-hidden h-40">
                  <img src={c.image_url} alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-[13px] text-text">{c.title}</p>
                  <p className="text-[11px] text-muted mt-0.5">{c.issuer} · {c.date}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Section>

      <div className="section-divider" />

      {/* ── CONTATO ────────────────────────────────────────────────────────── */}
      <Section id="contato" className="py-28 pb-36">
        <Heading eyebrow="Contato" title="Vamos conversar?" />

        <motion.div variants={fadeUp}
          className="relative card overflow-hidden p-8 sm:p-10">
          {/* Photo bg — Santiago */}
          <div className="absolute inset-y-0 right-0 w-64 hidden lg:block pointer-events-none">
            <img src="/photos/miguel-santiago.jpg" alt=""
              className="w-full h-full object-cover object-top opacity-[0.12]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e1a] via-[#0e0e1a]/60 to-transparent" />
          </div>
          {/* Decorative glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent/[0.07] rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-60 h-60 bg-blue/[0.05] rounded-full blur-[80px] pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="max-w-sm">
              <h3 className="text-xl font-bold text-text mb-2">Disponível para oportunidades</h3>
              <p className="text-[13px] text-text2 leading-relaxed mb-5">
                Procuro estágio, posição júnior ou freela em dev web. Respondo em até 24h.
              </p>
              {['Desenvolvimento Full Stack (Next.js / React)', 'Automação com n8n e Python', 'Integração de IA em produtos'].map(item => (
                <div key={item} className="flex items-center gap-2 text-[13px] text-text2 mb-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto min-w-[200px]">
              <a href="mailto:devmiguelpires@gmail.com" className="btn-primary justify-center">
                <Mail size={14} /> Enviar e-mail
              </a>
              <a href="https://wa.me/5515991504068" target="_blank" rel="noopener noreferrer"
                className="btn-ghost justify-center !border-emerald-500/30 !text-emerald-400 hover:!bg-emerald-500/[0.06] hover:!border-emerald-500/50">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.096.541 4.066 1.491 5.786L.054 23.447a.5.5 0 0 0 .604.604l5.684-1.434A11.934 11.934 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.9a9.884 9.884 0 0 1-5.031-1.373l-.36-.214-3.733.943.96-3.629-.235-.374A9.861 9.861 0 0 1 2.1 12C2.1 6.534 6.534 2.1 12 2.1c5.466 0 9.9 4.434 9.9 9.9 0 5.466-4.434 9.9-9.9 9.9z"/>
                </svg>
                WhatsApp
              </a>
              <a href="https://www.linkedin.com/in/devmiguelpires/" target="_blank" className="btn-ghost justify-center">
                <Linkedin size={14} /> LinkedIn
              </a>
              <a href="https://github.com/Miguel-Pires" target="_blank" className="btn-ghost justify-center">
                <Github size={14} /> GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-[12px] text-muted">
          © {new Date().getFullYear()} Miguel Pires
          <span className="mx-2 opacity-30">·</span>
          <a href="mailto:devmiguelpires@gmail.com" className="hover:text-text2 transition-colors">devmiguelpires@gmail.com</a>
          <span className="mx-2 opacity-30">·</span>
          <span className="font-mono">Next.js + Framer Motion</span>
        </p>
      </footer>
    </main>
  )
}
