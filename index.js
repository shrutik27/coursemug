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
var port= process.env.PORT || 8080 || 5000;

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
    var post  = req.body;
    var go =post.search;
    redirect='/search/'+go
    res.redirect(redirect);
});
app.get('/search/:id', function(req, res) {
     id=req.params.id;
    rows= db.execute("SELECT * from udemydevelopment WHERE title  like '%" + id + "%'  OR  short  like '%" + id + "%' UNION ALL SELECT * FROM edxall WHERE title  like '%" + id + "%'  OR  short  like '%" + id + "%' UNION ALL SELECT * FROM udacity WHERE  title  like '%" + id + "%'  OR  short  like '%" + id + "%'" ).then(([rows]) => {
     res.render('search',{
         info:rows
         });
    });
});

app.post('/search/:id/', function(req, res) {
    id=req.params.id;
    var get=req.body;
    var level=get.level;
    if(level==undefined){
        level=['beginner','intermediate','expert','all levels']
    }
    if(level=='alllevel')
    {
        level=['beginner','intermediate','expert','all levels']
    }
    if(typeof(level)=='object'){
        level=level.join("','");
    }

    var language=get.language;
    if(language==undefined){
        language=['english','Español']
    }
    if(language=='other')
    {
        language=['Español']
    }
    if(typeof(language)=='object'){
        language=language.join("','");
    }

    var rating=get.rating;
    if(rating==undefined){
        rating=0
    }
    if(typeof(rating)=='object'){
        rating = rating.map(Number)
        rating=rating.join(",")
    }

    var price=get.price;
    if(price==undefined){
        price=['free','paid']
    }
    if(typeof(price)=='object'){
        price=price.join("','");
    }

    var time=get.time;
    if(time==undefined){
        time=0
    }
    if(typeof(time)=='object'){
        time=time.join("','");
    }
    rows= db.execute("SELECT * from udemydevelopment WHERE (title like '%" + id + "%' OR short like '%" + id + "%') AND  level IN ('" +level+ "') AND language IN ('" +language+ "') AND ratingcat >= ('" +rating+ "') AND lengthcat >=('"+time+"') AND pricecat IN ('" +price+ "') UNION ALL SELECT * FROM edxall WHERE (title  like '%" + id + "%'  OR  short  like '%" + id + "%') AND level IN ('" +level+ "') AND language IN ('" +language+ "') AND ratingcat >= ('" +rating+ "') AND lengthcat >=('"+time+"') AND pricecat IN ('" +price+ "') UNION ALL SELECT * FROM udacity WHERE  (title  like '%" + id + "%'  OR  short  like '%" + id + "%') AND level IN ('" +level+ "') AND language IN ('" +language+ "') AND ratingcat >= ('" +rating+ "') AND lengthcat >=('"+time+"') AND pricecat IN ('" +price+ "')").then(([rows]) => {
    res.render('search',{
        info:rows
        });
   });
});
app.use('/', (req,res) => {
    res.status(404).send('<h1>404 Page Not Found!</h1>');
});
app.listen(port, () => console.log("Server is Running at http://localhost:8080"));
