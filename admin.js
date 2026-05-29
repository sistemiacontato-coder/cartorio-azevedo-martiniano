// =============================================
// Admin.js — Painel de Configurações Master
// =============================================

function adminView() {
  const data = getData();
  const cfg = data.config;
  const isMasterRole = isMaster();
  return `
  <div class="mb-10">
    <div class="flex items-center gap-3 mb-2">
      <span class="material-symbols-outlined text-secondary text-3xl">admin_panel_settings</span>
      <h1 class="font-headline-xl text-headline-xl text-primary">${isMasterRole ? 'Configurações Master' : 'Configurações'}</h1>
    </div>
    <p class="font-body-lg text-body-lg text-on-surface-variant">${isMasterRole ? 'Gerencie menus, vídeos, materiais e a visibilidade dos elementos da plataforma.' : 'Gerencie usuários e acompanhe o engajamento da equipe.'}</p>
  </div>

  ${isMasterRole ? `
  <!-- VISIBILIDADE DOS MENUS -->
  <div class="admin-card mb-6">
    <h2 class="font-headline-md text-headline-md text-primary mb-6 flex items-center gap-2">
      <span class="material-symbols-outlined text-secondary">menu</span>Visibilidade dos Menus
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      ${toggleItem('menu_home','Home',cfg.menus.home)}
      ${toggleItem('menu_tutoriais','Tutoriais',cfg.menus.tutoriais)}
      ${toggleItem('menu_materiais','Materiais de Apoio',cfg.menus.materiais)}
      ${toggleItem('menu_suporte','Suporte',cfg.menus.suporte)}
      ${toggleItem('cfg_certificado','Botão Certificado',cfg.certificado)}
    </div>
    <button onclick="salvarVisibilidade()" class="mt-6 px-6 py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded hover:bg-inverse-surface transition-colors flex items-center gap-2">
      <span class="material-symbols-outlined text-sm">save</span>Salvar Configurações
    </button>
  </div>

  <!-- GERENCIAR TUTORIAIS / VÍDEOS -->
  <div class="admin-card mb-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-headline-md text-headline-md text-primary flex items-center gap-2">
        <span class="material-symbols-outlined text-secondary">video_library</span>Gerenciar Vídeos / Tutoriais
      </h2>
      <button onclick="abrirModalVideo()" class="px-4 py-2 bg-secondary text-on-secondary font-label-md text-label-md rounded hover:bg-secondary-container hover:text-on-secondary-container transition-colors flex items-center gap-1">
        <span class="material-symbols-outlined text-sm">add</span>Adicionar
      </button>
    </div>
    <div class="space-y-3" id="admin-videos-list">
      ${data.tutoriais.map(t => videoAdminRow(t)).join('')}
    </div>
    ${data.tutoriais.length===0?'<p class="text-on-surface-variant font-body-md py-4 text-center">Nenhum vídeo cadastrado.</p>':''}
  </div>

  <!-- GERENCIAR MATERIAIS -->
  <div class="admin-card mb-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-headline-md text-headline-md text-primary flex items-center gap-2">
        <span class="material-symbols-outlined text-secondary">folder_managed</span>Gerenciar Materiais de Apoio
      </h2>
      <button onclick="abrirModalMaterial()" class="px-4 py-2 bg-secondary text-on-secondary font-label-md text-label-md rounded hover:bg-secondary-container hover:text-on-secondary-container transition-colors flex items-center gap-1">
        <span class="material-symbols-outlined text-sm">add</span>Adicionar
      </button>
    </div>
    <div class="space-y-3" id="admin-materiais-list">
      ${data.materiais.map(m => materialAdminRow(m)).join('')}
    </div>
    ${data.materiais.length===0?'<p class="text-on-surface-variant font-body-md py-4 text-center">Nenhum material cadastrado.</p>':''}
  </div>` : ''}

  <!-- GERENCIAR USUÁRIOS -->
  <div class="admin-card mb-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-headline-md text-headline-md text-primary flex items-center gap-2">
        <span class="material-symbols-outlined text-secondary">group</span>Gerenciar Usuários
      </h2>
      <button onclick="abrirModalUsuario()" class="px-4 py-2 bg-secondary text-on-secondary font-label-md text-label-md rounded hover:bg-secondary-container hover:text-on-secondary-container transition-colors flex items-center gap-1">
        <span class="material-symbols-outlined text-sm">add</span>Adicionar
      </button>
    </div>
    <div class="space-y-3" id="admin-usuarios-list">
      ${getUsuarios().map(u => usuarioAdminRow(u)).join('')}
    </div>
    ${getUsuarios().length === 0 ? '<p class="text-on-surface-variant font-body-md py-4 text-center">Nenhum usuário cadastrado.</p>' : ''}
  </div>

  <!-- RELATÓRIO DE VISUALIZAÇÕES -->
  <div class="admin-card mb-6">
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-headline-md text-headline-md text-primary flex items-center gap-2">
        <span class="material-symbols-outlined text-secondary">analytics</span>Relatório de Visualizações
      </h2>
      <button onclick="atualizarRelatorio()" class="px-4 py-2 bg-surface-container border border-outline-variant text-on-surface font-label-md text-label-md rounded hover:bg-surface-container-high transition-colors flex items-center gap-1">
        <span class="material-symbols-outlined text-sm">refresh</span>Atualizar
      </button>
    </div>
    <div id="relatorio-container" class="text-center py-10 text-on-surface-variant">
      <span class="material-symbols-outlined text-4xl text-outline block mb-3">bar_chart</span>
      <p class="font-body-md">Carregando dados...</p>
    </div>
  </div>

  `;}

