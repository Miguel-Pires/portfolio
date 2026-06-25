import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Miguel Pires — Desenvolvedor Full Stack',
  description: 'Portfólio de Miguel Pires. Projetos em produção, automação com n8n, IA aplicada e desenvolvimento web full stack.',
  keywords: ['desenvolvedor full stack', 'Next.js', 'React', 'automação', 'n8n', 'Python', 'IA'],
  authors: [{ name: 'Miguel Pires', url: 'https://github.com/Miguel-Pires' }],
  openGraph: {
    title: 'Miguel Pires — Desenvolvedor Full Stack',
    description: 'Projetos reais, automação com n8n e IA aplicada.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="bg-bg text-text antialiased">{children}</body>
    </html>
  )
}
