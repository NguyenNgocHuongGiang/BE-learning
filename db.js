import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost', //dia chi khi jet noi local
    user: 'root',
    password: '1234',
    database: 'db_spotify',
    port: 3306
})

export default pool