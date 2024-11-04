// 8800 -> mysql
// 8080 -> servidor api

const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  port: 8800,
  user: "root",
  password: "",
  database: "home"
});


app.use(cors());
app.use(express.json());

// Endpoint para obter todos os usuários
app.get("/getUsers", (req, res) => {
  const SQL = "SELECT * FROM users;";
  db.query(SQL, (err, result) => {
    if (err) res.send({ msg: err });
    else res.send(result);
  });
});

// Endpoint para cadastrar novo usuário
app.post("/post/newUser", (req, res) => {
  const { name } = req.body;
  const SQL = "INSERT INTO users (name) VALUES (?);";
  db.query(SQL, [name], (err, result) => {
    if (err) res.send({ msg: err });
    else res.send({ msg: "Usuário Cadastrado!" });
  });
});

// Endpoint para controlar LEDs
app.post("/control/led", async (req, res) => {
  const { idLed, status } = req.body;

  const SQL = `
      INSERT INTO led_status (idLed, status)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE status = ?;`;
  try {
      await db.promise().query(SQL, [idLed, status, status]);
      res.send(`LED: ${idLed} | STATUS: ${status}`);
  } catch (err) {
      console.error("Erro ao atualizar o status do LED:", err); // Isso imprime o erro no console
      res.status(500).send({ msg: "Erro ao atualizar o status do LED", error: err });
  }
});

// Endpoint para obter todos os LEDs
app.get("/control/listLeds", (req, res) => {
  const SQL = "SELECT * FROM led_status;";

  db.query(SQL, (err, results) => {
    if (err) {
      console.error("Erro ao obter status dos LEDs:", err);
      res.status(500).send({ msg: "Erro ao obter status dos LEDs" });
    } else {
      res.send(results); // Envia o status de todos os LEDs
    }
  });
});


app.listen(8080, () => {
  console.log("Servidor Iniciado na porta 8080.");
});

