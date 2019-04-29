const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'AngularChallengeDB'
});

conn.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ' + err);
    } else { 
        console.log('Banco de dados conectado com sucesso!');
    }
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const isEmpty = (obj) => {
    let emptyCount = 0;
    const arr = Object.values(obj);
    for (const prop of arr) {
        if (prop == "" || prop == null) {
            emptyCount += 1;
        } 
    }
    if (emptyCount > 0) {
        return true;
    } else {
        return false;
    }
}

app.post('/insertInfo', (req, res) => {
    console.log(req.body);
    const queryString = 'insert into information (nome, sobrenome, participacao) values (?, ?, ?)';
    const info = req.body;
    if (isEmpty(info)) {
        console.log( "Preencha todos os campos" );
        res.status(400).json({ msg: "Preencha todos os campos", status: false });
    } else {
        conn.query(queryString, [info.nome, info.sobrenome, info.participacao], ( err, rows, fields ) => {
            if (err) {
                res.status(500).json({ msg: "Ocorreu um erro ao tentar inserir no banco de dados", erro: err, status: false });
            } else {
                res.status(200).json({ msg: "Dados inseridos com sucesso", status: true });
            }
        });
    }
});
 
app.get('/getInfo', (req, res) => {   
    const queryString = 'select * from information';
    conn.query(queryString, ( err, rows, fields ) => {
        if (err) {
            res.status(500).json({ msg: "Ocorreu um erro ao tentar inserir no banco de dados", erro: err, status: false });
        } else {
            res.status(200).json({ msg: "Informações do banco de dados", infos: rows, status: true });            
        }
    });
});

app.listen(port, () => console.log(`Server's online on port ${port}`));