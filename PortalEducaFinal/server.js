const express = require('express');
const multer = require('multer');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

// Configuração do Express
const app = express();
app.use(express.json());

// Configuração do banco de dados SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Erro ao abrir o banco de dados:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
    db.run(`CREATE TABLE IF NOT EXISTS uploads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT,
      link TEXT,
      imagePath TEXT,
      filePath TEXT
    )`);
  }
});

// Configuração do Multer para armazenar os arquivos na pasta "uploads"
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único baseado em timestamp
  }
});

const upload = multer({ storage });

// Endpoint para upload de arquivos e dados
app.post('/upload', upload.fields([{ name: 'image' }, { name: 'file' }]), (req, res) => {
  const { link, description } = req.body;
  const image = req.files.image ? req.files.image[0] : null;
  const file = req.files.file ? req.files.file[0] : null;

  // Caminhos dos arquivos
  const imagePath = image ? image.path : null;
  const filePath = file ? file.path : null;

  // Salvar informações no banco de dados
  db.run(
    `INSERT INTO uploads (description, link, imagePath, filePath) VALUES (?, ?, ?, ?)`,
    [description, link, imagePath, filePath],
    function (err) {
      if (err) {
        console.error('Erro ao salvar dados no banco de dados:', err.message);
        res.status(500).json({ message: 'Erro ao salvar dados' });
      } else {
        res.json({ message: 'Dados salvos com sucesso!', id: this.lastID });
      }
    }
  );
});

// Iniciar o servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
