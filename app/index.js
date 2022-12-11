const express = require('express');
const app = express();
const hostname = '0.0.0.0';
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);

const sql = `INSERT INTO people (name) values('Guilherme')`;
connection.query(sql);
connection.end();

const sql2 = 'SELECT name FROM people';

app.get('/', function (req, res) {
    const connection2 = mysql.createConnection(config);
    var response = '<h1>Full Cycle Rocks!</h1>\n';
    response += '<p>Lista de nomes cadastrados no banco de dados</p>\n';
    response += '<ul>\n';

    connection2.query(sql2, function (err, result, fields) {
        result.map((value) => response += '<li>' + value.name + '</li>\n');
        response += '</ul>\n';
        res.send(response);
        connection2.end();
    });
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})