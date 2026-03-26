const mysql = require('mysql2')// importando o mysql
require('dotenv').config()// importando o dotev

const pool = mysql.createPool({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
port: process.env.DB_PORT,
waitForConnections: true,
connectionLimit: 10,
queueLimit: 0
})

module.exports = pool //permite que outros arquivos utilizem esse pool.
