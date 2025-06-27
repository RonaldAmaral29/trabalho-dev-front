document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formContato");

  const campos = {
    nome: {
      input: document.getElementById("nome"),
      erro: document.getElementById("erro-nome"),
      validar: (val) => val.trim() !== "",
      mensagem: "Informe seu nome.",
    },
    email: {
      input: document.getElementById("email"),
      erro: document.getElementById("erro-email"),
      validar: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      mensagem: "Informe um e-mail válido.",
    },
    assunto: {
      input: document.getElementById("assunto"),
      erro: document.getElementById("erro-assunto"),
      validar: (val) => val.trim() !== "",
      mensagem: "Informe um assunto.",
    },
    mensagem: {
      input: document.getElementById("mensagem"),
      erro: document.getElementById("erro-mensagem"),
      validar: (val) => val.trim().length >= 20,
      mensagem: "A mensagem deve ter no mínimo 20 caracteres.",
    },
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valido = true;

    for (const campo of Object.values(campos)) {
      const valor = campo.input.value;
      if (!campo.validar(valor)) {
        campo.input.classList.add("erro");
        campo.input.classList.remove("ok");
        campo.erro.textContent = campo.mensagem;
        valido = false;
      } else {
        campo.input.classList.remove("erro");
        campo.input.classList.add("ok");
        campo.erro.textContent = "";
      }
    }

    const feedback = document.getElementById("feedback");
    if (valido) {
      feedback.textContent = "Mensagem enviada com sucesso!";
      feedback.style.color = "green";
      form.reset();
      document.querySelectorAll(".ok").forEach((el) => el.classList.remove("ok"));
    } else {
      feedback.textContent = "Corrija os campos";
      feedback.style.color = "red";
    }

    feedback.scrollIntoView({ behavior: "smooth" });
  });

  // Limpa erros ao digitar
  for (const campo of Object.values(campos)) {
    campo.input.addEventListener("input", () => {
      campo.input.classList.remove("erro", "ok");
      campo.erro.textContent = "";
      document.getElementById("feedback").textContent = "";
    });
  }
});
