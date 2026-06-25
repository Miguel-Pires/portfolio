'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, Linkedin, Mail, ExternalLink, Terminal, Zap, Brain, Database, Code2, GitBranch, Globe, ChevronDown, Award } from 'lucide-react'
import { projects, automations } from '@/data/projects'
import type { Certificate } from '@/lib/supabase'

// ── Animation helpers ─────────────────────────────────────────────────────────
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

function Section({ children, id, className = '' }: { children: React.ReactNode; id?: string; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.section
      id={id}
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={`max-w-5xl mx-auto px-6 ${className}`}
    >
      {children}
    </motion.section>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className="mb-10">
      <h2 className="text-2xl font-bold text-text tracking-tight">{children}</h2>
      <div className="mt-2 h-px w-12 bg-accent rounded" />
    </motion.div>
  )
}

// ── Badge color map ───────────────────────────────────────────────────────────
const badgeMap: Record<string, string> = {
  success: 'bg-green-500/10 text-green-400 border border-green-500/20',
  accent:  'bg-blue-500/10  text-blue-400  border border-blue-500/20',
  warning: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  muted:   'bg-white/5 text-text2 border border-white/10',
}

// ── Skills data ───────────────────────────────────────────────────────────────
const skills = {
  'Linguagens':          ['JavaScript', 'TypeScript', 'Python', 'SQL', 'HTML', 'CSS'],
  'Frontend':            ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  'Backend':             ['Flask', 'APIs REST', 'Node.js', 'Autenticação por sessão'],
  'Banco de Dados':      ['PostgreSQL', 'MySQL', 'Supabase', 'Redis', 'RLS'],
  'Automação':           ['n8n', 'Webhooks', 'WAHA', 'Google Sheets API', 'Integrações de API'],
  'IA e LLMs':           ['OpenAI GPT-4o', 'Claude API', 'Claude Code', 'Engenharia de Prompt', 'Agentes de IA'],
  'Deploy & Ferramentas':['Git', 'GitHub', 'Vercel', 'Docker', 'PyInstaller', 'PyMuPDF'],
}

const skillIcons: Record<string, React.ReactNode> = {
  'Linguagens': <Code2 size={14} />,
  'Frontend':   <Globe size={14} />,
  'Backend':    <Terminal size={14} />,
  'Banco de Dados': <Database size={14} />,
  'Automação':  <Zap size={14} />,
  'IA e LLMs':  <Brain size={14} />,
  'Deploy & Ferramentas': <GitBranch size={14} />,
}

