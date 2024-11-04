// 8800 -> mysql
// 8080 -> servidor api

require('dotenv').config()
const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});


app.use(cors());
app.use(express.json());

// Endpoint para obter todos os usuários
app.get("/getUsers", (req, res) => {
  const SQL = "SELECT * FROM users;"
  db.query(SQL, (err, result) => {
    if (err) res.send({ msg: err })
    else res.send(result)
  });
});

// Endpoint para cadastrar novo usuário
app.post("/post/newUser", (req, res) => {
  const { name } = req.body

  const SQL = `INSERT INTO users ( name ) 
               VALUES ( ? );`

  db.query(SQL, [name], (err, result) => {
    if (err) res.send({ msg: err })
    else res.send({ msg: "Usuário Cadastrado!" })
  });
});

// Endpoint para controlar LEDs
app.post("/control/led", async (req, res) => {
  const { idLed, status } = req.body;

  let SQL = `UPDATE led_status
             SET status = ?
             WHERE idLed = ?;`

  db.query(SQL, [status, idLed], (err, result) => {
    if (err) res.send({ msg: err })
    else res.send({ msg: `LED: ${idLed} | STATUS: ${status}` })
  })
});

// Endpoint para obter todos os LEDs
app.get("/control/listLeds", (req, res) => {
  let SQL = "SELECT * FROM led_status;"

  db.query(SQL, (err, results) => {
    if (err) {
      console.error("Erro ao obter status dos LEDs:", err)
      res.status(500).send({ msg: "Erro ao obter status dos LEDs" })
    } else {
      res.send(results); // Envia o status de todos os LEDs
    }
  });
});


app.listen(8080, () => {
  console.log("Servidor Iniciado na porta 8080.");
});