// --- COMPONENTES ADMIN ---
function toggleItem(id, label, checked) {
  return `<div class="flex items-center justify-between p-3 bg-surface rounded border border-outline-variant/50">
    <span class="font-label-md text-label-md text-on-surface">${label}</span>
    <label class="toggle-switch"><input type="checkbox" id="${id}" ${checked?'checked':''}><span class="toggle-slider"></span></label>
  </div>`;
}

function videoAdminRow(t) {
  return `<div class="admin-item">
    <div class="flex items-center gap-3 flex-1 min-w-0">
      <span class="material-symbols-outlined text-primary shrink-0 ${t.concluida?'text-secondary':''}" ${t.concluida?'style="font-variation-settings:\'FILL\' 1"':''}>${t.concluida?'check_circle':'play_circle'}</span>
      <div class="min-w-0"><p class="font-label-md text-label-md text-primary truncate">${t.titulo}</p>
      <p class="font-label-sm text-label-sm text-on-surface-variant truncate">${t.url.substring(0,50)}...</p></div>
    </div>
    <div class="flex items-center gap-2 shrink-0">
      <button onclick="abrirModalVideo(${t.id})" class="p-1.5 text-on-surface-variant hover:text-primary transition-colors" title="Editar"><span class="material-symbols-outlined text-sm">edit</span></button>
      <button onclick="excluirVideo(${t.id})" class="p-1.5 text-on-surface-variant hover:text-error transition-colors" title="Excluir"><span class="material-symbols-outlined text-sm">delete</span></button>
    </div>
  </div>`;
}

function materialAdminRow(m) {
  return `<div class="admin-item">
    <div class="flex items-center gap-3 flex-1 min-w-0">
      <span class="material-symbols-outlined text-primary shrink-0">${m.icon}</span>
      <div class="min-w-0"><p class="font-label-md text-label-md text-primary truncate">${m.titulo}</p>
      <p class="font-label-sm text-label-sm text-on-surface-variant">${m.tipo} • ${m.tamanho}</p></div>
    </div>
    <div class="flex items-center gap-2 shrink-0">
      <button onclick="abrirModalMaterial(${m.id})" class="p-1.5 text-on-surface-variant hover:text-primary transition-colors" title="Editar"><span class="material-symbols-outlined text-sm">edit</span></button>
      <button onclick="excluirMaterial(${m.id})" class="p-1.5 text-on-surface-variant hover:text-error transition-colors" title="Excluir"><span class="material-symbols-outlined text-sm">delete</span></button>
    </div>
  </div>`;
}

