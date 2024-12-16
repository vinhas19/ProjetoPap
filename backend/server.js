const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database/connection');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Endpoint para buscar disciplinas
app.get('/api/disciplina', (req, res) => {
  const query = 'SELECT Disciplina FROM planocurricular';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao executar query:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
