var express = require('express');
var router = express.Router();
const gitController = require('../controller/gitController');

// Rota index
router.get('/', function (req, res, next) {
  res.render('index');
});

// Rota para arquivar todos os repositórios
router.patch('/archiveAll', async (req, res) => {
  const { user, token } = req.body;  // Obtendo usuário e token do corpo da requisição

  if (!user || !token) {
    return res.status(400).json({ success: false, message: 'Parâmetros incompletos: user e token são obrigatórios.' });
  }

  try {
    const result = await gitController.archiveAll(user, token);

    if (result.success) {
      return res.status(200).json(result);
    } else {
      // Se falhar ao arquivar, retorno do erro com status 422
      return res.status(422).json(result);
    }
  } catch (error) {
    // Retorno 500 para falha interna do servidor
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;