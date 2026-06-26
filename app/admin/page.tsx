'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import type { Certificate } from '@/lib/supabase'

function getSB() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}
import { Upload, Trash2, Lock, LogOut, Plus, X } from 'lucide-react'

const ADMIN_KEY = 'mp_admin_auth'

export default function AdminPage() {
  const [authed, setAuthed]     = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [certs, setCerts]       = useState<Certificate[]>([])
  const [uploading, setUploading] = useState(false)
  const [form, setForm]         = useState({ title: '', issuer: '', date: '' })
  const [file, setFile]         = useState<File | null>(null)
  const [preview, setPreview]   = useState<string | null>(null)
  const fileRef                 = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem(ADMIN_KEY) === 'ok') { setAuthed(true); fetchCerts() }
  }, [])

  async function fetchCerts() {
    const sb = getSB()
    if (!sb) { setCerts([]); return }
    const { data } = await sb.from('certificates').select('*').order('created_at', { ascending: false })
    setCerts(data ?? [])
  }

  function login() {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'admin') {
      sessionStorage.setItem(ADMIN_KEY, 'ok')
      setAuthed(true); fetchCerts()
    } else {
      setError('Senha incorreta.')
    }
  }

  function logout() { sessionStorage.removeItem(ADMIN_KEY); setAuthed(false) }

  function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setPreview(URL.createObjectURL(f))
  }

  async function upload() {
    if (!file || !form.title || !form.issuer || !form.date) {
      setError('Preencha todos os campos e selecione uma imagem.'); return
    }
    setUploading(true); setError('')
    try {
      const sb = getSB()
      if (!sb) throw new Error('Supabase não configurado. Adicione as variáveis de ambiente.')
      const ext  = file.name.split('.').pop()
      const path = `${Date.now()}.${ext}`
      const { error: upErr } = await sb.storage.from('certificates').upload(path, file)
      if (upErr) throw upErr

      const { data: { publicUrl } } = sb.storage.from('certificates').getPublicUrl(path)

      const { error: dbErr } = await sb.from('certificates').insert({
        title: form.title, issuer: form.issuer, date: form.date, image_url: publicUrl,
      })
      if (dbErr) throw dbErr

      setForm({ title: '', issuer: '', date: '' })
      setFile(null); setPreview(null)
      if (fileRef.current) fileRef.current.value = ''
      fetchCerts()
    } catch (e: any) {
      setError(e?.message ?? 'Erro no upload.')
    }
    setUploading(false)
  }

  async function deleteCert(id: string, imageUrl: string) {
    if (!confirm('Remover este certificado?')) return
    const sb = getSB()
    if (!sb) return
    const path = imageUrl.split('/').pop()!
    await sb.storage.from('certificates').remove([path])
    await sb.from('certificates').delete().eq('id', id)
    fetchCerts()
  }

  // ── Login screen ──
  if (!authed) return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8">
        <div className="flex items-center gap-2 mb-6">
          <Lock size={18} className="text-accent" />
          <span className="font-semibold text-text">Admin — Miguel Pires</span>
        </div>
        <input
          type="password" placeholder="Senha" value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          className="w-full px-4 py-2.5 rounded-xl bg-bg border border-border text-text text-sm focus:outline-none focus:border-accent mb-3"
        />
        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}
        <button onClick={login}
          className="w-full py-2.5 rounded-xl bg-accent hover:bg-accent2 text-white text-sm font-medium transition-colors">
          Entrar
        </button>
      </div>
    </div>
  )

  // ── Admin panel ──
  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-bold text-xl text-text">Gerenciar Certificados</h1>
          <button onClick={logout} className="flex items-center gap-1.5 text-xs text-muted hover:text-text transition-colors">
            <LogOut size={13} /> Sair
          </button>
        </div>

        {/* Upload form */}
        <div className="rounded-2xl border border-border bg-card p-6 mb-8">
          <h2 className="font-semibold text-sm text-text mb-4 flex items-center gap-2">
            <Plus size={15} className="text-accent" /> Adicionar certificado
          </h2>

          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            <input placeholder="Título (ex: Bootcamp Java)" value={form.title}
              onChange={e => setForm(f => ({...f, title: e.target.value}))}
              className="px-4 py-2.5 rounded-xl bg-bg border border-border text-text text-sm focus:outline-none focus:border-accent" />
            <input placeholder="Emissor (ex: Santander Academy)" value={form.issuer}
              onChange={e => setForm(f => ({...f, issuer: e.target.value}))}
              className="px-4 py-2.5 rounded-xl bg-bg border border-border text-text text-sm focus:outline-none focus:border-accent" />
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <input type="month" value={form.date}
              onChange={e => setForm(f => ({...f, date: e.target.value}))}
              className="px-4 py-2.5 rounded-xl bg-bg border border-border text-text text-sm focus:outline-none focus:border-accent" />
            <div
              onClick={() => fileRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bg border border-dashed border-border hover:border-accent/40 cursor-pointer text-sm text-muted transition-colors">
              <Upload size={14} />
              {file ? file.name : 'Selecionar imagem (PNG/JPG)'}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={pickFile} className="hidden" />
          </div>

          {preview && (
            <div className="relative mb-4 w-fit">
              <img src={preview} alt="preview" className="h-32 rounded-lg border border-border object-cover" />
              <button onClick={() => { setFile(null); setPreview(null) }}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-card border border-border flex items-center justify-center hover:bg-red-500/20 transition-colors">
                <X size={10} />
              </button>
            </div>
          )}

          {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

          <button onClick={upload} disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent2 disabled:opacity-50 text-white text-sm font-medium transition-colors">
            <Upload size={14} />
            {uploading ? 'Enviando...' : 'Adicionar'}
          </button>
        </div>

        {/* Existing certs */}
        {certs.length === 0 ? (
          <p className="text-sm text-muted text-center py-8">Nenhum certificado ainda.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {certs.map(c => (
              <div key={c.id} className="rounded-2xl border border-border bg-card overflow-hidden">
                <img src={c.image_url} alt={c.title} className="w-full h-36 object-cover" />
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-text">{c.title}</div>
                    <div className="text-xs text-muted mt-0.5">{c.issuer} · {c.date}</div>
                  </div>
                  <button onClick={() => deleteCert(c.id, c.image_url)}
                    className="p-2 rounded-lg hover:bg-red-500/10 text-muted hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
