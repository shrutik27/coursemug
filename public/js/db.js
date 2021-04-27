const mysql = require('mysql2');
const dbConnection = mysql.createPool({
  host     : 'sql264.main-hosting.eu', // MYSQL HOST NAME
  user     : 'u139817065_shareeasy', // MYSQL USERNAME
  password : '9822174187@Ss', // MYSQL PASSWORD
  database : 'u139817065_shareeasy'
}).promise();
module.exports = dbConnection;