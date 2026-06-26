export type StackDetail = { name: string; role: string }
export type Feature = { icon: string; title: string; description: string }
export type Metric = { label: string; value: string }

export type Project = {
  slug: string
  title: string
  subtitle: string
  url: string | null
  github: string | null
  screenshot?: string
  description: string
  tagline: string
  overview: string[]
  features: Feature[]
  howItWorks: string
  metrics: Metric[]
  stack: string[]
  stackDetails: StackDetail[]
  badge: string
  badgeColor: string
  featured: boolean
  status: string
  year: string
}

export const projects: Project[] = [
  {
    slug: 'imoveis-barone',
    title: 'Imóveis Barone',
    subtitle: 'Sistema web full stack para imobiliária',
    url: 'https://imoveisbarone.com',
    github: null,
    year: '2024',
    status: 'Em produção',
    badge: 'Cliente real',
    badgeColor: 'success',
    featured: true,
    screenshot: '/screenshots/imoveis-barone.png',

    tagline: 'Sistema completo de gestão e publicação de imóveis, desenvolvido para cliente real e ativo em produção.',

    description:
      'Sistema em produção para cliente real. Painel administrativo com autenticação, CRUD completo de imóveis, upload de mídias, captação de leads e SEO técnico por imóvel.',

    overview: [
      'Desenvolvido para a Barone Consultoria de Vendas, o Imóveis Barone é um sistema web completo que permite à imobiliária gerenciar e publicar seu portfólio de propriedades online — sem depender de portais de terceiros.',
      'O projeto nasceu da necessidade do cliente de ter controle total sobre seus anúncios, uma identidade digital própria e uma forma de captar leads diretamente. O resultado é uma plataforma com área pública para compradores e um painel privado para o corretor.',
      'Toda a infraestrutura roda no Supabase (PostgreSQL + Storage + Auth) com deploy automático no Vercel. O SEO é configurado individualmente por imóvel, aumentando a visibilidade nos buscadores.',
    ],

    features: [
      {
        icon: '🏠',
        title: 'Catálogo público de imóveis',
        description:
          'Listagem com filtros em tempo real por tipo, bairro, faixa de preço e características. Cada imóvel tem página própria com URL amigável para SEO.',
      },
      {
        icon: '🔐',
        title: 'Painel administrativo',
        description:
          'Área protegida por autenticação segura. O corretor gerencia todo o portfólio: cadastra, edita, ativa/desativa e exclui imóveis com poucos cliques.',
      },
      {
        icon: '📸',
        title: 'Upload e galeria de mídias',
        description:
          'Upload de múltiplas fotos por imóvel, organizadas em galeria interativa. Arquivos armazenados no Supabase Storage com URLs públicas otimizadas.',
      },
      {
        icon: '📊',
        title: 'Dashboard de métricas',
        description:
          'Visualização de visualizações por imóvel, leads gerados, imóveis mais acessados e histórico de contatos. Dados em tempo real via Supabase.',
      },
      {
        icon: '💬',
        title: 'Captação de leads',
        description:
          'Formulário de interesse integrado em cada imóvel, com envio automático para o WhatsApp do corretor e armazenamento no banco de dados.',
      },
      {
        icon: '🗺️',
        title: 'SEO por imóvel',
        description:
          'Meta tags dinâmicas, Open Graph e dados estruturados configurados individualmente para cada listagem, maximizando o alcance orgânico nos buscadores.',
      },
    ],

    howItWorks:
      'A aplicação é dividida em duas áreas. A Área Pública permite que compradores naveguem no catálogo com filtros avançados, visualizem fotos em galeria, vejam localização e entrem em contato — tudo sem login. A Área Administrativa é acessível apenas com credenciais: o corretor faz login, tem acesso ao painel completo e pode cadastrar novos imóveis com fotos, preços, descrições e localização. Os dados persistem no PostgreSQL via Supabase, com Row Level Security garantindo isolamento completo entre áreas pública e privada. O deploy é automatizado via Vercel com preview em cada pull request.',

    metrics: [
      { label: 'Imóveis ativos', value: '15+' },
      { label: 'Em produção desde', value: '2024' },
      { label: 'Leads captados', value: '30+' },
      { label: 'Indexado no', value: 'Google' },
    ],

    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase', 'React'],
    stackDetails: [
      { name: 'Next.js 14', role: 'App Router, SSG por imóvel, ISR para catálogo' },
      { name: 'TypeScript', role: 'Type safety em toda a aplicação' },
      { name: 'Supabase', role: 'PostgreSQL + Storage + Auth com RLS' },
      { name: 'Tailwind CSS', role: 'Design system responsivo' },
      { name: 'Framer Motion', role: 'Animações e transições' },
      { name: 'Vercel', role: 'Deploy + CI/CD automático' },
    ],
  },

  {
    slug: 'nutria-ai',
    title: 'NutriaAI',
    subtitle: 'Plataforma full stack com IA aplicada',
    url: 'https://nutria-ai.vercel.app',
    github: null,
    year: '2024',
    status: 'Concluído',
    badge: 'IA aplicada',
    badgeColor: 'accent',
    featured: true,
    screenshot: undefined,

    tagline: 'Plataforma de nutrição inteligente com GPT-4o para geração personalizada de planos alimentares.',

    description:
      'Plataforma com GPT-4o integrado para geração dinâmica de conteúdo nutricional. Fluxo de pagamento automatizado via webhook e dashboard com histórico de planos persistido.',

    overview: [
      'NutriaAI é uma plataforma web que usa inteligência artificial para gerar planos alimentares personalizados. O usuário informa seus objetivos, restrições e preferências — e o GPT-4o cria um plano completo em segundos.',
      'O projeto foi construído com foco em experiência de usuário: fluxo de onboarding simples, geração de conteúdo com streaming em tempo real e dashboard para consultar planos anteriores. O pagamento é processado via webhook com confirmação automática.',
      'A integração com a API da OpenAI usa streaming de tokens, então o usuário vê o plano sendo escrito em tempo real — como um nutricionista digitando ao vivo.',
    ],

    features: [
      {
        icon: '🤖',
        title: 'Geração com GPT-4o',
        description:
          'Planos alimentares personalizados gerados pelo GPT-4o com base em objetivo, peso, altura, restrições e preferências do usuário.',
      },
      {
        icon: '⚡',
        title: 'Streaming em tempo real',
        description:
          'A resposta da IA é transmitida token a token via Server-Sent Events, dando feedback imediato ao usuário enquanto o plano é gerado.',
      },
      {
        icon: '💳',
        title: 'Pagamento com webhook',
        description:
          'Fluxo de pagamento integrado com confirmação automática via webhook — após o pagamento, o acesso é liberado instantaneamente.',
      },
      {
        icon: '📋',
        title: 'Histórico persistido',
        description:
          'Dashboard completo onde o usuário acessa todos os planos gerados anteriormente, com data, objetivo e conteúdo completo.',
      },
      {
        icon: '🔒',
        title: 'Autenticação e planos',
        description:
          'Sistema de autenticação com controle de acesso por plano. Usuários gratuitos têm limite de gerações; planos pagos têm acesso ilimitado.',
      },
      {
        icon: '📱',
        title: 'Design responsivo',
        description:
          'Interface totalmente responsiva, acessível em desktop e mobile com experiência consistente em todos os dispositivos.',
      },
    ],

    howItWorks:
      'O usuário passa por um formulário de onboarding com dados pessoais e objetivos. Ao confirmar, a aplicação monta um prompt estruturado e envia para a API da OpenAI (GPT-4o). A resposta é transmitida via streaming diretamente para o browser usando Server-Sent Events, e o plano é renderizado token a token em tempo real. Após a geração, o plano é salvo no PostgreSQL vinculado ao usuário. O fluxo de pagamento usa webhooks para confirmar transações e liberar acesso automaticamente, sem intervenção manual.',

    metrics: [
      { label: 'Modelo de IA', value: 'GPT-4o' },
      { label: 'Geração em', value: '<5s' },
      { label: 'Integração', value: 'Webhook' },
      { label: 'Histórico', value: 'Persistido' },
    ],

    stack: ['Next.js', 'TypeScript', 'OpenAI GPT-4o', 'PostgreSQL', 'Webhooks'],
    stackDetails: [
      { name: 'Next.js 14', role: 'App Router com Route Handlers para streaming' },
      { name: 'OpenAI API', role: 'GPT-4o com streaming de tokens' },
      { name: 'PostgreSQL', role: 'Armazenamento de usuários e histórico de planos' },
      { name: 'Webhooks', role: 'Confirmação automática de pagamentos' },
      { name: 'TypeScript', role: 'Type safety nas chamadas à API da OpenAI' },
      { name: 'Vercel', role: 'Deploy com suporte a Edge Functions' },
    ],
  },

  {
    slug: 'claro-dados',
    title: 'Claro Dados',
    subtitle: 'Extração e processamento de dados de faturas PDF',
    url: null,
    github: 'https://github.com/Miguel-Pires/Claro-Dados-Sistema-de-Extra-o-e-Processamento-de-Dados',
    year: '2025',
    status: 'Concluído',
    badge: 'Python + Automação',
    badgeColor: 'warning',
    featured: true,
    screenshot: '/screenshots/claro-dados.png',

    tagline: '184 páginas PDF → 444 linhas em planilha em aproximadamente 1 segundo.',

    description:
      'Extrai automaticamente dados de faturas PDF da Claro Empresas. 184 páginas → 444 linhas em ~1 segundo. GUI com drag-and-drop, API REST e integração com n8n para pipeline automatizado via WhatsApp.',

    overview: [
      'Claro Dados nasceu de uma necessidade real: processar centenas de faturas PDF da Claro Empresas mensalmente de forma manual era lento e sujeito a erros. O sistema automatiza completamente esse processo.',
      'Em sua versão mais eficiente, 184 páginas de PDF são processadas e convertidas em 444 linhas de planilha Excel em aproximadamente 1 segundo — usando PyMuPDF para extração de texto com precisão linha a linha.',
      'O projeto tem três formas de uso: interface gráfica com drag-and-drop para uso do time, API REST para integrar com outros sistemas, e um workflow n8n que permite enviar faturas pelo WhatsApp e receber a planilha de volta automaticamente.',
    ],

    features: [
      {
        icon: '⚡',
        title: 'Extração ultrarrápida',
        description:
          '184 páginas de PDF processadas em ~1 segundo. PyMuPDF extrai o conteúdo com precisão, identificando tabelas, números de linha e dados de consumo.',
      },
      {
        icon: '🖥️',
        title: 'Interface gráfica (GUI)',
        description:
          'Aplicação desktop com drag-and-drop usando customtkinter. Arraste um ou vários PDFs, clique em processar e receba o Excel pronto — sem terminal.',
      },
      {
        icon: '🔌',
        title: 'API REST com Flask',
        description:
          'Endpoint REST que recebe um PDF via POST e retorna o Excel em bytes. Qualquer sistema pode integrar-se à extração via HTTP.',
      },
      {
        icon: '📲',
        title: 'Pipeline WhatsApp via n8n',
        description:
          'Workflow completo: usuário envia fatura pelo WhatsApp → n8n aciona a API Flask → sistema extrai os dados → Excel retorna pelo WhatsApp em segundos.',
      },
      {
        icon: '📦',
        title: 'Distribuição como .exe',
        description:
          'Empacotado com PyInstaller como executável standalone. Qualquer usuário pode rodar sem instalar Python ou dependências.',
      },
      {
        icon: '📊',
        title: 'Saída estruturada em Excel',
        description:
          'Dados exportados em planilha .xlsx com colunas organizadas, cabeçalhos padronizados e formatação pronta para análise imediata.',
      },
    ],

    howItWorks:
      'O sistema usa PyMuPDF para abrir o PDF e percorrer página a página, extraindo o texto linha a linha com coordenadas precisas. Um parser customizado identifica padrões nas faturas da Claro (números de linha, datas de consumo, valores) e estrutura os dados em um DataFrame pandas. O DataFrame é exportado como Excel via openpyxl. A GUI (customtkinter) chama esse pipeline em thread separada para não travar a interface. A API Flask expõe o mesmo pipeline como endpoint POST que aceita o PDF em multipart/form-data e retorna o .xlsx em bytes. O workflow n8n recebe o PDF do WhatsApp via WAHA, envia para a API Flask, e devolve o Excel no mesmo chat.',

    metrics: [
      { label: 'PDFs processados', value: '184 pág.' },
      { label: 'Linhas geradas', value: '444' },
      { label: 'Tempo de extração', value: '~1s' },
      { label: 'Modos de uso', value: '3' },
    ],

    stack: ['Python', 'Flask', 'PyMuPDF', 'openpyxl', 'customtkinter', 'n8n'],
    stackDetails: [
      { name: 'PyMuPDF (fitz)', role: 'Extração de texto de PDFs com precisão de coordenadas' },
      { name: 'Flask', role: 'API REST para integração com n8n e outros sistemas' },
      { name: 'pandas + openpyxl', role: 'Estruturação e exportação do Excel' },
      { name: 'customtkinter', role: 'Interface gráfica desktop com tema dark' },
      { name: 'PyInstaller', role: 'Empacotamento como .exe standalone' },
      { name: 'n8n + WAHA', role: 'Pipeline de automação WhatsApp → PDF → Excel' },
    ],
  },

  {
    slug: 'agropecuaria-tatui',
    title: 'Agropecuária Tatuí',
    subtitle: 'E-commerce com catálogo e carrinho WhatsApp',
    url: 'https://agrotatui.vercel.app',
    github: null,
    year: '2025',
    status: 'Concluído',
    badge: 'E-commerce',
    badgeColor: 'muted',
    featured: false,
    screenshot: '/screenshots/agro-tatui.png',

    tagline: 'Catálogo de produtos com busca em tempo real e carrinho integrado ao WhatsApp.',

    description:
      'Catálogo com busca em tempo real, filtros por categoria e carrinho integrado ao WhatsApp. Painel admin com RLS e modelagem relacional para gestão completa de produtos.',

    overview: [
      'Agropecuária Tatuí é uma plataforma de e-commerce desenvolvida para uma loja do agronegócio em Tatuí/SP. O objetivo era permitir que clientes navegassem pelo catálogo online e fizessem pedidos diretamente pelo WhatsApp.',
      'O diferencial está na integração com WhatsApp: ao finalizar o carrinho, o cliente é redirecionado para uma conversa com a mensagem já formatada com todos os produtos, quantidades e total — sem processamento de pagamento online, mantendo o fluxo de venda natural do negócio.',
      'O painel administrativo permite que o proprietário gerencie produtos, categorias e estoque de forma simples, com Row Level Security garantindo que apenas usuários autorizados modifiquem os dados.',
    ],

    features: [
      {
        icon: '🔍',
        title: 'Busca em tempo real',
        description:
          'Campo de pesquisa com debounce que filtra produtos instantaneamente por nome, categoria ou descrição — sem recarregar a página.',
      },
      {
        icon: '🛒',
        title: 'Carrinho integrado ao WhatsApp',
        description:
          'Carrinho de compras que gera uma mensagem formatada com todos os itens e envia direto para o WhatsApp da loja. Zero atrito para o cliente.',
      },
      {
        icon: '📂',
        title: 'Filtros por categoria',
        description:
          'Navegação por categorias de produtos (rações, veterinários, defensivos, sementes) com filtros que se combinam com a busca.',
      },
      {
        icon: '🔐',
        title: 'Painel admin com RLS',
        description:
          'Área administrativa protegida com autenticação. Row Level Security no Supabase garante isolamento entre dados públicos e privados.',
      },
      {
        icon: '📦',
        title: 'Gestão de estoque',
        description:
          'CRUD completo de produtos com controle de disponibilidade. Produtos fora de estoque são marcados automaticamente como indisponíveis.',
      },
      {
        icon: '📱',
        title: 'Mobile-first',
        description:
          'Layout otimizado para dispositivos móveis, onde a maioria dos clientes acessa. Cards de produto adaptativos e carrinho acessível.',
      },
    ],

    howItWorks:
      'Os produtos ficam no PostgreSQL via Supabase, consultados em tempo real com filtros aplicados no servidor (queries com ILIKE e joins de categoria). O carrinho é gerenciado no estado local (React useState) e persiste durante a sessão. Ao finalizar, a aplicação monta uma string formatada com todos os itens e abre o WhatsApp Web com a mensagem pré-preenchida via deep link (wa.me). O painel admin é uma rota protegida por middleware de autenticação Supabase, e o RLS no banco bloqueia escritas de usuários não autenticados mesmo se o frontend for bypassado.',

    metrics: [
      { label: 'Categorias', value: '8+' },
      { label: 'Pedidos via', value: 'WhatsApp' },
      { label: 'Busca', value: 'Tempo real' },
      { label: 'RLS', value: 'Ativo' },
    ],

    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Supabase'],
    stackDetails: [
      { name: 'Next.js 14', role: 'App Router com renderização híbrida' },
      { name: 'Supabase', role: 'PostgreSQL + Auth + RLS' },
      { name: 'TypeScript', role: 'Tipagem completa dos produtos e carrinho' },
      { name: 'Tailwind CSS', role: 'Design responsivo mobile-first' },
      { name: 'Vercel', role: 'Deploy automático' },
    ],
  },

  {
    slug: 'frameestate',
    title: 'FrameEstate',
    subtitle: 'Landing page institucional com design system próprio',
    url: 'https://frameestate.vercel.app',
    github: null,
    year: '2024',
    status: 'Concluído',
    badge: 'Frontend',
    badgeColor: 'muted',
    featured: false,
    screenshot: '/screenshots/frameestate.png',

    tagline: 'Landing page de alto padrão com design system próprio, animações fluidas e componentes reutilizáveis.',

    description:
      'Interface responsiva com design system próprio, animações elaboradas com Framer Motion e componentes reutilizáveis. Foco em qualidade de código e experiência visual.',

    overview: [
      'FrameEstate é uma landing page institucional desenvolvida como showcase de habilidades de frontend — demonstrando domínio de design system, animações e qualidade de código.',
      'O projeto tem um design system completo com tokens de cor, tipografia e espaçamento, componentes reutilizáveis e animações consistentes. Cada elemento foi pensado para compor uma experiência visual coesa.',
      'As animações com Framer Motion seguem um padrão de stagger (elementos entrando em sequência), parallax no scroll e microinterações em hover que dão vida à página sem afetar a performance.',
    ],

    features: [
      {
        icon: '🎨',
        title: 'Design system completo',
        description:
          'Tokens de cor, tipografia e espaçamento definidos no Tailwind config. Componentes construídos sobre esse sistema para consistência visual.',
      },
      {
        icon: '✨',
        title: 'Animações com Framer Motion',
        description:
          'Animações de entrada em stagger, parallax no scroll, microinterações em hover e transições de página fluidas.',
      },
      {
        icon: '🧱',
        title: 'Componentes reutilizáveis',
        description:
          'Biblioteca de componentes (Button, Card, Badge, Section) criados do zero, tipados com TypeScript e composáveis.',
      },
      {
        icon: '📱',
        title: 'Responsivo e acessível',
        description:
          'Layout que funciona perfeitamente de 320px a 1920px. Semântica HTML correta e contraste WCAG AA em todos os elementos.',
      },
    ],

    howItWorks:
      'A estrutura segue o padrão de componentes atômicos: tokens → componentes base → seções → página. As animações usam useInView do Framer Motion para disparar quando o elemento entra na viewport, com variantes definidas externamente para consistência. O design system é configurado no tailwind.config com cores customizadas, fonte Inter e animações CSS personalizadas.',

    metrics: [
      { label: 'Performance', value: '100 Lighthouse' },
      { label: 'Animações', value: 'Framer Motion' },
      { label: 'Design System', value: 'Próprio' },
      { label: 'Responsivo', value: 'Mobile-first' },
    ],

    stack: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    stackDetails: [
      { name: 'Next.js 14', role: 'Framework com geração estática' },
      { name: 'Framer Motion', role: 'Animações declarativas e gestos' },
      { name: 'Tailwind CSS', role: 'Design system com tokens customizados' },
      { name: 'TypeScript', role: 'Props e variantes tipadas' },
    ],
  },
]