// --- STORAGE DE USUÁRIOS ---
const USUARIOS_PADRAO = [
  { nome: 'Cyro',                    usuario: 'cyro',                  email: 'contatoazevedomartiniano+cyro@gmail.com',                  senha: 'c1c2c3@!CAM_423709', role: 'membro' },
  { nome: 'Davi',                    usuario: 'davi',                  email: 'contatoazevedomartiniano+davi@gmail.com',                  senha: 'c1c2c3@!CAM_065142', role: 'membro' },
  { nome: 'Fernando',                usuario: 'fernando',              email: 'contatoazevedomartiniano+fernando@gmail.com',              senha: 'c1c2c3@!CAM_832041', role: 'membro' },
  { nome: 'José',                    usuario: 'jose',                  email: 'contatoazevedomartiniano+jose@gmail.com',                  senha: 'c1c2c3@!CAM_530178', role: 'membro' },
  { nome: 'Alice Magalhães',         usuario: 'alicemagalhaes',        email: 'contatoazevedomartiniano+alicemagalhaes@gmail.com',        senha: 'c1c2c3@!CAM_730528', role: 'membro' },
  { nome: 'Daniel Botelho',          usuario: 'danielbotelho',         email: 'contatoazevedomartiniano+danielbotelho@gmail.com',         senha: 'c1c2c3@!CAM_965201', role: 'membro' },
  { nome: 'Izabelle Gonçalves',      usuario: 'izabellegoncalves',     email: 'contatoazevedomartiniano+izabellegoncalves@gmail.com',     senha: 'c1c2c3@!CAM_741095', role: 'membro' },
  { nome: 'Maria Eduarda Rodrigues', usuario: 'mariaeduardarodrigues', email: 'contatoazevedomartiniano+mariaeduardarodrigues@gmail.com', senha: 'c1c2c3@!CAM_584627', role: 'membro' },
  { nome: 'Raimundo Guimarães',      usuario: 'raimundoguimaraes',     email: 'contatoazevedomartiniano+raimundoguimaraes@gmail.com',     senha: 'c1c2c3@!CAM_874305', role: 'membro' },
  { nome: 'Rebeca Moda',             usuario: 'rebecamoda',            email: 'contatoazevedomartiniano+rebecamoda@gmail.com',            senha: 'c1c2c3@!CAM_406921', role: 'membro' },
  { nome: 'Sâmela Lima',             usuario: 'samelalima',            email: 'contatoazevedomartiniano+samelalima@gmail.com',            senha: 'c1c2c3@!CAM_826174', role: 'membro' },
  { nome: 'Victor Level',            usuario: 'victorlevel',           email: 'contatoazevedomartiniano+victorlevel@gmail.com',           senha: 'c1c2c3@!CAM_984625', role: 'membro' },
  { nome: 'Master',                  usuario: 'master',                email: 'master',                                                  senha: '123123',             role: 'master'  }
];

function getUsuarios() {
  const raw = localStorage.getItem('cartorio_users');
  if (!raw) {
    localStorage.setItem('cartorio_users', JSON.stringify(USUARIOS_PADRAO));
    return USUARIOS_PADRAO;
  }
  return JSON.parse(raw);
}
function setUsuarios(lista) {
  localStorage.setItem('cartorio_users', JSON.stringify(lista));
}

function usuarioAdminRow(u) {
  const isMasterUser = u.role === 'master';
  const isAdminUser  = u.role === 'administrador';
  const iniciais = u.nome.split(' ').slice(0, 2).map(p => p[0].toUpperCase()).join('');
  let badge = '';
  if (isMasterUser)  badge = '<span class="badge-master" style="font-size:10px;padding:2px 8px">MASTER</span>';
  else if (isAdminUser) badge = '<span class="badge-admin" style="font-size:10px;padding:2px 8px">ADMIN</span>';
  else badge = '<span class="bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-2 py-0.5 rounded">membro</span>';

  return `<div class="admin-item">
    <div class="flex items-center gap-3 flex-1 min-w-0">
      <div class="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center shrink-0 font-label-md text-label-md text-on-surface font-bold">${iniciais}</div>
      <div class="min-w-0">
        <div class="flex items-center gap-2 mb-0.5">
          <p class="font-label-md text-label-md text-primary truncate">${u.nome}</p>
          ${badge}
        </div>
        <p class="font-label-sm text-label-sm text-on-surface-variant truncate">@${u.usuario} · ${u.email}</p>
      </div>
    </div>
    <div class="flex items-center gap-2 shrink-0">
      <button onclick="copiarAcesso('${u.usuario}')" class="p-1.5 text-on-surface-variant hover:text-secondary transition-colors" title="Copiar dados de acesso"><span class="material-symbols-outlined text-sm">content_copy</span></button>
      <button onclick="abrirModalUsuario('${u.usuario}')" class="p-1.5 text-on-surface-variant hover:text-primary transition-colors" title="Editar"><span class="material-symbols-outlined text-sm">edit</span></button>
      ${!isMasterUser ? `<button onclick="excluirUsuario('${u.usuario}')" class="p-1.5 text-on-surface-variant hover:text-error transition-colors" title="Excluir"><span class="material-symbols-outlined text-sm">delete</span></button>` : '<span class="w-8 inline-block"></span>'}
    </div>
  </div>`;
}