// ── Certificates fetcher ──────────────────────────────────────────────────────
function useCertificates() {
  const [certs, setCerts] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('/api/certificates')
      .then(r => r.json())
      .then(data => { setCerts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])
  return { certs, loading }
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const { certs, loading: certsLoading } = useCertificates()

  return (
    <main className="min-h-screen bg-bg">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-mono text-sm text-accent font-medium">miguel.dev</span>
          <div className="hidden sm:flex items-center gap-6 text-sm text-text2">
            {['projetos', 'automações', 'stack', 'certificados', 'contato'].map(s => (
              <a key={s} href={`#${s}`} className="hover:text-text transition-colors capitalize">{s}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-14 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center max-w-3xl relative"
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-slow" />
            Disponível para estágio e posições júnior
          </motion.div>

          {/* Name */}
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4 leading-none">
            <span className="gradient-text">Miguel Pires</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-text2 font-medium mb-3">
            Desenvolvedor Full Stack
          </p>
          <p className="text-sm text-muted mb-10 font-mono">
            Next.js · Python · n8n · OpenAI · Supabase
          </p>

          {/* CTA links */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="https://github.com/Miguel-Pires" target="_blank"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-border hover:border-accent/40 hover:bg-accent/5 transition-all text-sm font-medium">
              <Github size={16} /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/devmiguelpires/" target="_blank"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-border hover:border-accent/40 hover:bg-accent/5 transition-all text-sm font-medium">
              <Linkedin size={16} /> LinkedIn
            </a>
            <a href="mailto:devmiguelpires@gmail.com"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white hover:bg-accent2 transition-all text-sm font-medium">
              <Mail size={16} /> devmiguelpires@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid grid-cols-3 gap-8 text-center"
        >
          {[['5', 'projetos entregues'], ['2', 'clientes reais'], ['4', 'workflows n8n']].map(([n, l]) => (
            <div key={l}>
              <div className="text-3xl font-bold text-text">{n}</div>
              <div className="text-xs text-muted mt-1">{l}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.a
          href="#projetos"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 text-muted hover:text-text2 transition-colors"
        >
          <ChevronDown size={20} className="animate-bounce" />
        </motion.a>
      </section>

      <hr className="section-divider" />

      {/* ── PROJETOS ─────────────────────────────────────────────────────── */}
      <Section id="projetos" className="py-24">
        <SectionTitle>Projetos em Produção</SectionTitle>

        {/* Featured (top 3) */}
        <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {projects.filter(p => p.featured).map(p => (
            <motion.div key={p.title} variants={fadeUp}
              className="card-hover rounded-2xl border border-border bg-card p-5 flex flex-col gap-4">
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
                  <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-text2 font-mono border border-border">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                {p.url && (
                  <a href={p.url} target="_blank"
                    className="flex items-center gap-1.5 text-xs text-accent hover:text-accent2 transition-colors font-medium">
                    <ExternalLink size={12} /> Ver ao vivo
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank"
                    className="flex items-center gap-1.5 text-xs text-text2 hover:text-text transition-colors">
                    <Github size={12} /> GitHub
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other projects */}
        <motion.div variants={stagger} className="grid sm:grid-cols-2 gap-4">
          {projects.filter(p => !p.featured).map(p => (
            <motion.div key={p.title} variants={fadeUp}
              className="card-hover rounded-2xl border border-border bg-card p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-text text-sm">{p.title}</div>
                  <div className="text-xs text-muted mt-0.5">{p.subtitle}</div>
                </div>
                {p.url && (
                  <a href={p.url} target="_blank"
                    className="shrink-0 flex items-center gap-1 text-xs text-accent hover:text-accent2 transition-colors">
                    <ExternalLink size={11} /> Ver
                  </a>
                )}
              </div>
              <p className="text-sm text-text2 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-1">
                {p.stack.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-text2 font-mono border border-border">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <hr className="section-divider" />

      {/* ── AUTOMAÇÕES ───────────────────────────────────────────────────── */}
      <Section id="automações" className="py-24">
        <SectionTitle>Automações com n8n</SectionTitle>

        <motion.div variants={stagger} className="grid sm:grid-cols-3 gap-4">
          {automations.map((a, i) => (
            <motion.div key={a.title} variants={fadeUp}
              className="card-hover rounded-2xl border border-border bg-card p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-text text-sm">{a.title}</div>
                  <div className="text-xs text-muted mt-0.5">{a.subtitle}</div>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 text-[10px] font-mono font-medium">
                  {a.nodes} nós
                </span>
              </div>

              <p className="text-sm text-text2 leading-relaxed flex-1">{a.description}</p>

              <div className="rounded-lg bg-bg border border-border p-3">
                <p className="text-[11px] text-accent font-medium">{a.highlight}</p>
              </div>

              <div className="flex flex-wrap gap-1">
                {a.stack.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-text2 font-mono border border-border">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <hr className="section-divider" />

      {/* ── STACK ────────────────────────────────────────────────────────── */}
      <Section id="stack" className="py-24">
        <SectionTitle>Stack Técnica</SectionTitle>

        <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(skills).map(([category, items]) => (
            <motion.div key={category} variants={fadeUp}
              className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-accent">{skillIcons[category]}</span>
                <span className="text-sm font-semibold text-text">{category}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map(item => (
                  <span key={item}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-border text-xs text-text2 font-mono hover:border-accent/30 hover:text-accent transition-colors cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* About blurb */}
        <motion.div variants={fadeUp} className="mt-6 rounded-2xl border border-border bg-card p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <div className="text-sm font-semibold text-text mb-2">Formação</div>
              <p className="text-sm text-text2">
                Técnico em Análise e Desenvolvimento de Sistemas — ETEC de Cerquilho · 2º ano em andamento · Conclusão 2027
              </p>
              <p className="text-sm text-text2 mt-1">
                Bootcamp Java — Santander Academy · Em andamento
              </p>
            </div>
            <div className="w-px bg-border hidden sm:block" />
            <div className="flex-1">
              <div className="text-sm font-semibold text-text mb-2">Idiomas</div>
              <p className="text-sm text-text2">Português: nativo</p>
              <p className="text-sm text-text2">Inglês: intermediário (leitura/escuta) · básico em conversação</p>
            </div>
          </div>
        </motion.div>
      </Section>

      <hr className="section-divider" />

      {/* ── CERTIFICADOS ─────────────────────────────────────────────────── */}
      <Section id="certificados" className="py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.h2 variants={fadeUp} className="text-2xl font-bold text-text tracking-tight">Certificados</motion.h2>
            <motion.div variants={fadeUp} className="mt-2 h-px w-12 bg-accent rounded" />
          </div>
        </div>

        {certsLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3].map(i => (
              <div key={i} className="rounded-2xl border border-border bg-card h-48 animate-pulse" />
            ))}
          </div>
        ) : certs.length === 0 ? (
          <motion.div variants={fadeUp}
            className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center">
            <Award size={32} className="mx-auto text-muted mb-3" />
            <p className="text-sm text-muted">Certificados serão exibidos aqui.</p>
          </motion.div>
        ) : (
          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certs.map(c => (
              <motion.div key={c.id} variants={fadeUp}
                className="card-hover rounded-2xl border border-border bg-card overflow-hidden">
                <img src={c.image_url} alt={c.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <div className="font-semibold text-sm text-text">{c.title}</div>
                  <div className="text-xs text-muted mt-0.5">{c.issuer} · {c.date}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </Section>

      <hr className="section-divider" />

      {/* ── CONTATO ──────────────────────────────────────────────────────── */}
      <Section id="contato" className="py-24 pb-32">
        <SectionTitle>Contato</SectionTitle>

        <motion.div variants={fadeUp}
          className="rounded-2xl border border-border bg-card p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold text-text">Vamos conversar?</h3>
            <p className="text-sm text-text2 mt-1">
              Disponível para estágio, posição júnior ou freela. Respondo em 24h.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a href="mailto:devmiguelpires@gmail.com"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white hover:bg-accent2 transition-all text-sm font-medium">
              <Mail size={15} /> E-mail
            </a>
            <a href="https://www.linkedin.com/in/devmiguelpires/" target="_blank"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-white/5 hover:border-accent/40 transition-all text-sm font-medium">
              <Linkedin size={15} /> LinkedIn
            </a>
            <a href="https://github.com/Miguel-Pires" target="_blank"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-white/5 hover:border-accent/40 transition-all text-sm font-medium">
              <Github size={15} /> GitHub
            </a>
          </div>
        </motion.div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border py-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Miguel Pires · devmiguelpires@gmail.com
      </footer>
    </main>
  )
}
