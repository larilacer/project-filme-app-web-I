const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para analisar JSON no body das requisições
app.use(express.json());

// Carrega o arquivo db.json
const dbPath = path.join(__dirname, 'db.json');

// Função para ler o arquivo db.json
const readDatabase = () => {
  const data = fs.readFileSync(dbPath);
  return JSON.parse(data);
};

// Função para salvar dados no db.json
const writeDatabase = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Endpoints CRUD

// GET /filmes - Retorna todos os filmes
app.get('/filmes', (req, res) => {
  const db = readDatabase();
  res.json(db.filmes);
});

// POST /filmes - Adiciona um novo filme
app.post('/filmes', (req, res) => {
  const db = readDatabase();
  const newFilme = { ...req.body, id: db.filmes.length + 1 };
  db.filmes.push(newFilme);
  writeDatabase(db);
  res.status(201).json(newFilme);
});

// PUT /filmes/:id - Atualiza um filme existente
app.put('/filmes/:id', (req, res) => {
  const db = readDatabase();
  const filmeId = parseInt(req.params.id);
  const filmeIndex = db.filmes.findIndex(f => f.id === filmeId);

  if (filmeIndex !== -1) {
    db.filmes[filmeIndex] = { ...req.body, id: filmeId };
    writeDatabase(db);
    res.json(db.filmes[filmeIndex]);
  } else {
    res.status(404).json({ message: 'Filme não encontrado' });
  }
});

// DELETE /filmes/:id - Deleta um filme
app.delete('/filmes/:id', (req, res) => {
  const db = readDatabase();
  const filmeId = parseInt(req.params.id);
  const filmeIndex = db.filmes.findIndex(f => f.id === filmeId);

  if (filmeIndex !== -1) {
    db.filmes.splice(filmeIndex, 1);
    writeDatabase(db);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Filme não encontrado' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
