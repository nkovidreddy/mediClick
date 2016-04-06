
var express=require('express');
var app=express();
var path=require('path');
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan'); // used to see requests
var mongoose = require('mongoose'); // for working w/ our database

//var bodyParser=require('body-Parser');
//var mongoose=require('mongoose');

var port=process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// configure our app to handle CORS requests
 app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
 Authorization');
 next();
 });

 app.use(morgan('dev'));
 // get an instance of the express router
 var apiRouter = express.Router();
 // test route to make sure everything is working
// accessed at GET http://localhost:8080/api
apiRouter.get('/', function(req, res) {
 res.json({ message: 'hooray! welcome to our api!' });
 });

 // REGISTER OUR ROUTES -------------------------------
 // all of our routes will be prefixed with /api
app.use('/api', apiRouter);
app.use(express.static(__dirname+'/'));


//Setup one route to index.html file
 app.get('/',function(req,res){
 	//res.send('index',{title:'hey',message:'Hello there!'});
 	res.sendFile(path.join(__dirname+'/views/index.html'))
 	//next();
 });
 /*
app.get('/',function(req,res){
 	//res.send('index',{title:'hey',message:'Hello there!'});
 	res.sendFile(path.join(__dirname+'/views/index.html'))
 	//next();
 });
app.get('/Symptoms',function(req,res){
 	//res.send('index',{title:'hey',message:'Hello there!'});
 	res.sendFile(path.join(__dirname+'/views/Symptoms.html'))
 	//next();
 });

app.get('/Remedies',function(req,res){
 	//res.send('index',{title:'hey',message:'Hello there!'});
 	res.sendFile(path.join(__dirname+'/views/Remedies.html'))
 	//next();
 });
app.get('/gmaps',function(req,res){
 	//res.send('index',{title:'hey',message:'Hello there!'});
 	res.sendFile(path.join(__dirname+'/views/gmaps.html'))
 	//next();
 });
*/
app.listen(port);
console.log('listening to port' +port);
//setting public folder
