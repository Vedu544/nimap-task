import mysql from 'mysql2/promise';

const mySqlpool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Vaishu@123',
    database: 'products_db'
})

export default mySqlpool;
