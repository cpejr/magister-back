const { transcreverTexto } = require("../transcricao.js");

function transcrever(req, res) {
  const { texto } = req.body;
  if (!texto) return res.status(400).json({ erro: "Texto é obrigatório." });

  const resultado = transcreverTexto(texto);
  return res.json({ resultado });
}

module.exports = { transcrever };
