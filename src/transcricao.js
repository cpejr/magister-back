const substituicoes = require("./Data/substituicoes");

function removerAcentos(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function transcreverTexto(text) {
  const ALMA = "Alma";
  const CONSCIENCIA = "Consciência";
  const TERRA = "Terra";
  const TOKEN_ALMA_DA_TERRA = "Alma";

  const regras_filtradas = substituicoes.filter(
    ([palavra_original, palavra_transcrita]) => {
      return !(palavra_original === ALMA && palavra_transcrita === CONSCIENCIA);
    }
  );

  const substituicoesOrdenadas = regras_filtradas
    .slice()
    .sort(([a], [b]) => b.length - a.length);

  let textoTranscrito = text;

  let padraoBuscaAlma = new RegExp(ALMA, "gi");
  textoTranscrito = textoTranscrito.replace(padraoBuscaAlma, CONSCIENCIA);

  substituicoesOrdenadas.forEach(([palavra_original, palavra_transcrita]) => {
    let valor_substituido = palavra_transcrita;

    if (palavra_original === TERRA && palavra_transcrita === ALMA) {
      valor_substituido = TOKEN_ALMA_DA_TERRA;
    }

    let padraoBuscaOriginal = new RegExp(palavra_original, "gi");
    textoTranscrito = textoTranscrito.replace(
      padraoBuscaOriginal,
      valor_substituido
    );

    const palavraSemAcento = removerAcentos(palavra_original);
    if (palavraSemAcento !== palavra_original) {
      let padraoBuscaSemAcento = new RegExp(palavraSemAcento, "gi");
      textoTranscrito = textoTranscrito.replace(
        padraoBuscaSemAcento,
        valor_substituido
      );
    }
  });

  let padraoBuscaTokenCompleto = new RegExp(TOKEN_ALMA_DA_TERRA, "g");
  textoTranscrito = textoTranscrito.replace(padraoBuscaTokenCompleto, ALMA);

  return textoTranscrito;
}

module.exports = { transcreverTexto, removerAcentos };
