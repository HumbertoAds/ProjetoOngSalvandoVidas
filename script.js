// Máscaras simples de input
document.addEventListener("input", function (e) {
  if (e.target.id === "cpf") {
    e.target.value = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  if (e.target.id === "telefone") {
    e.target.value = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})$/, "$1-$2");
  }

  if (e.target.id === "cep") {
    e.target.value = e.target.value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d{3})$/, "$1-$2");
  }
});

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navbar');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