// --- SALVAR VISIBILIDADE ---
function salvarVisibilidade() {
  const data = getData();
  data.config.menus.home = document.getElementById('menu_home').checked;
  data.config.menus.tutoriais = document.getElementById('menu_tutoriais').checked;
  data.config.menus.materiais = document.getElementById('menu_materiais').checked;
  data.config.menus.suporte = document.getElementById('menu_suporte').checked;
  data.config.certificado = document.getElementById('cfg_certificado').checked;
  setData(data);
  reloadApp();
  navigateTo('admin');
  mostrarToast('Configurações salvas com sucesso!');
}

// --- MODAL GENÉRICO ---
function abrirModal(html) {
  document.getElementById('modal-content').innerHTML = html;
  document.getElementById('modal-overlay').classList.remove('hidden');
}
function fecharModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}
document.addEventListener('click', e => {
  if (e.target.id === 'modal-overlay') fecharModal();
});

// --- CRUD VÍDEOS ---
function abrirModalVideo(id) {
  const data = getData();
  const v = id ? data.tutoriais.find(t=>t.id===id) : null;
  abrirModal(`
    <h2 class="font-headline-md text-headline-md text-primary mb-6">${v?'Editar':'Adicionar'} Vídeo</h2>
    <form onsubmit="event.preventDefault();salvarVideo(${id||0})" class="space-y-4">
      <div><label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Título</label>
      <input id="v_titulo" value="${v?v.titulo:''}" class="w-full border border-outline-variant rounded px-4 py-3 font-body-md text-body-md focus:border-primary outline-none" required></div>
      <div><label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">URL do Vimeo (embed)</label>
      <input id="v_url" value="${v?v.url:''}" placeholder="https://player.vimeo.com/video/XXXXXX" class="w-full border border-outline-variant rounded px-4 py-3 font-body-md text-body-md focus:border-primary outline-none" required></div>
      <div><label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Concluído?</label>
      <select id="v_concluida" class="w-full border border-outline-variant rounded px-4 py-3 font-body-md text-body-md focus:border-primary outline-none">
        <option value="false" ${v&&!v.concluida?'selected':''}>Não</option><option value="true" ${v&&v.concluida?'selected':''}>Sim</option>
      </select></div>
      <div class="flex gap-3 pt-2">
        <button type="submit" class="flex-1 py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded hover:bg-inverse-surface transition-colors">Salvar</button>
        <button type="button" onclick="fecharModal()" class="flex-1 py-2.5 border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded hover:bg-surface-container-low transition-colors">Cancelar</button>
      </div>
    </form>`);
}

function salvarVideo(id) {
  const data = getData();
  const obj = {
    titulo: document.getElementById('v_titulo').value,
    url: document.getElementById('v_url').value,
    concluida: document.getElementById('v_concluida').value === 'true',
    material: ''
  };
  if (id) {
    const idx = data.tutoriais.findIndex(t=>t.id===id);
    if (idx>=0) { obj.id=id; data.tutoriais[idx]=obj; }
  } else {
    obj.id = Date.now();
    data.tutoriais.push(obj);
  }
  setData(data);
  fecharModal();
  reloadApp();
  navigateTo('admin');
  mostrarToast(id?'Vídeo atualizado!':'Vídeo adicionado!');
}

function excluirVideo(id) {
  if (!confirm('Excluir este vídeo?')) return;
  const data = getData();
  data.tutoriais = data.tutoriais.filter(t=>t.id!==id);
  setData(data);
  reloadApp();
  navigateTo('admin');
  mostrarToast('Vídeo excluído.');
}

