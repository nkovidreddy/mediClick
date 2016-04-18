
var express=require('express');
var app=express();
var path=require('path');
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan'); // used to see requests
var mongoose = require('mongoose'); // for working w/ our database

 var apiRouter = express.Router();


var User = require(__dirname+'/public/js/users.js');//database
var Personalinfo = require(__dirname+'/public/js/personalinfos.js');//database

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

app.get('/register',function(req,res){
 	//res.send('index',{title:'hey',message:'Hello there!'});
 	res.sendFile(path.join(__dirname+'/views/register.html'))
 	//next();
 });
app.get('/forms',function(req,res){
 	//res.send('index',{title:'hey',message:'Hello there!'});
 	res.sendFile(path.join(__dirname+'/views/forms.html'))
 	//next();
 });
app.get('/MedicalHistory',function(req,res){
 	//res.send('index',{title:'hey',message:'Hello there!'});
 	res.sendFile(path.join(__dirname+'/views/MedicalHistory.html'))
 	//next();
 });

app.get('/Symptoms',function(req,res){
 	//res.send('index',{title:'hey',message:'Hello there!'});
 	res.sendFile(path.join(__dirname+'/views/Symptoms.html'))
 	//next();
 });

app.get('/Remedies',function(req,res){
 	//res.send('index',{title:'hey',message:'Hello there!'});
 	res.sendFile(path.join(__dirname+'/views/Rem.html'))
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
 user.email = req.body.email;
 console.log(user.email);

 user.password = req.body.password;
console.log(user.password);
 // save the user and check for errors
 user.save(function(err) {
 	
 if (err) {
 	console.log(err);
 // duplicate entry
 if (err.code == 11000)
 	return res.json( "Email Id already exists.");
 else
 	return res.send(err);
 }

 res.json("Account creation successful!");
 });

})


.get(function(req, res) {
//Build a RESTful Node API 70

console.log(req.body);
//User.find({ 'username': username,'email':email }, function(err, user) {

 User.find(function(err, users) {


 if (err) res.send(err);

 // return the users
 console.log(users);
 res.json(users);
 });
 });
//database
//database2
apiRouter.route('/users/:email/:password')

//get the user with that ID
//accessed at http://localhost:8080/api/users/:userid
.get(function(req,res) {
	//console.log(req.params.password);
	User.find({ "email": req.params.email}, function(err, user) {
//User.findById(req.params.email,function(err,user){
if(err) res.send(err);
//returing that user only
console.log(user);
res.json(user);
});
})

//database2
apiRouter.route('/forms')
.post(function(req, res) {
	console.log("I m here inside post of forms");
 
 // create a new instance of the User model
 var userinfo = new Personalinfo();

 // set the users information (comes from the request)
userinfo.fname=req.body.fname;
userinfo.lname=req.body.lname;
userinfo.bday=req.body.bday;
userinfo.gender=req.body.gender;
userinfo.phone=req.body.phone;
userinfo.address=req.body.address;
userinfo.zipcode=req.body.zipcode;

 // save the user and check for errors
 userinfo.save(function(err) {
 	console.log("I m here inside save function");
 
 if (err) {
 	console.log("error here in /personalinfo.js");
 	console.log(err); 
 }
console.log("SUCCESSFUL");
 res.json("records inserted successfuly");
 });

})
//database3

//database3
app.listen(port);
console.log('listening to port' +port);
//setting public folder
