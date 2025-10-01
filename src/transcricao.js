const substituicoes = require("./Data/substituicoes.js");
function transcreverTexto(text) {
  const substituicoesOrdenadas = substituicoes
    .slice()
    .sort(([a], [b]) => b.length - a.length);
  let textoTranscrito = text;
  substituicoesOrdenadas.forEach(([palavra_original, palavra_transcrita]) => {
    const padraoBusca = new RegExp(palavra_original, "gi");
    textoTranscrito = textoTranscrito.replace(padraoBusca, palavra_transcrita);
  });
  return textoTranscrito;
}

module.exports = { transcreverTexto };