// --- CRUD MATERIAIS ---
function abrirModalMaterial(id) {
  const data = getData();
  const m = id ? data.materiais.find(x=>x.id===id) : null;
  abrirModal(`
    <h2 class="font-headline-md text-headline-md text-primary mb-6">${m?'Editar':'Adicionar'} Material</h2>
    <form onsubmit="event.preventDefault();salvarMaterial(${id||0})" class="space-y-4">
      <div><label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Título</label>
      <input id="m_titulo" value="${m?m.titulo:''}" class="w-full border border-outline-variant rounded px-4 py-3 font-body-md text-body-md focus:border-primary outline-none" required></div>
      <div><label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Descrição</label>
      <textarea id="m_desc" class="w-full border border-outline-variant rounded px-4 py-3 font-body-md text-body-md focus:border-primary outline-none resize-y" rows="2">${m?m.desc:''}</textarea></div>
      <div class="grid grid-cols-3 gap-4">
        <div><label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Tipo</label>
        <select id="m_tipo" class="w-full border border-outline-variant rounded px-4 py-3 font-body-md text-body-md focus:border-primary outline-none">
          <option ${m&&m.tipo==='PDF'?'selected':''}>PDF</option><option ${m&&m.tipo==='XLSX'?'selected':''}>XLSX</option><option ${m&&m.tipo==='DOCX'?'selected':''}>DOCX</option><option ${m&&m.tipo==='ZIP'?'selected':''}>ZIP</option>
        </select></div>
        <div><label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Tamanho</label>
        <input id="m_tamanho" value="${m?m.tamanho:''}" placeholder="2.4 MB" class="w-full border border-outline-variant rounded px-4 py-3 font-body-md text-body-md focus:border-primary outline-none" required></div>
        <div><label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Ícone</label>
        <select id="m_icon" class="w-full border border-outline-variant rounded px-4 py-3 font-body-md text-body-md focus:border-primary outline-none">
          <option value="picture_as_pdf" ${m&&m.icon==='picture_as_pdf'?'selected':''}>PDF</option>
          <option value="table_chart" ${m&&m.icon==='table_chart'?'selected':''}>Planilha</option>
          <option value="description" ${m&&m.icon==='description'?'selected':''}>Documento</option>
          <option value="folder_zip" ${m&&m.icon==='folder_zip'?'selected':''}>ZIP</option>
        </select></div>
      </div>
      <div class="flex gap-3 pt-2">
        <button type="submit" class="flex-1 py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded hover:bg-inverse-surface transition-colors">Salvar</button>
        <button type="button" onclick="fecharModal()" class="flex-1 py-2.5 border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded hover:bg-surface-container-low transition-colors">Cancelar</button>
      </div>
    </form>`);
}

function salvarMaterial(id) {
  const data = getData();
  const obj = {
    titulo: document.getElementById('m_titulo').value,
    desc: document.getElementById('m_desc').value,
    tipo: document.getElementById('m_tipo').value,
    tamanho: document.getElementById('m_tamanho').value,
    icon: document.getElementById('m_icon').value
  };
  if (id) {
    const idx = data.materiais.findIndex(x=>x.id===id);
    if (idx>=0) { obj.id=id; data.materiais[idx]=obj; }
  } else {
    obj.id = Date.now();
    data.materiais.push(obj);
  }
  setData(data);
  fecharModal();
  reloadApp();
  navigateTo('admin');
  mostrarToast(id?'Material atualizado!':'Material adicionado!');
}

function excluirMaterial(id) {
  if (!confirm('Excluir este material?')) return;
  const data = getData();
  data.materiais = data.materiais.filter(x=>x.id!==id);
  setData(data);
  reloadApp();
  navigateTo('admin');
  mostrarToast('Material excluído.');
}

