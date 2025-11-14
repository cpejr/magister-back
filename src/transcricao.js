const substituicoes = require("./Data/substituicoes");

function removerAcentos(text) {
  // NFD (Normalização Decomposta) separa o caractere base do acento.
  // Depois, remove todos os caracteres de acentuação (combining marks).
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function transcreverTexto(text) {
  const ALMA = "Alma";
  const CONSCIENCIA = "Consciência";
  const TERRA = "Terra";
  const TOKEN_ALMA_DA_TERRA = "Alma";

  // 1. Normaliza o texto de entrada: A PARTIR DAQUI, NENHUM ACENTO EXISTE NO TEXTO.
  let textoNormalizado = removerAcentos(text);
  let textoTranscrito = textoNormalizado;

  // 2. Filtragem e Ordenação (mantida do código original)
  const regras_filtradas = substituicoes.filter(
    ([palavra_original, palavra_transcrita]) => {
      return !(palavra_original === ALMA && palavra_transcrita === CONSCIENCIA);
    }
  );

  const substituicoesOrdenadas = regras_filtradas
    .slice()
    .sort(([a], [b]) => b.length - a.length);

  // 3. Aplica a substituição inicial de ALMA -> CONSCIENCIA
  // Deve-se usar a versão sem acento de CONSCIENCIA para a busca, mas o valor de substituição é o correto.
  const CONSCIENCIA_SEM_ACENTO = removerAcentos(CONSCIENCIA);
  let padraoBuscaAlma = new RegExp(`\\b${ALMA}\\b`, "gi");

  // A busca é feita no texto normalizado, a substituição usa a palavra acentuada CONSCIENCIA.
  textoTranscrito = textoTranscrito.replace(padraoBuscaAlma, CONSCIENCIA);

  // 4. Loop de substituição principal
  substituicoesOrdenadas.forEach(([palavra_original, palavra_transcrita]) => {
    let valor_substituido = palavra_transcrita;

    if (palavra_original === TERRA && palavra_transcrita === ALMA) {
      valor_substituido = TOKEN_ALMA_DA_TERRA;
    }

    // CRÍTICO: Usa a versão SEM ACENTO da palavra original para a busca
    const palavraSemAcentoOriginal = removerAcentos(palavra_original);

    // A regex busca 'Jose' no texto que agora é 'Jose', 'Juda' no texto que é 'Juda', etc.
    let padraoBusca = new RegExp(`\\b${palavraSemAcentoOriginal}\\b`, "gi");

    // O replace insere a palavra acentuada/transcrita (Ex: 'Prosperidade') no texto normalizado.
    textoTranscrito = textoTranscrito.replace(padraoBusca, valor_substituido);
  });

  // 5. Restaura o token temporário ALMA
  let padraoBuscaTokenCompleto = new RegExp(
    `\\b${TOKEN_ALMA_DA_TERRA}\\b`,
    "g"
  );
  textoTranscrito = textoTranscrito.replace(padraoBuscaTokenCompleto, ALMA);

  return textoTranscrito;
}

module.exports = { transcreverTexto, removerAcentos };