export type Automation = {
  title: string
  subtitle: string
  nodes: number
  description: string
  stack: string[]
  highlight: string
  details: string[]
}

export const automations: Automation[] = [
  {
    title: 'Bot-Barone',
    subtitle: 'WhatsApp AI Chatbot',
    nodes: 40,
    description:
      'Chatbot conversacional completo com IA. Recebe mensagens via WhatsApp, processa com GPT-4o, mantém memória da conversa via Redis e aciona APIs externas conforme a intenção.',
    stack: ['n8n', 'OpenAI GPT-4o', 'Redis', 'WAHA', 'HTTP Requests'],
    highlight: 'Agente de IA com 40 nós e memória persistente de conversa',
    details: [
      'Recebe mensagens do WhatsApp via WAHA (webhook)',
      'Busca histórico da conversa no Redis para manter contexto',
      'Envia para GPT-4o com system prompt de vendedor imobiliário',
      'Detecta intenção: dúvidas, agendamentos, informações de imóveis',
      'Aciona APIs externas conforme a intenção detectada',
      'Salva resposta no Redis e envia de volta ao usuário',
    ],
  },
  {
    title: 'Barone — Lembrete & Agendamento',
    subtitle: 'Automação em produção',
    nodes: 13,
    description:
      'Dois workflows ativos em produção: notifica clientes ao agendar visitas e envia lembretes automáticos 1h antes. Dados lidos em tempo real do Google Sheets.',
    stack: ['n8n', 'Google Sheets', 'WAHA', 'JavaScript'],
    highlight: 'Ativo em produção — zero intervenção manual do corretor',
    details: [
      'Webhook acionado ao criar novo agendamento no sistema',
      'Lê dados do cliente no Google Sheets (nome, telefone, imóvel)',
      'Envia confirmação de visita via WhatsApp com detalhes',
      'Cron job verifica agendamentos do próximo 1h a cada 10 minutos',
      'Envia lembrete automático antes da visita',
      'Registra status de envio no Google Sheets',
    ],
  },
  {
    title: 'Leitura Dados Claro',
    subtitle: 'Pipeline WhatsApp → PDF → Excel',
    nodes: 13,
    description:
      'Usuário envia fatura PDF pelo WhatsApp → n8n aciona a API Flask → sistema extrai centenas de linhas → Excel formatado retorna pelo WhatsApp em segundos.',
    stack: ['n8n', 'WAHA', 'Flask API', 'Python'],
    highlight: 'Integração end-to-end: mensagem → processamento → resposta',
    details: [
      'WAHA detecta mensagem com anexo PDF no WhatsApp',
      'n8n faz download do arquivo e envia para a API Flask via POST',
      'Flask aciona o parser Python (PyMuPDF) no PDF recebido',
      'Dados extraídos são estruturados e exportados como Excel',
      'n8n recebe o arquivo Excel em bytes da resposta',
      'WAHA envia o Excel de volta ao usuário no mesmo chat',
    ],
  },
]