// --- CRUD USUÁRIOS ---
function abrirModalUsuario(usuarioId) {
  const usuarios = getUsuarios();
  const u = usuarioId ? usuarios.find(x => x.usuario === usuarioId) : null;
  const isMasterUser = u && u.role === 'master';
  abrirModal(`
    <h2 class="font-headline-md text-headline-md text-primary mb-6">${u ? 'Editar' : 'Adicionar'} Usuário</h2>
    <form onsubmit="event.preventDefault();salvarUsuario('${usuarioId || ''}')" class="space-y-4">
      <div class="grid grid-cols-2 gap-4">
        <div><label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Nome completo</label>
        <input id="u_nome" value="${u ? u.nome : ''}" class="w-full border border-outline-variant rounded px-4 py-3 font-body-md text-body-md focus:border-primary outline-none" required></div>
        <div><label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Usuário (login curto)</label>
        <input id="u_usuario" value="${u ? u.usuario : ''}" ${isMasterUser ? 'disabled' : ''} placeholder="ex: joao" class="w-full border border-outline-variant rounded px-4 py-3 font-body-md text-body-md focus:border-primary outline-none disabled:opacity-50" required></div>
      </div>
      <div><label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">E-mail (login completo)</label>
      <input id="u_email" value="${u ? u.email : ''}" type="${isMasterUser ? 'text' : 'email'}" placeholder="usuario@email.com" class="w-full border border-outline-variant rounded px-4 py-3 font-body-md text-body-md focus:border-primary outline-none" required></div>
      <div><label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Senha</label>
      <div class="relative">
        <input id="u_senha" value="${u ? u.senha : ''}" type="password" class="w-full border border-outline-variant rounded px-4 py-3 font-body-md text-body-md focus:border-primary outline-none pr-10" required>
        <button type="button" onclick="toggleSenhaModal()" class="absolute inset-y-0 right-0 pr-3 flex items-center text-outline hover:text-primary transition-colors">
          <span id="u_senha_icon" class="material-symbols-outlined text-xl">visibility_off</span>
        </button>
      </div></div>
      <div><label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-wider">Tipo de acesso</label>
      <select id="u_role" ${isMasterUser ? 'disabled' : ''} class="w-full border border-outline-variant rounded px-4 py-3 font-body-md text-body-md focus:border-primary outline-none disabled:opacity-50">
        <option value="membro"        ${!u || u.role === 'membro'        ? 'selected' : ''}>Membro</option>
        <option value="administrador" ${u && u.role === 'administrador'  ? 'selected' : ''}>Administrador</option>
        ${isMaster() ? `<option value="master" ${u && u.role === 'master' ? 'selected' : ''}>Master</option>` : ''}
      </select></div>
      <div class="flex gap-3 pt-2">
        <button type="submit" class="flex-1 py-2.5 bg-primary text-on-primary font-label-md text-label-md rounded hover:bg-inverse-surface transition-colors">Salvar</button>
        <button type="button" onclick="fecharModal()" class="flex-1 py-2.5 border border-outline-variant text-on-surface-variant font-label-md text-label-md rounded hover:bg-surface-container-low transition-colors">Cancelar</button>
      </div>
    </form>`);
}

function toggleSenhaModal() {
  const input = document.getElementById('u_senha');
  const icon = document.getElementById('u_senha_icon');
  if (input.type === 'password') { input.type = 'text'; icon.textContent = 'visibility'; }
  else { input.type = 'password'; icon.textContent = 'visibility_off'; }
}

function salvarUsuario(usuarioIdOriginal) {
  const usuarios = getUsuarios();
  const original = usuarioIdOriginal ? usuarios.find(u => u.usuario === usuarioIdOriginal) : null;
  const isMasterUser = original && original.role === 'master';

  const nome    = document.getElementById('u_nome').value.trim();
  const email   = document.getElementById('u_email').value.trim();
  const senha   = document.getElementById('u_senha').value;
  const usuario = isMasterUser ? original.usuario : document.getElementById('u_usuario').value.trim().toLowerCase();
  const role    = isMasterUser ? 'master' : document.getElementById('u_role').value;

  const novoObj = { nome, usuario, email, senha, role };

  if (!usuarioIdOriginal) {
    if (usuarios.some(u => u.usuario === usuario)) { alert('Esse nome de usuário já existe.'); return; }
    usuarios.push(novoObj);
  } else {
    const idx = usuarios.findIndex(u => u.usuario === usuarioIdOriginal);
    if (idx < 0) return;
    if (usuario !== usuarioIdOriginal && usuarios.some(u => u.usuario === usuario)) { alert('Esse nome de usuário já existe.'); return; }
    usuarios[idx] = novoObj;
  }

  setUsuarios(usuarios);
  salvarUsuarioFirebase(novoObj, usuarioIdOriginal || null);
  fecharModal();
  reloadApp();
  navigateTo('admin');
  mostrarToast(usuarioIdOriginal ? 'Usuário atualizado!' : 'Usuário adicionado!');
}

