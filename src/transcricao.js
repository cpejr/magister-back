const substituicoes = require("./data/substituicoes.js")
function transcreverTexto(text) {
  // Ordena do maior para o menor comprimento da palavra original
  const substituicoesOrdenadas = substituicoes.slice().sort(([a], [b]) => b.length - a.length); //ordena comparando o tamanho das strings a e b

  let textoTranscrito = text;
// realiza substituicoes 
  substituicoesOrdenadas.forEach(([palavra_original, palavra_transcrita]) => { 

    const padraoBusca = new RegExp(palavra_original, 'gi'); //Cria uma expressão regular para encontrar todas as ocorrências da palavra original.
    textoTranscrito = textoTranscrito.replace(padraoBusca, palavra_transcrita); //Substitui todas as ocorrências da palavra original pelo texto de substituição
  });

  return textoTranscrito;
}

module.exports = { transcreverTexto };
