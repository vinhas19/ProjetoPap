const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '12345!', 
  database: 'horario_escolar' 
});

db.connect((err) => {
  if (err) console.error('Erro ao conectar ao MySQL:', err);
  else console.log('Conectado ao MySQL!');
});

app.get('/api/disciplina', (req, res) => {
  db.query('SELECT id, Disciplina AS name FROM planocurricular', (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});

app.get('/api/professores', (req, res) => {
  db.query('SELECT id, name, discipline_id FROM professores', (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});

app.get('/api/horario', (req, res) => {
  db.query('SELECT * FROM horario', (err, results) => {
    if (err) res.status(500).send(err);
    else res.json(results);
  });
});

app.post('/api/horario', (req, res) => {
  const { day_of_week, start_time, discipline_id, professor_id } = req.body;
  if (!day_of_week || !start_time || !discipline_id || !professor_id) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }
  const query = 'INSERT INTO horario (day_of_week, start_time, discipline_id, professor_id) VALUES (?, ?, ?, ?)';
  db.query(query, [day_of_week, start_time, discipline_id, professor_id], (err, result) => {
    if (err) res.status(500).send(err);
    else res.json({ id: result.insertId, day_of_week, start_time, discipline_id, professor_id });
  });
});

app.delete('/api/horario/:id', (req, res) => {
  db.query('DELETE FROM horario WHERE id = ?', [req.params.id], (err) => {
    if (err) res.status(500).send(err);
    else res.sendStatus(204);
  });
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
