const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "usuarios"
});

app.post("/create", (req, res) => {
    const data = req.body.data;
    const revisao = req.body.revisao;
    const codigo = req.body.codigo;
    const validade = req.body.validade;
    const responsavel = req.body.responsavel;
    const registro = req.body.registro;

    db.query('INSERT INTO empregados( data, revisao, codigo, validade, responsavel, registro) VALUES(?,?,?,?,?,?)',[ data, revisao, codigo,validade, responsavel, registro],
        (err, result) => {
            if(err) {
                console.log(err);
            }else {
                res.send(result);
            }
        }
    );
});


//buscar retornando o body da requisição

app.get("/empregados", (req, res) => {
    db.query('SELECT * FROM empregados',
        (err, result) => {
            if(err) {
                console.log(err);
            }else {
                res.send(result);
            }
        }
    );
});

app.put("/update", (req, res) => {
    const id = req.body.id;
    const data = req.body.data;
    const revisao = req.body.revisao;
    const codigo = req.body.codigo;
    const validade = req.body.validade;
    const responsavel = req.body.responsavel;
    const registro = req.body.registro;

    db.query('UPDATE empregados SET data=?, revisao=?, codigo=?, validade=?, responsavel=?, registro=? WHERE id=?',[ data, revisao, codigo,validade, responsavel, registro, id],
        (err, result) => {
            if(err) {
                console.log(err);
            }else {
                res.send(result);
            }
        }
    );
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
  
    db.query('DELETE FROM empregados  WHERE id=?',id,
        (err, result) => {
            if(err) {
                console.log(err);
            }else {
                res.send(result);
            }
        }
    );
});

app.listen(3001,()=> {
    console.log("Conectado na porta 3001")
})

