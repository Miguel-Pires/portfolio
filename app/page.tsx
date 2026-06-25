'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  Github, Linkedin, Mail, ExternalLink, Terminal, Zap, Brain,
  Database, Code2, GitBranch, Globe, ChevronDown, Award, ArrowRight,
  CheckCircle2, Cpu, Box
} from 'lucide-react'
import { projects, automations } from '@/data/projects'
import type { Certificate } from '@/lib/supabase'

// ── Variants ──────────────────────────────────────────────────────────────────
const fadeUp   = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }
const fadeIn   = { hidden: { opacity: 0 },         show: { opacity: 1, transition: { duration: 0.5 } } }
const stagger  = { show: { transition: { staggerChildren: 0.09 } } }
const staggerF = { show: { transition: { staggerChildren: 0.06 } } }

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ children, id, className = '' }: { children: React.ReactNode; id?: string; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-72px' })
  return (
    <motion.section id={id} ref={ref} variants={stagger} initial="hidden" animate={inView ? 'show' : 'hidden'}
      className={`max-w-5xl mx-auto px-6 ${className}`}>
      {children}
    </motion.section>
  )
}

// ── Section title ─────────────────────────────────────────────────────────────
function SectionTitle({ label, title, subtitle }: { label: string; title: string; subtitle?: string }) {
  return (
    <motion.div variants={fadeUp} className="mb-12">
      <span className="inline-block text-[11px] font-mono font-semibold text-accent tracking-widest uppercase mb-3 px-3 py-1 rounded-full border border-accent/20 bg-accent/5">
        {label}
      </span>
      <h2 className="text-3xl font-bold text-text tracking-tight">{title}</h2>
      {subtitle && <p className="mt-2 text-text2 text-sm max-w-xl">{subtitle}</p>}
      <div className="mt-3 h-px w-14 bg-gradient-to-r from-accent to-transparent rounded" />
    </motion.div>
  )
}

// ── Badge colors ──────────────────────────────────────────────────────────────
const badgeMap: Record<string, string> = {
  success: 'bg-green-500/10 text-green-400 border border-green-500/25',
  accent:  'bg-blue-500/10  text-blue-400  border border-blue-500/25',
  warning: 'bg-orange-500/10 text-orange-400 border border-orange-500/25',
  muted:   'bg-white/5 text-text2 border border-white/10',
}

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = Math.ceil(to / 40)
    const timer = setInterval(() => {
      start += step
      if (start >= to) { setVal(to); clearInterval(timer) }
      else setVal(start)
    }, 30)
    return () => clearInterval(timer)
  }, [inView, to])
  return <span ref={ref}>{val}{suffix}</span>
}

// ── Skills ────────────────────────────────────────────────────────────────────
const skills = {
  'Linguagens':             ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML', 'CSS'],
  'Frontend':               ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  'Backend':                ['Flask', 'APIs REST', 'Node.js', 'Autenticação por sessão'],
  'Banco de Dados':         ['PostgreSQL', 'MySQL', 'Supabase', 'Redis', 'RLS'],
  'Automação':              ['n8n', 'Webhooks', 'WAHA', 'Google Sheets API'],
  'IA & LLMs':              ['OpenAI GPT-4o', 'Claude API', 'Engenharia de Prompt', 'Agentes de IA'],
  'Deploy & Ferramentas':   ['Git', 'GitHub', 'Vercel', 'Docker', 'PyInstaller'],
}

const skillIcons: Record<string, React.ReactNode> = {
  'Linguagens':           <Code2 size={13} />,
  'Frontend':             <Globe size={13} />,
  'Backend':              <Terminal size={13} />,
  'Banco de Dados':       <Database size={13} />,
  'Automação':            <Zap size={13} />,
  'IA & LLMs':            <Brain size={13} />,
  'Deploy & Ferramentas': <GitBranch size={13} />,
}

// ── Certificates fetcher ──────────────────────────────────────────────────────
function useCertificates() {
  const [certs, setCerts] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('/api/certificates').then(r => r.json()).then(d => { setCerts(d); setLoading(false) }).catch(() => setLoading(false))
  }, [])
  return { certs, loading }
}