function copiarAcesso(usuarioId) {
  const u = getUsuarios().find(x => x.usuario === usuarioId);
  if (!u) return;
  const texto = `Usuário: ${u.nome}\nSite: SistemIA.com.br/AzevedoMartiniano\nLogin: ${u.email}\nSenha: ${u.senha}`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto)
      .then(() => mostrarToast('Dados de acesso copiados!'))
      .catch(() => _copiarFallback(texto));
  } else {
    _copiarFallback(texto);
  }
}

function _copiarFallback(texto) {
  const el = document.createElement('textarea');
  el.value = texto;
  el.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none';
  document.body.appendChild(el);
  el.focus();
  el.select();
  try {
    document.execCommand('copy');
    mostrarToast('Dados de acesso copiados!');
  } catch (e) {
    mostrarToast('Erro ao copiar. Tente manualmente.');
  }
  document.body.removeChild(el);
}

function excluirUsuario(usuarioId) {
  const usuarios = getUsuarios();
  const u = usuarios.find(x => x.usuario === usuarioId);
  if (!u) return;
  if (u.role === 'master') { alert('O usuário master não pode ser excluído.'); return; }
  if (!confirm(`Excluir o usuário "${u.nome}"? Esta ação não pode ser desfeita.`)) return;
  setUsuarios(usuarios.filter(x => x.usuario !== usuarioId));
  excluirUsuarioFirebase(usuarioId);
  reloadApp();
  navigateTo('admin');
  mostrarToast('Usuário excluído.');
}

async function atualizarListaUsuarios() {
  await inicializarUsuariosFirebase(USUARIOS_PADRAO);
  const lista = await carregarUsuariosFirebase();
  if (!lista || lista.length === 0) return;
  localStorage.setItem('cartorio_users', JSON.stringify(lista));
  const container = document.getElementById('admin-usuarios-list');
  if (container) container.innerHTML = lista.map(u => usuarioAdminRow(u)).join('');
}

