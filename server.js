
var express=require('express');
var app=express();
var path=require('path');
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan'); // used to see requests
var mongoose = require('mongoose'); // for working w/ our database

 var apiRouter = express.Router();


var User = require(__dirname+'/public/js/users.js');//database

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

/*app.get('/', function(req, res) {
 res.send('Welcome to the home page!');
 });*/




 // test route to make sure everything is working
/* accessed at GET http://localhost:8080/api
apiRouter.get('/', function(req, res) {
 res.json({ message: 'hooray! welcome to our api!' });
 });*/


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

app.get('/home',function(req,res){
 	//res.send('index',{title:'hey',message:'Hello there!'});
 	res.sendFile(path.join(__dirname+'/views/register.html'))
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
//database
apiRouter.route('/users')

 // create a user (accessed at POST http://localhost:8080/api/users)
 .post(function(req, res) {

 // create a new instance of the User model
 var user = new User();

 // set the users information (comes from the request)
// console.log(req.body);
 user.name = req.body.name;
 //console.log("iam here");
 console.log(user.name);
 user.username = req.body.username;
 user.password = req.body.password;

 // save the user and check for errors
 user.save(function(err) {
 	console.log("I m here");
 
 if (err) {
 	console.log("I m here1");
 // duplicate entry
 if (err.code == 11000)
 	return res.json({ success: false, message: 'A user with that\
 			username already exists. '});
 else
 	return res.send(err);
 }

 res.json({ message: 'User created!' });
 });

})


.get(function(req, res) {
//Build a RESTful Node API 70
 User.find(function(err, users) {
 if (err) res.send(err);

 // return the users
 res.json(users);
 });
});
//database
app.listen(port);
console.log('listening to port' +port);
//setting public folder
