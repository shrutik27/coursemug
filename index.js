var express = require('express');
const request = require('request');
const fs = require('fs'); 
var mysql = require('mysql');
var path = require('path');
var multer  = require('multer');
const bodyParser = require('body-parser');
const { text } = require("body-parser");
const db = require('./public/js/db');
const { INSPECT_MAX_BYTES } = require('buffer');
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
    rows= db.execute("SELECT * from udacity" ).then(([rows]) => {
     res.render('search',{
         info:rows
         });
    });
});

app.post('/search/:id', function(req, res) {
    id=req.params.id;
    var get=req.body;
    var level=get.level;
    if(level==undefined){
        level=['beginner','intermediate','expert']
    }
    if(typeof(level)=='object'){
        level=level.join("','");
    }
    console.log(level);

    var language=get.language;
    if(language==undefined){
        language=['english','other']
    }
    if(typeof(language)=='object'){
        language=language.join("','");
    }

    var rating=get.rating;
    if(language==undefined){
        rating=0
    }

    var price=get.price;
    if(price==undefined){
        price=['free','paid']
    }
    if(typeof(price)=='object'){
        price=price.join("','");
    }
    console.log(language);
    rows= db.execute("SELECT * FROM udacity WHERE level IN ('" +level+ "') AND language IN ('" +language+ "') AND ratingcat >= ('" +rating+ "') AND pricecat IN ('" +price+ "') ").then(([rows]) => {
    res.render('search',{
        info:rows
        });
   });
});
  
app.use('/', (req,res) => {
    res.status(404).send('<h1>404 Page Not Found!</h1>');
});
app.listen(port, () => console.log("Server is Running at http://localhost:8080"));
