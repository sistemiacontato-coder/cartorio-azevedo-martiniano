// =============================================
// App.js — Core: dados, navegação, views públicas
// =============================================

// --- DADOS PADRÃO ---
const DADOS_PADRAO = {
  config: {
    menus: { home:true, tutoriais:true, materiais:true, suporte:true },
    certificado: true
  },
  tutoriais: [
    { id:1, titulo:'Introdução ao Sistema', url:'https://player.vimeo.com/video/824804225', duracao:'08:32', concluida:true, material:'' },
    { id:2, titulo:'Navegação e Interface', url:'https://player.vimeo.com/video/824804225', duracao:'12:15', concluida:true, material:'' },
    { id:3, titulo:'Autenticação de Documentos', url:'https://player.vimeo.com/video/824804225', duracao:'15:40', concluida:false, material:'Manual de Autenticação' },
    { id:4, titulo:'Reconhecimento de Firma', url:'https://player.vimeo.com/video/824804225', duracao:'11:20', concluida:false, material:'' },
    { id:5, titulo:'Procurações e Atas Notariais', url:'https://player.vimeo.com/video/824804225', duracao:'18:05', concluida:false, material:'' }
  ],
  materiais: [
    { id:1, icon:'picture_as_pdf', titulo:'Manual de Autenticação de Documentos', desc:'Diretrizes completas sobre conferência e selagem de cópias reprográficas.', tipo:'PDF', tamanho:'2.4 MB' },
    { id:2, icon:'picture_as_pdf', titulo:'Guia Prático: Reconhecimento de Firma', desc:'Passo a passo sobre firmas por semelhança e autenticidade.', tipo:'PDF', tamanho:'1.8 MB' },
    { id:3, icon:'picture_as_pdf', titulo:'Procedimentos para Procurações Públicas', desc:'Guia de redação e qualificação das partes para atos notariais.', tipo:'PDF', tamanho:'4.1 MB' },
    { id:4, icon:'picture_as_pdf', titulo:'Apostilamento de Haia: Diretrizes 2024', desc:'Normativas do CNJ referentes à legalização de documentos internacionais.', tipo:'PDF', tamanho:'3.5 MB' },
    { id:5, icon:'table_chart', titulo:'Tabela de Emolumentos Atualizada', desc:'Planilha oficial de custas e emolumentos com cálculos automatizados.', tipo:'XLSX', tamanho:'1.1 MB' },
    { id:6, icon:'picture_as_pdf', titulo:'Diretrizes de Atendimento ao Cliente', desc:'Cartilha de excelência: comunicação assertiva e postura ética.', tipo:'PDF', tamanho:'5.0 MB' }
  ]
};

// --- STORAGE ---
function getData() {
  const raw = localStorage.getItem('cartorio_data');
  if (!raw) { setData(DADOS_PADRAO); return DADOS_PADRAO; }
  return JSON.parse(raw);
}
function setData(d) { localStorage.setItem('cartorio_data', JSON.stringify(d)); }
function getConfig() { return getData().config; }
function isMaster() { return localStorage.getItem('userRole') === 'master'; }
function isAdministrador() { return localStorage.getItem('userRole') === 'administrador'; }
function isAdminOrMaster() { const r = localStorage.getItem('userRole'); return r === 'master' || r === 'administrador'; }

// --- INIT ---
document.addEventListener('DOMContentLoaded', () => {
  initFirebase();
  renderSidebar();
  renderMobileNav();
  renderHeaderBadge();
  renderAllViews();
  navigateTo('home');
});

// --- SIDEBAR DINÂMICA ---
function renderSidebar() {
  const cfg = getConfig();
  const nav = document.getElementById('sidebar-nav');
  const items = [
    { page:'home', icon:'home', label:'Home' },
    { page:'tutoriais', icon:'school', label:'Tutoriais' },
    { page:'materiais', icon:'folder_open', label:'Materiais de Apoio' },
    { page:'suporte', icon:'help_center', label:'Suporte' }
  ];
  let html = '';
  items.forEach(it => {
    if (!cfg.menus[it.page]) return;
    html += `<a href="#" data-page="${it.page}" class="nav-link flex items-center gap-3 px-4 py-3 ml-4 rounded-l-lg font-label-md text-label-md transition-all duration-200">
      <span class="material-symbols-outlined nav-icon">${it.icon}</span>${it.label}</a>`;
  });
  if (isAdminOrMaster()) {
    html += `<a href="#" data-page="admin" class="nav-link flex items-center gap-3 px-4 py-3 ml-4 rounded-l-lg font-label-md text-label-md transition-all duration-200 mt-4 border-t border-outline-variant pt-4">
      <span class="material-symbols-outlined nav-icon">admin_panel_settings</span>Configurações</a>`;
  }
  nav.innerHTML = html;
  // Certificado
  const btnCert = document.getElementById('btn-certificado');
  if (btnCert) btnCert.style.display = cfg.certificado ? '' : 'none';
  // Re-bindear clicks
  nav.querySelectorAll('[data-page]').forEach(l => l.addEventListener('click', e => { e.preventDefault(); navigateTo(l.dataset.page); }));
}

