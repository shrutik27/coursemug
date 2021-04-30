const mysql = require('mysql2');
const dbConnection = mysql.createPool({
    host     : 'course.c7oqi1rod4zk.us-west-2.rds.amazonaws.com', // MYSQL HOST NAME
    user     : 'shrutik', // MYSQL USERNAME
    password : '9822174187', // MYSQL PASSWORD
    database : 'course' ,//MYSQL DATABASENAME
    max_connection:10,
    connectTimeout: 100000, // 10 seconds
    acquireTimeout: 100000, // 10 seconds
    waitForConnections: true, // Default: true
    queueLimit: 0, // Default: 0
}).promise();
module.exports = dbConnection;