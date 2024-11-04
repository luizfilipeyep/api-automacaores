# API Automação Residêncial

Essa API é baseada em node com o framework express para a construção do servidor e mysql2 para comunicação com o banco de dados

## Como funciona a API?

``` jsx
app.get("/getUsers", (req, res) => { 
  const SQL = "SELECT * FROM users;"
  db.query(SQL, (err, result) => {
    if (err) res.send({ msg: err })
    else res.send(result)
  })
})
```
Cria uma rota para /getUsers e uma função que passa dois parâmetros:

req = para requisição
res = para a resposta

SQL é a variável que irá passar o código SQL para o banco

db.query é uma função do mysql1 que se comunica com o banco de dados passando o código da variável SQL e com uma função que passa dos parâmetros:

err = para erros
result = para o resultado

