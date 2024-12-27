const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors'); // Importer le module cors

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Utiliser le middleware cors

const users = []; // Simuler une base de données pour les utilisateurs
const products = require('../FRONTEND/src/assets/mock/products.json'); // Charger les produits

// Middleware pour vérifier le JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token is required');
  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) return res.status(500).send('Invalid token');
    req.userId = decoded.id;
    next();
  });
};

// API de connexion
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(404).send('User not found');
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) return res.status(401).send('Invalid password');
  const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
  res.status(200).send({ auth: true, token });
});

// API pour enregistrer et modifier les informations du compte client
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ id: users.length + 1, username, password: hashedPassword });
  res.status(201).send('User registered');
});

app.put('/api/account', verifyToken, (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.id === req.userId);
  if (!user) return res.status(404).send('User not found');
  user.username = username;
  user.password = bcrypt.hashSync(password, 8);
  res.status(200).send('User updated');
});

// API pour récupérer le catalogue produits
app.get('/api/catalogue', (req, res) => {
  res.status(200).send(products);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});