function renderMobileNav() {
  const cfg = getConfig();
  const nav = document.getElementById('mobile-nav');
  const items = [
    { page:'home', icon:'home', label:'Home' },
    { page:'tutoriais', icon:'school', label:'Tutoriais' },
    { page:'materiais', icon:'folder_open', label:'Materiais' },
    { page:'suporte', icon:'help_center', label:'Suporte' }
  ];
  let html = '';
  items.forEach(it => {
    if (!cfg.menus[it.page]) return;
    html += `<a href="#" data-page="${it.page}" class="mobile-nav-link flex flex-col items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
      <span class="material-symbols-outlined nav-icon">${it.icon}</span>${it.label}</a>`;
  });
  if (isAdminOrMaster()) {
    html += `<a href="#" data-page="admin" class="mobile-nav-link flex flex-col items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
      <span class="material-symbols-outlined nav-icon">admin_panel_settings</span>Config</a>`;
  }
  nav.innerHTML = html;
  nav.querySelectorAll('[data-page]').forEach(l => l.addEventListener('click', e => { e.preventDefault(); navigateTo(l.dataset.page); }));
}

function renderHeaderBadge() {
  const badge = document.getElementById('header-user-badge');
  if (isMaster()) {
    badge.innerHTML = '<span class="badge-master"><span class="material-symbols-outlined" style="font-size:14px">shield_person</span>MASTER</span>';
  } else if (isAdministrador()) {
    badge.innerHTML = '<span class="badge-admin"><span class="material-symbols-outlined" style="font-size:14px">manage_accounts</span>ADMIN</span>';
  }
}

// --- NAVEGAÇÃO ---
function navigateTo(page) {
  document.querySelectorAll('[id^="view-"]').forEach(v => v.classList.add('hidden'));
  const view = document.getElementById('view-' + page);
  if (view) { view.classList.remove('hidden'); view.classList.add('fade-in'); }
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll(`.nav-link[data-page="${page}"]`).forEach(l => l.classList.add('active'));
  document.querySelectorAll('.mobile-nav-link').forEach(l => { l.classList.remove('active'); l.classList.add('text-on-surface-variant'); });
  document.querySelectorAll(`.mobile-nav-link[data-page="${page}"]`).forEach(l => { l.classList.add('active'); l.classList.remove('text-on-surface-variant'); });
  window.scrollTo(0,0);
  if (page === 'admin' && isMaster()) setTimeout(() => atualizarRelatorio(), 150);
}

// --- RENDER VIEWS ---
function renderAllViews() {
  document.getElementById('view-home').innerHTML = homeView();
  document.getElementById('view-tutoriais').innerHTML = tutoriaisView();
  document.getElementById('view-materiais').innerHTML = materiaisView();
  document.getElementById('view-suporte').innerHTML = suporteView();
  if (isAdminOrMaster()) document.getElementById('view-admin').innerHTML = adminView();
}

function reloadApp() { renderSidebar(); renderMobileNav(); renderAllViews(); }

// --- HOME ---
function homeView() {
  const data = getData();
  const concluidas = data.tutoriais.filter(t=>t.concluida).length;
  const total = data.tutoriais.length;
  const pct = total ? Math.round(concluidas/total*100) : 0;
  const primeiro = data.tutoriais[0];
  const nome = localStorage.getItem('userName') || 'Colaborador';
  return `
  <section class="mb-12">
    <h1 class="font-headline-xl text-headline-xl text-primary mb-3">Bem-vindo, ${nome}!</h1>
    <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Continue sua jornada de capacitação profissional.</p>
  </section>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-16">
    <div class="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded p-4 md:p-6 flex flex-col card-hover">
      <div class="mb-4"><span class="inline-block bg-primary-container text-inverse-primary px-3 py-1 rounded font-label-sm text-label-sm mb-3">Módulo em Destaque</span>
      <h2 class="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">${primeiro?primeiro.titulo:'Sem aulas'}</h2></div>
      <div class="video-wrapper border border-outline-variant">${primeiro?`<iframe src="${primeiro.url}?title=0&byline=0&portrait=0" allow="autoplay;fullscreen;picture-in-picture" allowfullscreen></iframe>`:''}</div>
    </div>
    <div class="flex flex-col gap-gutter">
      <div class="bg-surface-container-lowest border border-outline-variant rounded p-6 border-t-4 border-t-secondary">
        <h3 class="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2"><span class="material-symbols-outlined text-secondary">trending_up</span>Seu Progresso</h3>
        <div class="flex items-center justify-between mb-2"><span class="font-label-md text-label-md text-on-surface-variant">Geral</span><span class="font-label-md text-label-md text-primary font-bold">${pct}%</span></div>
        <div class="h-1.5 w-full bg-surface-variant rounded-full overflow-hidden mb-8"><div class="h-full bg-secondary rounded-full progress-animated" style="--progress:${pct}%"></div></div>
        <button onclick="navigateTo('tutoriais')" class="w-full py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded hover:bg-inverse-surface transition-colors">Continuar Aula</button>
      </div>
      <div class="bg-surface-container-lowest border border-outline-variant rounded p-6 card-hover flex-1">
        <h3 class="font-label-md text-label-md text-on-surface-variant mb-5 uppercase tracking-wider border-b border-outline-variant pb-2">Avisos</h3>
        <ul class="flex flex-col gap-5">
          <li class="flex gap-4 items-start"><div class="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center shrink-0"><span class="material-symbols-outlined text-secondary text-sm">campaign</span></div>
          <div><p class="font-label-md text-label-md text-primary mb-1">Manutenção Programada</p><p class="font-body-md text-body-md text-on-surface-variant text-sm">Sistema indisponível amanhã das 02h às 04h.</p></div></li>
        </ul>
      </div>
    </div>
  </div>`;
}

