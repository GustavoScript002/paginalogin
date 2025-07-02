let cadastros = [];
let indiceAtual = -1;
let editando = false;

function obterValores() {
  return {
    nome: document.querySelectorAll("input")[0].value.trim(),
    sobrenome: document.querySelectorAll("input")[1].value.trim(),
    endereco: document.querySelectorAll("input")[2].value.trim(),
    telefone: document.querySelectorAll("input")[3].value.trim()
  };
}

function preencherCampos(dados) {
  document.querySelectorAll("input")[0].value = dados.nome;
  document.querySelectorAll("input")[1].value = dados.sobrenome;
  document.querySelectorAll("input")[2].value = dados.endereco;
  document.querySelectorAll("input")[3].value = dados.telefone;
}

function limparCampos() {
  document.querySelectorAll("input").forEach(input => input.value = "");
}

function incluir() {
  limparCampos();
  editando = false;
}

function editar() {
  if (indiceAtual >= 0 && cadastros.length > 0) {
    editando = true;
  } else {
    alert("Nenhum cadastro selecionado.");
  }
}

function salvar() {
  const dados = obterValores();
  if (!dados.nome || !dados.sobrenome || !dados.endereco || !dados.telefone) {
    alert("Preencha todos os campos.");
    return;
  }

  if (editando && indiceAtual >= 0) {
    cadastros[indiceAtual] = dados;
  } else {
    cadastros.push(dados);
    indiceAtual = cadastros.length - 1;
  }

  alert("Cadastro salvo com sucesso.");
  limparCampos(); //acrescentei
}

function cancelar() {
  if (cadastros[indiceAtual]) {
    preencherCampos(cadastros[indiceAtual]);
  } else {
    limparCampos();
  }
}

function excluir() {
  if (indiceAtual >= 0) {
    cadastros.splice(indiceAtual, 1);
    if (cadastros.length === 0) {
      limparCampos();
      indiceAtual = -1;
    } else {
      indiceAtual = Math.max(0, indiceAtual - 1);
      preencherCampos(cadastros[indiceAtual]);
    }
  } else {
    alert("Nenhum cadastro selecionado.");
  }
}

function primeiro() {
  if (cadastros.length > 0) {
    indiceAtual = 0;
    preencherCampos(cadastros[indiceAtual]);
  }
}

function anterior() {
  if (indiceAtual > 0) {
    indiceAtual--;
    preencherCampos(cadastros[indiceAtual]);
  }
}

function proximo() {
  if (indiceAtual < cadastros.length - 1) {
    indiceAtual++;
    preencherCampos(cadastros[indiceAtual]);
  }
}

function ultimo() {
  if (cadastros.length > 0) {
    indiceAtual = cadastros.length - 1;
    preencherCampos(cadastros[indiceAtual]);
  }
}


//acrescentei
document.addEventListener("DOMContentLoaded", function() {
  const navBtns = document.querySelectorAll(".navigation button");
  navBtns[0].addEventListener("click", primeiro);
  navBtns[1].addEventListener("click", anterior);
  navBtns[2].addEventListener("click", proximo);
  navBtns[3].addEventListener("click", ultimo);

  document.querySelector(".incluir").addEventListener("click", incluir);
  document.querySelector(".editar").addEventListener("click", editar);
  document.querySelector(".salvar").addEventListener("click", salvar);
  document.querySelector(".cancelar").addEventListener("click", cancelar);
  document.querySelector(".excluir").addEventListener("click", excluir);
});