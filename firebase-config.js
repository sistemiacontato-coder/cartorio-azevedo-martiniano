// =============================================
// firebase-config.js — Rastreamento de Visualizações
// =============================================
//
// COMO CONFIGURAR:
// 1. Acesse https://console.firebase.google.com
// 2. Crie um novo projeto (ex: "cartorio-membros")
// 3. Clique em "Adicionar app" → ícone Web (</>)
// 4. Copie o objeto firebaseConfig e cole abaixo
// 5. No menu do Firebase, vá em Firestore Database → Criar banco de dados
// 6. Escolha "Modo de teste" (funciona por 30 dias, suficiente para começar)
//
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBpXeFl9q7uG1vyxYiRJLe50eOWqarsEIg",
  authDomain: "azevedo-martiniano.firebaseapp.com",
  projectId: "azevedo-martiniano",
  storageBucket: "azevedo-martiniano.firebasestorage.app",
  messagingSenderId: "1081199750851",
  appId: "1:1081199750851:web:4d7a747a04401d0733bc76"
};

let _db = null;
let _authReady = null;

function firebaseAtivo() {
  return FIREBASE_CONFIG.apiKey !== 'COLE_AQUI';
}

function initFirebase() {
  if (!firebaseAtivo()) return;
  try {
    if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
    _db = firebase.firestore();
    _authReady = firebase.auth().signInAnonymously()
      .catch(e => console.warn('[Firebase] Auth anônima falhou:', e.message));
  } catch (e) {
    console.warn('[Firebase] Erro ao inicializar:', e.message);
  }
}

// Registra o login do usuário (chamado em index.html ao fazer login)
async function registrarLogin(email, nome) {
  if (!_db || !email) return;
  try {
    if (_authReady) await _authReady;
    await _db.collection('usuarios').doc(email).set({
      email,
      nome: nome || email,
      ultimoLogin: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  } catch (e) {}
}

// Registra uma visualização (chamado em app.js quando o usuário abre uma aula)
async function registrarVisualizacao(email, videoId, titulo) {
  if (!_db || !email) return;
  try {
    if (_authReady) await _authReady;
    const ref = _db
      .collection('visualizacoes')
      .doc(email)
      .collection('videos')
      .doc(String(videoId));
    const doc = await ref.get();
    if (doc.exists) {
      await ref.update({
        count: (doc.data().count || 0) + 1,
        ultimaVez: firebase.firestore.FieldValue.serverTimestamp()
      });
    } else {
      await ref.set({
        videoId: String(videoId),
        titulo,
        count: 1,
        ultimaVez: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
  } catch (e) {
    console.warn('[Firebase] Erro ao registrar visualização:', e.message);
  }
}

// ---- GESTÃO DE USUÁRIOS NO FIREBASE ----

async function carregarUsuariosFirebase() {
  if (!_db) return null;
  try {
    if (_authReady) await _authReady;
    const snap = await _db.collection('usuarios_sistema').orderBy('nome').get();
    if (snap.empty) return null;
    return snap.docs.map(d => d.data());
  } catch (e) {
    console.warn('[Firebase] Erro ao carregar usuários:', e.message);
    return null;
  }
}

async function inicializarUsuariosFirebase(lista) {
  if (!_db) return;
  try {
    if (_authReady) await _authReady;
    const snap = await _db.collection('usuarios_sistema').limit(1).get();
    if (!snap.empty) return; // Já inicializado
    const batch = _db.batch();
    lista.forEach(u => {
      batch.set(_db.collection('usuarios_sistema').doc(u.usuario), u);
    });
    await batch.commit();
    console.log('[Firebase] Usuários inicializados.');
  } catch (e) {
    console.warn('[Firebase] Erro ao inicializar usuários:', e.message);
  }
}

async function salvarUsuarioFirebase(u, idOriginal) {
  if (!_db) return;
  try {
    if (_authReady) await _authReady;
    if (idOriginal && idOriginal !== u.usuario) {
      await _db.collection('usuarios_sistema').doc(idOriginal).delete();
    }
    await _db.collection('usuarios_sistema').doc(u.usuario).set(u);
  } catch (e) {
    console.warn('[Firebase] Erro ao salvar usuário:', e.message);
  }
}

async function excluirUsuarioFirebase(usuarioId) {
  if (!_db) return;
  try {
    if (_authReady) await _authReady;
    await _db.collection('usuarios_sistema').doc(usuarioId).delete();
  } catch (e) {
    console.warn('[Firebase] Erro ao excluir usuário:', e.message);
  }
}

// Carrega todos os dados para o relatório do master
async function carregarRelatorio() {
  if (!_db) return null;
  try {
    if (_authReady) await _authReady;
    const usuariosSnap = await _db.collection('usuarios').get();
    const resultado = [];
    for (const uDoc of usuariosSnap.docs) {
      const usuario = uDoc.data();
      const videosSnap = await _db
        .collection('visualizacoes')
        .doc(uDoc.id)
        .collection('videos')
        .get();
      const videoMap = {};
      videosSnap.docs.forEach(d => {
        videoMap[d.data().videoId] = d.data();
      });
      resultado.push({
        email: usuario.email,
        nome: usuario.nome || usuario.email,
        ultimoLogin: usuario.ultimoLogin,
        videos: videoMap
      });
    }
    return resultado;
  } catch (e) {
    console.warn('[Firebase] Erro ao carregar relatório:', e.message);
    return null;
  }
}
