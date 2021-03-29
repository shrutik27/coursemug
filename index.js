var express = require('express');
const request = require('request');
const fs = require('fs'); 
var mysql = require('mysql');
var path = require('path');
var multer  = require('multer');
const bodyParser = require('body-parser');
const { text } = require("body-parser");
const db = require('./public/js/db');
var port= process.env.PORT || 8080;

const app = express();

// SET OUR VIEWS AND VIEW ENGINE
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));

//USE 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended:false}));

//START OF PAGES
app.get('/', function(req, res) {
    res.render('home');
 });
app.post('/search',function(req,res){
    console.log(req.body.search);
    var post  = req.body;
    var go =post.search;
    redirect='/search/'+go
    res.redirect(redirect);
});
app.get('/search/:id', function(req, res) {
     id=req.params.id;
     console.log(id)
     db.execute("SELECT * from udacity" ).then(([rows]) => {
     res.render('search',{
         info:rows
         });
    });
});
  
app.use('/', (req,res) => {
    res.status(404).send('<h1>404 Page Not Found!</h1>');
});
app.listen(port, () => console.log("Server is Running at http://localhost:8080"));
