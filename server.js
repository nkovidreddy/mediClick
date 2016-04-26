
var express=require('express');
var app=express();
var path=require('path');
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan'); // used to see requests
var mongoose = require('mongoose'); // for working w/ our database
var nodemailer = require('nodemailer'); //nodemailer
var transporter = nodemailer.createTransport(); //create transport
var TelCarrier = require('tel-carrier'); //telcarrier

 var apiRouter = express.Router();


var User = require(__dirname+'/public/js/users.js');//database
var Personalinfo = require(__dirname+'/public/js/personalinfos.js');//database
var Fact = require(__dirname+'/public/js/facts.js');//database
var Disease = require(__dirname+'/public/js/disease.js');//database


//using for concept extraction, entity extraction and sentiment analysis.
var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  application_id: "25f2f254",
  application_key: "2ccfd981db69522c822a59a57eb5e0f7"
});



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

app.get('/sendemail',function(req,res){
  //res.send('index',{title:'hey',message:'Hello there!'});
  res.sendFile(path.join(__dirname+'/views/sendemail.html'))
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
  var email=req.params.email;
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
  var email=req.params.email;
  console.log("testing inside emergency sindhu"+email);
//var user = new User();
    var efname1=req.body.efname1;
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
  console.log("Calling Disease Info API");
  //Fetch user entered symptom input text box
  console.log("Requested Body Part");
  console.log(req.body);
  

  //Applying Concept Extraction
  var text="cold and head ache";
  textapi.entities({
    'text': text
  }, function(error,response){
    if(error){
      res.json(error);
    }
    else{
      text=response;
      console.log(text);
    }
    
  });


  Fact.find({$text:{$search: "head \"headache\"" }},{id:1,_id:0}, function(err, data) {
     if(err){
      console.log(err);
     } 
     callback1(data);
    //res.json(data);
    });
    function callback1(data,err){
      if(err){
        console.log(err);
      }else{
        var values=[];
        var dataLen=data.length;
        for(i=0;i<dataLen;i++){
           var o= JSON.stringify(data[i]);
           var json = JSON.parse(o);
           values.push(json["id"]);
        }
        var idValue = json["id"];
        console.log(json["id"]); 
        var diseaseQuery={};
        diseaseQuery["$or"]=[];
        var valLen = values.length;
        for(j=0;j<valLen;j++){
          diseaseQuery["$or"].push({"id":values[j]});
        }
       //Sample Database find query below
       //Disease.find({$or:[{'id':181},{'id':1}]},{name:1,_id:0},function(err, u)
      Disease.find(diseaseQuery,{name:1,_id:0},function(err, u) {
         res.json(u);
       });
      }
      
    };
})
 

apiRouter.route('/diseaseinfo/:bodypart/:specbodypart/:symptom')

.get(function(req,res) {
  console.log("Calling Disease Info API");
  //Fetch user entered symptom input text box
  
  var bodypartVal=req.params.bodypart;
  var specbodypartVal=req.params.specbodypart;
  var symbodypartVal=req.params.symptom;

  //Applying Concept Extraction
  var conceptString="";
  var text=bodypartVal+" "+specbodypartVal+" "+symbodypartVal; 
  textapi.entities({
    'text': text
  }, function(error,response){
    if(error){
      res.json(error);
    }
    else{
      console.log("Calling Text API");
      text=response;
      textKeywords = text.entities.keyword;
      var textLength=text.entities.keyword.length;
      for(var con=0;con<textLength;con++){
        conceptString=conceptString+" "+textKeywords[con];
        
      }
  var searchStr="\""+bodypartVal+"\""+"\""+specbodypartVal+"\""+conceptString;
  //console.log("Search String" +searchStr);
  Fact.find({$text:{$search: searchStr }},{id:1,_id:0}, function(err, data) {
     if(err){
      console.log(err);
     } 
     callback1(data);
    //res.json(data);
    });
    function callback1(data,err){
      if(err){
        console.log(err);
      }else{
        var values=[];
        var dataLen=data.length;
        console.log(dataLen);
        for(i=0;i<dataLen;i++){
           var o= JSON.stringify(data[i]);
           var json = JSON.parse(o);
           values.push(json["id"]);
        }
        var diseaseQuery={};
        diseaseQuery["$or"]=[];
        var valLen = values.length;
        for(j=0;j<valLen;j++){
          diseaseQuery["$or"].push({"id":values[j]});
        }
       //Sample Database find query below
       //Disease.find({$or:[{'id':181},{'id':1}]},{name:1,_id:0},function(err, u)
      Disease.find(diseaseQuery,{name:1,_id:0},function(err, conditions) {
         res.json(conditions);
       });
      }
      
    };

    }
  });
  

//Format for search as string and sample find below "\"ssl certificate\" authority key"
//Fact.find({$text:{$search: "head \"headache\"" }},{id:1,_id:0}, function(err, data) {

//var searchStr="\""+"head"+"\""+"headache";
  
})

