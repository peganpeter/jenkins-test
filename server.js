'use strict';

const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());
app.use('/static', express.static('static'));
app.use(express.urlencoded({extended: true}))


const dotenv = require('dotenv');
dotenv.config();


const conn = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD
});

conn.connect((err) => {
  if(err) {
    console.log(err.sqlMessage);
    return;
  }
  console.log('Connected to MySQL.');
});


/*app.get('/registration', (req, res) => {
  res.sendFile(__dirname + '/static/add.html');
})*/

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/names.html');
})

app.post('/add', (req, res) => {
  conn.query(`INSERT INTO data (name) VALUES (?);`,[req.body.name], (error, result) => {
    if(error) {
      res.status(500).json(error);
      return;
    }
    res.redirect('/');
  })
});

app.get('/names', (req, res) => {
  conn.query(`SELECT * FROM data`, (error, result) => {
    if(error) {
      res.status(500).json(error);
      return;
    }
    res.send(result);
  })
});


  app.listen(process.env.PORT, () => {
    console.log('Server is running.');
  });