// --- TUTORIAIS ---
function tutoriaisView() {
  const data = getData();
  const aulas = data.tutoriais;
  const ativa = aulas.find(a=>!a.concluida) || aulas[0];
  const concluidas = aulas.filter(a=>a.concluida).length;
  const pct = aulas.length ? Math.round(concluidas/aulas.length*100) : 0;
  return `
  <div class="mb-10"><h1 class="font-headline-xl text-headline-xl text-primary mb-2">Trilhas de Aprendizagem</h1>
  <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Continue seu desenvolvimento profissional com nossos módulos especializados.</p></div>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
    <div class="lg:col-span-2 space-y-6">
      <div class="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
        <div class="video-wrapper"><iframe id="vimeo-player" src="${ativa?ativa.url+'?title=0&byline=0&portrait=0':''}" allow="autoplay;fullscreen;picture-in-picture" allowfullscreen></iframe></div>
        <div class="p-6">
          <h2 id="current-lesson-title" class="font-headline-lg text-headline-lg text-primary mb-4">${ativa?ativa.titulo:''}</h2>
          <button class="inline-flex items-center gap-2 px-5 py-2.5 border border-secondary text-secondary font-label-md text-label-md rounded hover:bg-secondary hover:text-on-secondary transition-colors">
            <span class="material-symbols-outlined text-sm">download</span>Material para Download
          </button>
        </div>
      </div>
    </div>
    <div class="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
      <div class="p-4 border-b border-outline-variant">
        <h3 class="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">Módulo de Atendimento</h3>
        <p class="font-label-sm text-label-sm text-on-surface-variant mt-1">${concluidas} de ${aulas.length} aulas concluídas</p>
        <div class="h-1 w-full bg-surface-variant rounded-full mt-3 overflow-hidden"><div class="h-full bg-secondary rounded-full progress-animated" style="--progress:${pct}%"></div></div>
      </div>
      <ul class="divide-y divide-outline-variant/50">
        ${aulas.map(a => `
        <li onclick="selectLesson(${a.id})" class="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-surface-container-low transition-colors ${a.id===ativa?.id?'bg-surface-container-low border-l-[3px] border-l-secondary':''}">
          <div class="w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${a.concluida?'bg-secondary/10 text-secondary':'bg-surface-container text-on-surface-variant'}">
            <span class="material-symbols-outlined text-sm" ${a.concluida?'style="font-variation-settings:\'FILL\' 1"':''}>${a.concluida?'check_circle':'play_circle'}</span>
          </div>
          <div class="flex-1 min-w-0"><p class="font-label-md text-label-md ${a.id===ativa?.id?'text-primary font-bold':'text-on-surface'} truncate">${a.titulo}</p>
          <p class="font-label-sm text-label-sm text-on-surface-variant">${a.duracao}</p></div>
          ${a.concluida?'<span class="font-label-sm text-label-sm text-secondary">✓</span>':''}
        </li>`).join('')}
      </ul>
    </div>
  </div>`;
}

function selectLesson(id) {
  const data = getData();
  const aula = data.tutoriais.find(a=>a.id===id);
  if (!aula) return;
  document.getElementById('vimeo-player').src = aula.url+'?title=0&byline=0&portrait=0&autoplay=1';
  document.getElementById('current-lesson-title').textContent = aula.titulo;
  const email = localStorage.getItem('userEmail');
  if (email) registrarVisualizacao(email, aula.id, aula.titulo);
}