// --- RELATÓRIO DE VISUALIZAÇÕES ---
async function atualizarRelatorio() {
  const container = document.getElementById('relatorio-container');
  if (!container) return;

  if (!firebaseAtivo()) {
    container.innerHTML = `
      <div class="text-center py-10">
        <span class="material-symbols-outlined text-4xl text-outline block mb-3">cloud_off</span>
        <p class="font-label-md text-on-surface-variant mb-1">Firebase não configurado.</p>
        <p class="font-body-md text-on-surface-variant">Edite o arquivo <code class="bg-surface-container px-1 rounded">firebase-config.js</code> com as credenciais do seu projeto.</p>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div class="flex items-center justify-center gap-2 py-10 text-on-surface-variant">
      <span class="material-symbols-outlined text-secondary" style="animation:spin 1s linear infinite">progress_activity</span>
      <span class="font-body-md">Carregando dados do Firebase...</span>
    </div>`;

  const data = getData();
  const videos = data.tutoriais;
  const relatorio = await carregarRelatorio();

  if (!relatorio) {
    container.innerHTML = `
      <div class="text-center py-10">
        <span class="material-symbols-outlined text-4xl text-error block mb-3">error</span>
        <p class="font-body-md text-on-surface-variant">Erro ao carregar dados. Verifique as configurações do Firebase.</p>
      </div>`;
    return;
  }

  if (relatorio.length === 0) {
    container.innerHTML = `
      <div class="text-center py-10">
        <span class="material-symbols-outlined text-4xl text-outline block mb-3">person_off</span>
        <p class="font-body-md text-on-surface-variant">Nenhum usuário registrado ainda.</p>
        <p class="font-label-sm text-on-surface-variant mt-1">Os usuários aparecerão aqui após realizarem o primeiro login.</p>
      </div>`;
    return;
  }

  const cards = relatorio.map((u, idx) => {
    const assistidos = videos.filter(v => {
      const d = u.videos[String(v.id)];
      return d && d.count > 0;
    }).length;
    const total = videos.length;
    const loginStr = u.ultimoLogin ? formatarDataRelatorio(u.ultimoLogin) : 'Nunca acessou';
    const iniciais = u.nome.split(' ').slice(0,2).map(p=>p[0].toUpperCase()).join('');

    const corProgresso = assistidos === 0 ? 'text-error' : assistidos === total ? 'text-secondary' : 'text-on-surface-variant';
    const bgAvatar = assistidos === 0 ? 'bg-error-container text-on-error-container' : assistidos === total ? 'bg-secondary/10 text-secondary' : 'bg-surface-container text-on-surface';

    const linhasVideos = videos.map((v, vi) => {
      const vData = u.videos[String(v.id)];
      const count = vData ? (vData.count || 0) : 0;
      const assistiu = count > 0;
      return `<div class="flex items-center justify-between px-4 py-2 ${vi < videos.length-1 ? 'border-b border-outline-variant/30' : ''}">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-on-surface-variant" style="font-size:16px;${assistiu ? "font-variation-settings:'FILL' 1;" : ''}color:${assistiu ? '' : '#74777e'}">
            ${assistiu ? 'check_circle' : 'radio_button_unchecked'}
          </span>
          <span class="font-label-md text-label-md ${assistiu ? 'text-on-surface' : 'text-outline'}">
            Aula ${vi+1} — ${v.titulo}
          </span>
        </div>
        <span class="font-label-sm text-label-sm shrink-0 ml-4 ${assistiu ? 'text-secondary font-bold' : 'text-outline'}">
          ${assistiu ? count+'x' : 'Não assistiu'}
        </span>
      </div>`;
    }).join('');

    return `
    <div class="border border-outline-variant rounded overflow-hidden">
      <div onclick="toggleRelatorio(${idx})" class="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-surface-container-low transition-colors select-none">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-full ${bgAvatar} flex items-center justify-center font-label-md text-label-md font-bold shrink-0">${iniciais}</div>
          <div>
            <p class="font-label-md text-label-md text-primary">${u.nome}</p>
            <p class="font-label-sm text-label-sm text-on-surface-variant">Último acesso: ${loginStr}</p>
          </div>
        </div>
        <div class="flex items-center gap-3 shrink-0 ml-4">
          <span class="font-label-sm text-label-sm ${corProgresso}">${assistidos} de ${total} aulas</span>
          <span id="rel-icon-${idx}" class="material-symbols-outlined text-outline transition-transform duration-200">expand_more</span>
        </div>
      </div>
      <div id="rel-body-${idx}" class="hidden bg-surface-container-lowest border-t border-outline-variant/50">
        ${linhasVideos}
      </div>
    </div>`;
  }).join('');

  container.innerHTML = `
    <div class="space-y-2">${cards}</div>
    <p class="font-label-sm text-label-sm text-on-surface-variant mt-4 text-right">
      Clique no usuário para ver o detalhe por aula.
    </p>`;
}

function toggleRelatorio(idx) {
  const body = document.getElementById('rel-body-' + idx);
  const icon = document.getElementById('rel-icon-' + idx);
  if (!body) return;
  const aberto = !body.classList.contains('hidden');
  // Fecha todos
  document.querySelectorAll('[id^="rel-body-"]').forEach(el => el.classList.add('hidden'));
  document.querySelectorAll('[id^="rel-icon-"]').forEach(el => { el.textContent = 'expand_more'; el.style.transform = ''; });
  // Abre o clicado (se estava fechado)
  if (!aberto) {
    body.classList.remove('hidden');
    icon.textContent = 'expand_less';
  }
}

function formatarDataRelatorio(timestamp) {
  try {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  } catch (e) { return '—'; }
}

// --- TOAST ---
function mostrarToast(msg) {
  const existing = document.getElementById('toast-msg');
  if (existing) existing.remove();
  const div = document.createElement('div');
  div.id = 'toast-msg';
  div.className = 'fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-lg font-label-md text-label-md shadow-lg z-[200] flex items-center gap-2 fade-in';
  div.innerHTML = `<span class="material-symbols-outlined text-sm text-secondary">check_circle</span>${msg}`;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
}