// ── Floating orb ─────────────────────────────────────────────────────────────
function Orb({ className }: { className: string }) {
  return <div className={`absolute rounded-full blur-[100px] pointer-events-none ${className}`} />
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const { certs, loading: certsLoading } = useCertificates()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60])

  return (
    <main className="min-h-screen bg-bg overflow-x-hidden">

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-bg/70 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <motion.span
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="font-mono text-sm text-accent font-semibold tracking-tight">
            miguel.dev
          </motion.span>
          <motion.div
            initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            className="hidden sm:flex items-center gap-6 text-sm text-text2">
            {['projetos', 'automações', 'stack', 'certificados', 'contato'].map(s => (
              <a key={s} href={`#${s}`}
                className="relative hover:text-text transition-colors capitalize group">
                {s}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </motion.div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-14 overflow-hidden">

        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:64px_64px]" />

        {/* Orbs */}
        <Orb className="w-[500px] h-[500px] bg-accent/8 top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <Orb className="w-[300px] h-[300px] bg-blue-600/6 bottom-1/4 right-1/4" />
        <Orb className="w-[200px] h-[200px] bg-purple-600/5 top-1/3 left-1/4" />

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="text-center max-w-3xl relative z-10">

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Disponível para estágio e posições júnior
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-5 leading-[1.05]">
            <span className="gradient-text">Miguel Pires</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-lg sm:text-xl text-text2 font-medium mb-3">
            Desenvolvedor Full Stack
          </motion.p>

          {/* Tech stack line */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            className="text-sm text-muted mb-10 font-mono tracking-wide">
            Next.js · Python · n8n · OpenAI · Supabase
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="flex flex-wrap items-center justify-center gap-3">
            <a href="https://github.com/Miguel-Pires" target="_blank"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-border hover:border-accent/50 hover:bg-accent/5 hover:shadow-[0_0_20px_rgba(79,142,247,0.1)] transition-all duration-300 text-sm font-medium">
              <Github size={16} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/devmiguelpires/" target="_blank"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-border hover:border-accent/50 hover:bg-accent/5 hover:shadow-[0_0_20px_rgba(79,142,247,0.1)] transition-all duration-300 text-sm font-medium">
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href="mailto:devmiguelpires@gmail.com"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white hover:bg-accent2 hover:shadow-[0_0_24px_rgba(79,142,247,0.35)] transition-all duration-300 text-sm font-medium">
              <Mail size={16} /> devmiguelpires@gmail.com
            </a>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-20 grid grid-cols-3 gap-10 sm:gap-16 text-center relative z-10">
          {[
            { n: 5, suffix: '', label: 'projetos entregues' },
            { n: 2, suffix: '', label: 'clientes reais' },
            { n: 4, suffix: '+', label: 'workflows n8n' },
          ].map(({ n, suffix, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="text-3xl sm:text-4xl font-bold text-text tabular-nums">
                <Counter to={n} suffix={suffix} />
              </div>
              <div className="text-[11px] text-muted">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.a href="#projetos"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
          className="absolute bottom-8 text-muted hover:text-accent transition-colors z-10">
          <ChevronDown size={20} className="animate-bounce" />
        </motion.a>
      </section>

      <div className="section-divider" />

      {/* ── PROJETOS ─────────────────────────────────────────────────────── */}
      <Section id="projetos" className="py-24">
        <SectionTitle
          label="Portfolio"
          title="Projetos em Produção"
          subtitle="Aplicações reais entregues para clientes e publicadas — com código limpo, deploy ativo e resultados mensuráveis."
        />

        {/* Featured — 3 cols */}
        <motion.div variants={staggerF} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {projects.filter(p => p.featured).map(p => (
            <motion.div key={p.slug} variants={fadeUp}
              className="group relative rounded-2xl border border-border bg-card p-5 flex flex-col gap-4
                         hover:border-accent/30 hover:shadow-[0_0_30px_rgba(79,142,247,0.07)] transition-all duration-300">

              {/* Top glow on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-text text-base leading-tight">{p.title}</div>
                  <div className="text-xs text-muted mt-0.5">{p.subtitle}</div>
                </div>
                <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium ${badgeMap[p.badgeColor]}`}>
                  {p.badge}
                </span>
              </div>

              <p className="text-sm text-text2 leading-relaxed flex-1">{p.description}</p>

              <div className="flex flex-wrap gap-1">
                {p.stack.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-text2 font-mono border border-border group-hover:border-accent/20 transition-colors">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex gap-3">
                  {p.url && (
                    <a href={p.url} target="_blank"
                      className="flex items-center gap-1.5 text-xs text-accent hover:text-accent2 transition-colors font-medium">
                      <ExternalLink size={11} /> Ao vivo
                    </a>
                  )}
                  {p.github && (
                    <a href={p.github} target="_blank"
                      className="flex items-center gap-1.5 text-xs text-text2 hover:text-text transition-colors">
                      <Github size={11} /> GitHub
                    </a>
                  )}
                </div>
                <Link href={`/projetos/${p.slug}`}
                  className="flex items-center gap-1 text-xs text-text2 hover:text-accent transition-colors group/link">
                  Ver detalhes
                  <ArrowRight size={11} className="group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other — 2 cols */}
        <motion.div variants={staggerF} className="grid sm:grid-cols-2 gap-4">
          {projects.filter(p => !p.featured).map(p => (
            <motion.div key={p.slug} variants={fadeUp}
              className="group relative rounded-2xl border border-border bg-card p-5 flex flex-col gap-3
                         hover:border-accent/30 hover:shadow-[0_0_24px_rgba(79,142,247,0.06)] transition-all duration-300">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-text text-sm">{p.title}</div>
                  <div className="text-xs text-muted mt-0.5">{p.subtitle}</div>
                </div>
                <span className={`shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium ${badgeMap[p.badgeColor]}`}>
                  {p.badge}
                </span>
              </div>
              <p className="text-sm text-text2 leading-relaxed flex-1">{p.description}</p>
              <div className="flex flex-wrap gap-1">
                {p.stack.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-text2 font-mono border border-border">{t}</span>
                ))}
              </div>
              <div className="flex items-center justify-between pt-0.5">
                <div className="flex gap-3">
                  {p.url && (
                    <a href={p.url} target="_blank" className="flex items-center gap-1.5 text-xs text-accent hover:text-accent2 transition-colors font-medium">
                      <ExternalLink size={11} /> Ao vivo
                    </a>
                  )}
                </div>
                <Link href={`/projetos/${p.slug}`}
                  className="flex items-center gap-1 text-xs text-text2 hover:text-accent transition-colors group/link">
                  Ver detalhes
                  <ArrowRight size={11} className="group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <div className="section-divider" />

      {/* ── AUTOMAÇÕES ───────────────────────────────────────────────────── */}
      <Section id="automações" className="py-24">
        <SectionTitle
          label="n8n"
          title="Automações com n8n"
          subtitle="Workflows ativos integrando WhatsApp, IA, planilhas e APIs — eliminando tarefas manuais repetitivas."
        />

        <motion.div variants={staggerF} className="grid sm:grid-cols-3 gap-4">
          {automations.map((a) => (
            <motion.div key={a.title} variants={fadeUp}
              className="group rounded-2xl border border-border bg-card p-5 flex flex-col gap-4
                         hover:border-accent/30 hover:shadow-[0_0_28px_rgba(79,142,247,0.07)] transition-all duration-300">

              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-text text-sm">{a.title}</div>
                  <div className="text-xs text-muted mt-0.5">{a.subtitle}</div>
                </div>
                <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 text-[10px] font-mono font-medium">
                  <Box size={9} />
                  {a.nodes} nós
                </span>
              </div>

              <p className="text-sm text-text2 leading-relaxed">{a.description}</p>

              {/* Steps */}
              <div className="flex flex-col gap-1.5">
                {a.details.slice(0, 4).map((d, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="shrink-0 w-4 h-4 rounded-full bg-accent/15 text-accent text-[9px] flex items-center justify-center mt-0.5 font-bold">
                      {i + 1}
                    </span>
                    <span className="text-[11px] text-text2 leading-relaxed">{d}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl bg-bg border border-border p-3">
                <p className="text-[11px] text-accent font-medium flex items-center gap-1.5">
                  <Zap size={10} className="shrink-0" /> {a.highlight}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mt-auto">
                {a.stack.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-text2 font-mono border border-border">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <div className="section-divider" />

      {/* ── STACK ────────────────────────────────────────────────────────── */}
      <Section id="stack" className="py-24">
        <SectionTitle
          label="Competências"
          title="Stack Técnica"
          subtitle="Ferramentas e tecnologias que uso no dia a dia para construir produtos completos."
        />

        <motion.div variants={staggerF} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {Object.entries(skills).map(([category, items]) => (
            <motion.div key={category} variants={fadeUp}
              className="group rounded-2xl border border-border bg-card p-5
                         hover:border-accent/25 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                  {skillIcons[category]}
                </span>
                <span className="text-sm font-semibold text-text">{category}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item, i) => (
                  <motion.span key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="px-2.5 py-1 rounded-lg bg-white/4 border border-border text-[11px] text-text2 font-mono
                               hover:border-accent/35 hover:text-accent hover:bg-accent/5 transition-all duration-200 cursor-default">
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Education + Languages */}
        <motion.div variants={fadeUp}
          className="mt-4 rounded-2xl border border-border bg-card p-6 grid sm:grid-cols-2 gap-6">
          <div className="flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
              <Cpu size={14} />
            </span>
            <div>
              <div className="text-sm font-semibold text-text mb-2">Formação</div>
              <p className="text-sm text-text2 leading-relaxed">
                Técnico em Análise e Desenvolvimento de Sistemas<br />
                <span className="text-muted">ETEC de Cerquilho · 2º ano · Conclusão 2027</span>
              </p>
              <p className="text-sm text-text2 mt-2">
                Bootcamp Java<br />
                <span className="text-muted">Santander Academy · Em andamento</span>
              </p>
            </div>
          </div>
          <div className="sm:border-l sm:border-border sm:pl-6 flex items-start gap-3">
            <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-0.5">
              <Globe size={14} />
            </span>
            <div>
              <div className="text-sm font-semibold text-text mb-2">Idiomas</div>
              <div className="flex flex-col gap-1.5">
                {[
                  { lang: 'Português', level: 'Nativo', pct: 100 },
                  { lang: 'Inglês', level: 'Intermediário', pct: 60 },
                ].map(({ lang, level, pct }) => (
                  <div key={lang}>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span className="text-text2">{lang}</span>
                      <span className="text-muted">{level}</span>
                    </div>
                    <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                        className="h-full bg-gradient-to-r from-accent to-accent2 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      <div className="section-divider" />

      {/* ── CERTIFICADOS ─────────────────────────────────────────────────── */}
      <Section id="certificados" className="py-24">
        <SectionTitle label="Cursos" title="Certificados" />

        {certsLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="rounded-2xl border border-border bg-card h-52 animate-pulse" />
            ))}
          </div>
        ) : certs.length === 0 ? (
          <motion.div variants={fadeUp}
            className="rounded-2xl border border-dashed border-border/60 bg-card/40 p-14 text-center">
            <Award size={28} className="mx-auto text-muted mb-3 opacity-50" />
            <p className="text-sm text-muted">Certificados aparecerão aqui em breve.</p>
          </motion.div>
        ) : (
          <motion.div variants={staggerF} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs.map(c => (
              <motion.div key={c.id} variants={fadeUp}
                className="group rounded-2xl border border-border bg-card overflow-hidden
                           hover:border-accent/30 hover:shadow-[0_0_24px_rgba(79,142,247,0.07)] transition-all duration-300">
                <div className="overflow-hidden h-40">
                  <img src={c.image_url} alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <div className="font-semibold text-sm text-text">{c.title}</div>
                  <div className="text-xs text-muted mt-0.5">{c.issuer} · {c.date}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Section>

      <div className="section-divider" />

      {/* ── CONTATO ──────────────────────────────────────────────────────── */}
      <Section id="contato" className="py-24 pb-32">
        <SectionTitle label="Contato" title="Vamos conversar?" />

        <motion.div variants={fadeUp}
          className="relative rounded-2xl border border-border bg-card p-8 sm:p-10 overflow-hidden">

          {/* Background glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-xl font-bold text-text mb-2">Disponível para novas oportunidades</h3>
              <p className="text-sm text-text2 leading-relaxed">
                Procuro estágio, posição júnior ou freela em desenvolvimento web. Respondo em até 24h.
              </p>
              <div className="flex flex-col gap-1.5 mt-4">
                {['Desenvolvimento Full Stack (Next.js / React)', 'Automação com n8n e Python', 'Integração de IA em produtos'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-text2">
                    <CheckCircle2 size={13} className="text-green-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0 w-full sm:w-auto">
              <a href="mailto:devmiguelpires@gmail.com"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-white hover:bg-accent2 hover:shadow-[0_0_24px_rgba(79,142,247,0.4)] transition-all duration-300 text-sm font-medium">
                <Mail size={15} /> Enviar e-mail
              </a>
              <a href="https://www.linkedin.com/in/devmiguelpires/" target="_blank"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border bg-white/5 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 text-sm font-medium">
                <Linkedin size={15} /> LinkedIn
              </a>
              <a href="https://github.com/Miguel-Pires" target="_blank"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-border bg-white/5 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 text-sm font-medium">
                <Github size={15} /> GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 text-center">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} Miguel Pires
          <span className="mx-2 text-border">·</span>
          <a href="mailto:devmiguelpires@gmail.com" className="hover:text-text2 transition-colors">devmiguelpires@gmail.com</a>
          <span className="mx-2 text-border">·</span>
          <span className="font-mono">Feito com Next.js + Framer Motion</span>
        </p>
      </footer>
    </main>
  )
}
