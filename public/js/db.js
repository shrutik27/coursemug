const mysql = require('mysql2');
const dbConnection = mysql.createPool({
    host     : 'course.c7oqi1rod4zk.us-west-2.rds.amazonaws.com', // MYSQL HOST NAME
    user     : 'shrutik', // MYSQL USERNAME
    password : '9822174187', // MYSQL PASSWORD
    database : 'course' ,//MYSQL DATABASENAME
}).promise();
module.exports = dbConnection;