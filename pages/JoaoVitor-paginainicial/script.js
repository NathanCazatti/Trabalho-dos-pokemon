const btnSim = document.getElementById('btnSim');
const btnNao = document.getElementById('btnNao');
const conteudo = document.getElementById('conteudo');

btniniciarJornada.addEventListener('click', async () => {
  window.location.href = "../Davi/index.html";
});

btnNao.addEventListener('click', () => {
  window.location.href = "../page2/index.html";
});
