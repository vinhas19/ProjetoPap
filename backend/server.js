const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexão com o MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '12345!', 
  database: 'horario_escolar' 
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

// Buscar disciplinas
app.get('/api/disciplina', (req, res) => {
  const query = 'SELECT id, Disciplina FROM planocurricular';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar disciplinas:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Buscar professores
app.get('/api/professores', (req, res) => {
  const query = 'SELECT id, name, discipline_id FROM professores';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar professores:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Buscar horário
app.get('/api/horario', (req, res) => {
  const query = 'SELECT * FROM horario';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar horário:', err);
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

// Adicionar horário
app.post('/api/horario', (req, res) => {
  const { day_of_week, start_time, discipline_id, professor_id } = req.body;
  const query = 'INSERT INTO horario (day_of_week, start_time, discipline_id, professor_id) VALUES (?, ?, ?, ?)';
  db.query(query, [day_of_week, start_time, discipline_id, professor_id], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar horário:', err);
      res.status(500).send(err);
    } else {
      res.json({ id: result.insertId, day_of_week, start_time, discipline_id, professor_id });
    }
  });
});

// Remover horário
app.delete('/api/horario/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM horario WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) {
      console.error('Erro ao remover horário:', err);
      res.status(500).send(err);
    } else {
      res.sendStatus(204);
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