/*var reduce = function(key, values) {
                var outs={ firstname:null , lastname:null , department:null}
                values.forEach(function(v){
                    if(outs.firstname ==null){
                        outs.firstname = v.firstname
                    }
                    if(outs.lastname ==null){
                        outs.lastname = v.lastname
                    }
                    if(outs.department ==null){
                        outs.department = v.department
                    }
                     
                });
                return outs;
            };*/

   // Fact.find({ "fact": "Race"}, function(err, user) {
//User.findById(req.params.email,function(err,user){
//if(err) res.send(err);
//returing that user only
//console.log(user);
//res.json(user);
//});


// facts.find({ "fact": req.params.symptom}, function(err, user) {
// //User.findById(req.params.email,function(err,user){
// if(err) res.send(err);
// //returing that user only
// console.log(user);
// res.json(user);
// });

//sendemail

apiRouter.route('/sendemail')

 .post(function(req, res) {
var email="test@gmail.com";
//'57180996415faebf1ae8cf24'
  User.find({"email":"test@gmail.com"}, function(error, users) {

 if(error){
            console.log(error);
        }else{
            console.log(users);            
              }

 // return the users
 console.log("outside");
 console.log(users.email);
 res.json(users);
})
 
/*telCarrier = TelCarrier.create({
  service: "data24-7.com"
, username: "sindhura"
, password: "sindhu77"
});

telCarrier.lookup('4796573469', function (err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log('data');
    console.log(data.smsGateway);
  }
var sendtextto=data.smsGateway;


//var sendto = req.body.email;

var sendto = data.smsGateway;
console.log("send text to" +sendto);
//var sendto='6692478234@tmomail.net';
//var sendto='4796573469@txt.att.net';
  
    //create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sindhurav18790@gmail.com',
            pass: 'Sindhu@7'
        }
    });

    
    var mailOptions = {
        from: 'Sindhu<sindhurav18790@gmail.com>', // sender address
        to: sendto, // list of receivers
        subject: 'Emergencyyyy!', // Subject line
        text: 'Testing my code', // plaintext body
        html: '<b>hahaha</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);            
              }
                transporter.close(); 
    });

    });
     });*/
    })

//bookappointment

apiRouter.route('/bookappointment')

 .post(function(req, res) {
console.log("inside book app server.js");
  var fname=req.body.fname;
  var lname=req.body.lname;
  var email=req.body.email;
  var visitregarding=req.body.visitregarding;
  var month=req.body.month;
  var day=req.body.day;
  var time=req.body.time;
  var msg=req.body.msg;
  var docname="mediclick";
  console.log(time);
//var text= "You are recieving this email from Mediclick."
var sendtodoctor="vallabhanenisindhura85@gmail.com";
var todoctor= "You are recieving this email because you have registered with mediclick's schedule appointment service."+" "+ fname+" "+lname+" "+" has scheduled and appointment with you on" + " "+ month+ " "+day+" "+ "at" + time +" "+ "Users Message: "+msg;
 var sendtouser ="sindhura.vallabhaneni@sjsu.edu";
 var touser= "Thank you for scheduling your doctor's appointment through mediclick. Please find the details of your appointment. "+ "Docname" + docname + "Appointment Time: " +  + " "+ month+ " "+day+" "+ "at" + time +" " + "Make you you arrive on time";
//create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sindhurav18790@gmail.com',
            pass: 'Sindhu@7'
        }
    });

    
    var mailOptions = {
        from: 'Sindhu<sindhurav18790@gmail.com>', // sender address
        to: sendtouser, // list of receivers
        subject: 'Confirmation of your appointment!', // Subject line
        text: touser
        
       // html: '<b>second line</b><br>'

    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);            
              }
               // transporter.close(); 
    });

    var mailOptions = {
        from: 'Sindhu<sindhurav18790@gmail.com>', // sender address
        to: sendtodoctor, // list of receivers
        subject: 'Regading an appointment!', // Subject line
        text: todoctor
        
       // html: '<b>second line</b><br>'

    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);            
              }
                transporter.close(); 
    });

    res.json("Appointment scheduled!");

})
 


function responseCheck(error, response) {
    if (error === null) {
      

      textapi.entities({
    'text': response.text
  }, function(err,resdata){


   
      console.log("In response block method2")
      console.log(resdata);
      //res.json(response);

  });

      console.log('functruion response',response);
      console.log("In response block method")
      console.log(response);
        //res.json(response);
    }
  };
   

apiRouter.route('/textapi')
  .get(function(req,res){
  // console.log('Kovid Testing');
  // console.log(req.body);
  // console.log(req.body.data);
  // //console.log(req.params);
  //Unable to get the req.body.data from code level
  // var text=req.body.data;
   console.log('Dev Testing API Results');
  //console.log(text);
  var text="cold and head ache";
  textapi.entities({
    'text': text
  }, function(error,response){
    if(error){
      res.json(error);
    }
    else{
      res.json(response);
    }
    
  });

  })
//database3
app.listen(port);
console.log('listening to port' +port);
//setting public folder
