// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Create connection to database
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'comments'
});

// Connect to database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Server!');
});

// Use body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get all comments
app.get('/api/comments', (req, res) => {
  connection.query('SELECT * FROM comments', (err, rows) => {
    if (err) throw err;
    res.json(rows);
  });
});

// Get a comment by id
app.get('/api/comments/:id', (req, res) => {
  connection.query('SELECT * FROM comments WHERE id = ?', [req.params.id], (err, row) => {
    if (err) throw err;
    res.json(row);
  });
});

// Insert a comment
app.post('/api/comments', (req, res) => {
  const sql = 'INSERT INTO comments SET ?';
  const comment = {
    comment: req.body.comment,