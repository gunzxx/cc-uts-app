const mysql = require('mysql2/promise');
const config = require('../config/mysql');

const queryDB = async (query)=>{
    const connection = await mysql.createConnection(config);

    const [result,] = await connection.execute(query);
    await connection.end();
    
    return result;
}

module.exports = {
    queryDB
}