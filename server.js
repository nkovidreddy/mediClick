
var express=require('express');
var app=express();
var path=require('path');
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan'); // used to see requests
var mongoose = require('mongoose'); // for working w/ our database

 var apiRouter = express.Router();


var User = require(__dirname+'/public/js/users.js');//database
var Personalinfo = require(__dirname+'/public/js/personalinfos.js');//database
var Fact = require(__dirname+'/public/js/facts.js');//database

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

app.get('/EmCon',function(req,res){
  res.sendFile(path.join(__dirname+'/views/EmCon.html'))
 });

app.get('/betterhealth',function(req,res){
  res.sendFile(path.join(__dirname+'/views/betterhealth.html'))
 });


app.get('/Symptoms',function(req,res){

 	res.sendFile(path.join(__dirname+'/views/sym.html'))
 
 });

app.get('/Remedies',function(req,res){
 	res.sendFile(path.join(__dirname+'/views/Rem.html'))
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


//sindhuupdate
apiRouter.route('/users/:email')

.put(function(req, res) {
  var email=req.params.email
  console.log("testing inside sindhuupdate"+email);
//var user = new User();
 var fname = req.body.fname;
 var lname = req.body.lname;
 var bday=req.body.bday;
 var gender=req.body.gender;
 var phone=req.body.phone;
 var address=req.body.address;
 var zipcode=req.body.zipcode;
//var query = { email: 'sindhu@gmail.com' };
//User.findOneAndUpdate(query, { email: 'tested@gmail.com' }, options, callback)


var conditions = { email: email };
//var update = { $set: {fname: "sindhu",lname:"vallabhaneni"}};
var update = { $set: {fname: fname,lname:lname,bday:bday,gender:gender,phone:phone,address:address,zipcode:zipcode}};

var options = { upsert: true };

User.update(conditions, update, options, callback);
function callback (err, numAffected) {
  // numAffected is the number of updated documents
  console.log("Playing");
  res.json(numAffected);
}; 

})
//End


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


//sindhuupdate2
apiRouter.route('/users/:email/:medical/:info')

.put(function(req, res) {
  var email=req.params.email
  console.log("testing inside sindhuupdate22222"+email);
//var user = new User();
 var medicalConditions = req.body.conditions;
 console.log(medicalConditions);
 var pregnancy = req.body.pregnancy;
 var addiction=req.body.addiction;
 var lastVisit=req.body.lastVisit;
 var visitReason=req.body.visitReason;

var conditions = { email: email };
var update = { $set: {medicalConditions: medicalConditions,pregnancy:pregnancy,addiction:addiction,lastVisit:lastVisit,visitReason:visitReason}};

var options = { upsert: true };

User.update(conditions, update, options, callback);
function callback (err, numAffected) {
  // numAffected is the number of updated documents
  if(err) console.log(err);
  console.log("Playing");
  res.json(numAffected);
}; 

})
//End

//sindhuupdate2
apiRouter.route('/users/:email/:emergency/:contacts/:info')

.put(function(req, res) {
  var email=req.params.email
  console.log("testing inside emergency sindhu"+email);
//var user = new User();
    var efname1=req.body.efname1
    var elname1=req.body.elname1;
    var eemail1=req.body.eemail1;
    var efname2=req.body.efname2;
    var elname2=req.body.elname2;
    var eemail2=req.body.eemail2;
    var notify=req.body.notify;

var conditions = { email: email };
var update = { $set: {efname1: efname1,elname1:elname1,eemail1:eemail1,efname2:efname2,elname2:elname2,eemail2:eemail2,notify:notify}};

var options = { upsert: true };

User.update(conditions, update, options, callback);
function callback (err, numAffected) {
  // numAffected is the number of updated documents
  console.log("emergency upadted");
  res.json(numAffected);
}; 

})
//End

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

//getdiseaseinfo

apiRouter.route('/diseaseinfo')


//get the user with that ID
//accessed at http://localhost:8080/api/users/:userid
.get(function(req,res) {
  //var factRecord = new Fact();
    Fact.find({ "fact": "Race"}, function(err, user) {
//User.findById(req.params.email,function(err,user){
if(err) res.send(err);
//returing that user only
console.log(user);
res.json(user);
});
  console.log(req.params.bodypart);
  console.log(req.params.specificbodypart);
    console.log(req.params.symptom);
// facts.find({ "fact": req.params.symptom}, function(err, user) {
// //User.findById(req.params.email,function(err,user){
// if(err) res.send(err);
// //returing that user only
// console.log(user);
// res.json(user);
// });
})

//database3
app.listen(port);
console.log('listening to port' +port);
//setting public folder
