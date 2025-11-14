const substituicoes = require("./Data/substituicoes");

function removerAcentos(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function transcreverTexto(text) {
  const ALMA = "Alma";
  const CONSCIENCIA = "Consciência";
  const TERRA = "Terra";
  const TOKEN_ALMA_DA_TERRA = "Alma";

  let textoNormalizado = removerAcentos(text);
  let textoTranscrito = textoNormalizado;

  const regras_filtradas = substituicoes.filter(
    ([palavra_original, palavra_transcrita]) => {
      return !(palavra_original === ALMA && palavra_transcrita === CONSCIENCIA);
    }
  );

  const substituicoesOrdenadas = regras_filtradas
    .slice()
    .sort(([a], [b]) => b.length - a.length);

  const CONSCIENCIA_SEM_ACENTO = removerAcentos(CONSCIENCIA);
  let padraoBuscaAlma = new RegExp(`\\b${ALMA}\\b`, "gi");

  textoTranscrito = textoTranscrito.replace(padraoBuscaAlma, CONSCIENCIA);

  substituicoesOrdenadas.forEach(([palavra_original, palavra_transcrita]) => {
    let valor_substituido = palavra_transcrita;

    if (palavra_original === TERRA && palavra_transcrita === ALMA) {
      valor_substituido = TOKEN_ALMA_DA_TERRA;
    }

    const palavraSemAcentoOriginal = removerAcentos(palavra_original);

    let padraoBusca = new RegExp(`\\b${palavraSemAcentoOriginal}\\b`, "gi");

    textoTranscrito = textoTranscrito.replace(padraoBusca, valor_substituido);
  });

  let padraoBuscaTokenCompleto = new RegExp(
    `\\b${TOKEN_ALMA_DA_TERRA}\\b`,
    "g"
  );
  textoTranscrito = textoTranscrito.replace(padraoBuscaTokenCompleto, ALMA);

  return textoTranscrito;
}

module.exports = { transcreverTexto, removerAcentos };
