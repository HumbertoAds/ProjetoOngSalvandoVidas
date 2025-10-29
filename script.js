// ===========================
// SPA BÁSICA + INTERATIVIDADE
// ===========================

// Seleciona os principais elementos
const navLinks = document.querySelectorAll(".navbar a");
const main = document.querySelector("main");

// Função para carregar páginas dinamicamente (SPA simples)
async function carregarPagina(pagina) {
  const response = await fetch(pagina);
  const html = await response.text();
  main.innerHTML = new DOMParser().parseFromString(html, "text/html").body.innerHTML;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Evento de navegação sem recarregar a página
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const pagina = link.getAttribute("href");

    // Atualiza destaque do menu
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    carregarPagina(pagina);
  });
});

// ===========================
// FORMULÁRIO: VALIDAÇÃO E FEEDBACK
// ===========================

document.addEventListener("submit", function (e) {
  if (e.target.tagName === "FORM") {
    e.preventDefault();

    const form = e.target;
    let valido = true;
    const campos = form.querySelectorAll("input[required]");

    campos.forEach(campo => {
      const valor = campo.value.trim();
      if (!valor) {
        valido = false;
        campo.classList.add("erro");
      } else {
        campo.classList.remove("erro");
      }
    });

    if (!valido) {
      mostrarAlerta("⚠️ Preencha todos os campos obrigatórios corretamente!", "erro");
      return;
    }

    // Verificação básica de email
    const email = form.querySelector("input[type='email']");
    if (email && !email.value.includes("@")) {
      mostrarAlerta("❌ Email inválido. Verifique o formato.", "erro");
      return;
    }

    // Se tudo estiver certo:
    salvarCadastro(form);
    mostrarAlerta("✅ Cadastro realizado com sucesso!", "sucesso");
    form.reset();
  }
});

// ===========================
// SISTEMA DE FEEDBACK (TOASTS)
// ===========================

function mostrarAlerta(mensagem, tipo = "info") {
  const alerta = document.createElement("div");
  alerta.className = `toast ${tipo}`;
  alerta.textContent = mensagem;
  document.body.appendChild(alerta);

  setTimeout(() => {
    alerta.classList.add("visivel");
  }, 50);

  setTimeout(() => {
    alerta.classList.remove("visivel");
    setTimeout(() => alerta.remove(), 400);
  }, 4000);
}

// ===========================
// SALVANDO DADOS NO LOCALSTORAGE
// ===========================

function salvarCadastro(form) {
  const dados = {};
  new FormData(form).forEach((valor, chave) => (dados[chave] = valor));

  const registros = JSON.parse(localStorage.getItem("cadastros")) || [];
  registros.push(dados);
  localStorage.setItem("cadastros", JSON.stringify(registros));
}

// ===========================
// TEMPLATE EXEMPLO: CARDS DINÂMICOS
// ===========================

function gerarCardProjeto(titulo, descricao, imagem) {
  const card = document.createElement("article");
  card.className = "projeto";
  card.innerHTML = `
    <img src="${imagem}" alt="${titulo}">
    <h3>${titulo}</h3>
    <p>${descricao}</p>
  `;
  return card;
}

// Exemplo: gerar cards extras via JavaScript
document.addEventListener("DOMContentLoaded", () => {
  const secaoProjetos = document.querySelector(".projetos");
  if (secaoProjetos) {
    const novo = gerarCardProjeto(
      "Novo Projeto Ambiental",
      "Ações sustentáveis para preservar o meio ambiente.",
      "imagens/natureza.jpg"
    );

    // MODO ALTO CONTRASTE
if(localStorage.getItem("hc") === "1"){
  document.documentElement.classList.add("high-contrast");
}

document.getElementById("contrast-toggle")?.addEventListener("click", function(){
  document.documentElement.classList.toggle("high-contrast");
  const ativo = document.documentElement.classList.contains("high-contrast");
  localStorage.setItem("hc", ativo ? "1" : "0");
  this.setAttribute("aria-pressed", ativo);
// VALIDAÇÃO ACESSÍVEL
const campoEmail = document.getElementById("email");
const msgErroEmail = document.getElementById("email-erro");

campoEmail?.addEventListener("blur", function(){
  if(!this.value.includes("@")){
    msgErroEmail.hidden = false;
    this.setAttribute("aria-invalid", "true");
  } else {
    msgErroEmail.hidden = true;
    this.removeAttribute("aria-invalid");
  }
});


});

    secaoProjetos.appendChild(novo);
  }
});