// --- MATERIAIS ---
function materiaisView() {
  const data = getData();
  return `
  <div class="mb-10"><h1 class="font-headline-lg text-headline-lg text-primary mb-2">Materiais de Apoio</h1>
  <p class="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">Acesse e faça o download da documentação técnica e guias de referência.</p></div>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    ${data.materiais.map(d => `
    <div class="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 flex flex-col h-full card-hover group relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-1 bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div class="flex items-start justify-between mb-4">
        <div class="w-12 h-12 rounded-lg bg-surface-container-low text-primary flex items-center justify-center"><span class="material-symbols-outlined text-3xl">${d.icon}</span></div>
        <span class="bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-2 py-1 rounded uppercase tracking-wider">${d.tipo} • ${d.tamanho}</span>
      </div>
      <h3 class="font-body-lg text-body-lg font-semibold text-primary mb-2">${d.titulo}</h3>
      <p class="font-body-md text-body-md text-on-surface-variant mb-6 flex-1">${d.desc}</p>
      <button class="w-full py-2 px-4 rounded-lg border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-on-secondary transition-colors font-label-md text-label-md flex items-center justify-center gap-2">
        <span class="material-symbols-outlined">download</span>Baixar Documento
      </button>
    </div>`).join('')}
  </div>`;
}

// --- SUPORTE ---
function suporteView() {
  const faqs = [
    { q:'Como posso interagir com a Plataforma IA?', a:'Dentro de qualquer módulo do curso, clique no ícone "Assistente IA" no canto inferior direito para abrir o chat.' },
    { q:'Onde encontro meus certificados?', a:'Na seção "Progresso" do menu superior. Ao atingir 100%, o download é liberado automaticamente.' },
    { q:'Qual o tempo de resposta do suporte?', a:'Segunda a sexta, 09h às 18h. Primeira resposta em até 4 horas úteis.' },
    { q:'A plataforma tem limite de consultas?', a:'Limite flexível de 50 interações complexas/dia. Consultas simples não contabilizam.' }
  ];
  return `
  <div class="mb-12"><h1 class="font-headline-xl text-headline-xl text-primary mb-3">Central de Suporte</h1>
  <p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Encontre respostas rápidas ou entre em contato com nossa equipe.</p></div>
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
    <div class="lg:col-span-7 space-y-6">
      <h2 class="font-headline-md text-headline-md text-primary flex items-center gap-2"><span class="material-symbols-outlined text-secondary">forum</span>Perguntas Frequentes</h2>
      <div class="space-y-4">${faqs.map(f => `
        <div class="faq-item bg-surface-container-lowest border border-outline-variant rounded transition-colors hover:border-secondary cursor-pointer">
          <div class="px-6 py-4 flex justify-between items-center" onclick="toggleFaq(this)">
            <h3 class="font-label-md text-label-md text-primary pr-4">${f.q}</h3>
            <span class="material-symbols-outlined faq-icon text-on-surface-variant shrink-0">expand_more</span>
          </div>
          <div class="faq-content"><div class="px-6 pb-5 pt-2 font-body-md text-body-md text-on-surface-variant border-t border-outline-variant/30">${f.a}</div></div>
        </div>`).join('')}</div>
    </div>
    <div class="lg:col-span-5"><div class="bg-surface-container-lowest border border-outline-variant rounded p-8 sticky top-28">
      <h2 class="font-headline-md text-headline-md text-primary mb-2">Fale Conosco</h2>
      <p class="font-body-md text-body-md text-on-surface-variant mb-6">Envie sua dúvida diretamente.</p>
      <form class="space-y-5" onsubmit="event.preventDefault();alert('Mensagem enviada!')">
        <div><label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Assunto</label>
        <select class="w-full bg-surface border border-outline-variant rounded px-4 py-3 font-body-md text-body-md focus:border-primary outline-none">
          <option>Dúvida sobre a Plataforma</option><option>Suporte Técnico</option><option>Conteúdo/Curso</option><option>Certificados</option><option>Outros</option>
        </select></div>
        <div><label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Mensagem</label>
        <textarea class="w-full bg-surface border border-outline-variant rounded px-4 py-3 font-body-md text-body-md focus:border-primary outline-none resize-y" rows="4" placeholder="Descreva sua dúvida..."></textarea></div>
        <button class="w-full bg-primary text-on-primary hover:bg-inverse-surface transition-colors rounded font-label-md text-label-md px-6 py-3 flex justify-center items-center gap-2" type="submit">Enviar <span class="material-symbols-outlined text-sm">send</span></button>
      </form>
    </div></div>
  </div>`;
}

function toggleFaq(el) {
  const item = el.parentElement;
  const wasActive = item.classList.contains('active');
  document.querySelectorAll('.faq-item').forEach(e => e.classList.remove('active'));
  if (!wasActive) item.classList.add('active');
}
