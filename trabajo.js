
const usuarioCorreto = "Aluno";
const senhaCorreta = "1234";

const academiaInfo = {
  nome: "Academia GYMBROS",
  planos: [
    { nome: "Plano Básico", preco: "R$ 99,90", beneficios: ["Acesso das 6h às 22h", "Aulas de musculação e aeróbico", "Acesso aos aparelhos de cardio"] },
    { nome: "Plano Premium", preco: "R$ 149,90", beneficios: ["Acesso 24 horas", "Todas as aulas incluídas", "Piscina e sauna", "1 avaliação física mensal"] },
    { nome: "Plano VIP", preco: "R$ 199,90", beneficios: ["Acesso 24 horas e estacionamento gratuito", "Personal trainer 2x por semana", "Áreas VIP e spa", "Avaliação física e nutricional mensal"] },
  ],
  
};


function mostrarModal(idModal) {
  const modal = document.getElementById(idModal);
  modal.style.display = "block";
  modal.classList.add("fade-in");
}

function esconderModal(idModal) {
  const modal = document.getElementById(idModal);
  modal.classList.remove("fade-in");
  modal.style.display = "none";
}

function exibirMensagem(tipo, mensagem) {
  alert(`${tipo}: ${mensagem}`);
}


function validarLogin() {
  const usuario = document.getElementById("Usuario").value;
  const senha = document.getElementById("Senha").value;

  if (usuario === usuarioCorreto && senha === senhaCorreta) {
    exibirMensagem("Sucesso", "Login bem-sucedido!");
    localStorage.setItem("isLoggedIn", "true");
    document.getElementById("btnLogout").style.display = "block";
  } else {
    exibirMensagem("Erro", "Usuário ou senha incorretos.");
  }
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  document.getElementById("btnLogout").style.display = "none";
  exibirMensagem("Logout", "Você foi deslogado com sucesso.");
  window.location.reload();
}

function enviarRecuperacaoSenha() {
  const email = document.getElementById("emailRecuperacao").value;
  if (email) {
    exibirMensagem("Sucesso", `Um link de recuperação foi enviado para ${email}.`);
    esconderModal("recuperarSenhaModal");
  } else {
    exibirMensagem("Erro", "Por favor, insira um e-mail válido.");
  }
}

function renderizarPlanos() {
  const planosContainer = document.getElementById("planos");
  planosContainer.innerHTML = "";
  academiaInfo.planos.forEach(plano => {
    const planoElement = document.createElement("div");
    planoElement.classList.add("plano");

    planoElement.innerHTML = `
      <h3>${plano.nome}</h3>
      <p>Preço: ${plano.preco}</p>
      <ul>${plano.beneficios.map(beneficio => `<li>${beneficio}</li>`).join("")}</ul>
    `;

    planosContainer.appendChild(planoElement);
  });
}

function renderizarInfraestrutura() {
  const infraestruturaContainer = document.getElementById("infraestrutura");
  infraestruturaContainer.innerHTML = academiaInfo.infraestrutura.map(item => `<li>${item}</li>`).join("");
}

function renderizarSobre() {
  document.getElementById("sobre").textContent = academiaInfo.sobre;
}

function renderizarDepoimentos() {
  let index = 0;
  const depoimentosContainer = document.getElementById("depoimentos");
  depoimentosContainer.textContent = depoimentos[index];

  setInterval(() => {
    index = (index + 1) % depoimentos.length;
    depoimentosContainer.textContent = depoimentos[index];
  }, 3000);
}

function renderizarDicas() {
  let index = 0;
  const dicasContainer = document.getElementById("dicas");
  dicasContainer.textContent = dicas[index];

  setInterval(() => {
    index = (index + 1) % dicas.length;
    dicasContainer.textContent = dicas[index];
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarPlanos();
  renderizarInfraestrutura();
  renderizarSobre();
  renderizarDepoimentos();
  renderizarDicas();

  if (localStorage.getItem("isLoggedIn") === "true") {
    document.getElementById("btnLogout").style.display = "block";
  }
});

document.getElementById("esqueceuSenha").addEventListener("click", (event) => {
  event.preventDefault();
  mostrarModal("recuperarSenhaModal");
});

document.getElementById("fecharModal").addEventListener("click", () => {
  esconderModal("recuperarSenhaModal");
});

document.getElementById("enviarEmail").addEventListener("click", enviarRecuperacaoSenha);
document.getElementById("btnLogin").addEventListener("click", validarLogin);
document.getElementById("btnLogout").addEventListener("click", logout);
