const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost', // MYSQL HOST NAME
    user     : 'root', // MYSQL USERNAME
    password : '', // MYSQL PASSWORD
    database : '' // MYSQL DB NAME
});

connection.connect();
module.exports = connection;