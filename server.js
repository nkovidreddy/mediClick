var fs = require('fs');
var express=require('express');
var app=express();
var path=require('path');
var bodyParser = require('body-parser'); // get body-parser
var morgan = require('morgan'); // used to see requests
var mongoose = require('mongoose'); // for working w/ our database
var nodemailer = require('nodemailer'); //nodemailer
var transporter = nodemailer.createTransport(); //create transport
var TelCarrier = require('tel-carrier'); //telcarrier
var sanitize = require('mongo-sanitize');
var bcrypt = require('bcrypt-nodejs');
var http = require("http");
var sendgrid = require("sendgrid")("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");
var postmark = require("postmark");
var client = new postmark.Client("c3b13ea0-3d65-4176-9478-f6f31fddf21b");
//var https = require("https");
var credentials = {
   key  : fs.readFileSync('server.key'),
   cert : fs.readFileSync('server.crt')
};

var methodOverride = require('method-override');
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


var _ = require('underscore');

var port=process.env.PORT || 3000;


//var portHttp=process.env.PORT || 8888;



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

// configure our app to handle CORS requests
 app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \
 Authorization');
// if(req.headers['x-forwarded-proto']!='https')
//     res.redirect('https://mediclick.herokuapp.com');
 next();
 });

 app.use(morgan('dev'));
 

 // REGISTER OUR ROUTES -------------------------------
 // all of our routes will be prefixed with /api
app.use('/api', apiRouter);

console.log(__dirname);

app.use(express.static(__dirname+'/'));


//Setup one route to index.html file

// app.get('*',function(req,res,next){
//   if(req.headers['x-forwarded-proto']!='https')
//     res.redirect('https://mediclick.herokuapp.com');
//   else
//     next(); /* Continue to other routes if we're not redirecting */
// });
 
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

app.get('/Remedies/:id/:conName',function(req,res){
 	res.sendFile(path.join(__dirname+'/views/Rem.html'))
});

app.get('/gmaps/:streetaddr',function(req,res){
 	//res.send('index',{title:'hey',message:'Hello there!'});
 	res.sendFile(path.join(__dirname+'/views/gmaps.html'))
 	//next();
 });

app.get('/pharm',function(req,res){

  res.sendFile(path.join(__dirname+'/views/pharm.html'))
 
 });

app.get('/about',function(req,res){

  res.sendFile(path.join(__dirname+'/views/about.html'))
 
 });
app.get('/calorie',function(req,res){

  res.sendFile(path.join(__dirname+'/views/cal.html'))
 
 });
//database
apiRouter.route('/users')

 // create a user (accessed at POST http://localhost:8080/api/users)
 .post(function(req, res) {

 // create a new instance of the User model
 var user = new User();

 // set the users information (comes from the request)
// console.log(req.body);
 user.email = sanitize(req.body.email);
 console.log(user.email);

 user.password = sanitize(req.body.password);
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

var hashPhone = bcrypt.hashSync(req.body.phone);
var hashAddr = bcrypt.hashSync(req.body.address);
 
  var email=sanitize(req.params.email);
  console.log("testing inside sindhuupdate"+email);
//var user = new User();
 var fname = sanitize(req.body.fname);
 var lname = sanitize(req.body.lname);
 var bday=sanitize(req.body.bday);
 var gender=sanitize(req.body.gender);
 var zipcode=sanitize(req.body.zipcode);
//var query = { email: 'sindhu@gmail.com' };
//User.findOneAndUpdate(query, { email: 'tested@gmail.com' }, options, callback)



var conditions = { email: email };
//var update = { $set: {fname: "sindhu",lname:"vallabhaneni"}};
var update = { $set: {fname: fname,lname:lname,bday:bday,gender:gender,phone:hashPhone,address:hashAddr,zipcode:zipcode}};

var options = { upsert: true };

User.update(conditions, update, options, callback);
function callback (err, numAffected) {
  // numAffected is the number of updated documents
  //console.log("Playing");
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
User.find({ "email": sanitize(req.params.email)},{email: 1,password: 1, fname: 1, lname: 1, notify:1, eemail1:1 , eemail2: 1, elname1:1, elname2: 1, efname1: 1, efname2:1, phone:1}, function(err, user) {
var result;
console.log(user);
// if(user != null)
// {

 var emptyObj=[];
 var boolValEmail=_.isEqual(user, emptyObj);
 console.log(boolValEmail);

if(boolValEmail){
   result = "User does not exist!";
  //res.json("User does not exist!");     
  console.log(result);
   console.log(user);
}


// if(user[0].email != req.params.email)
// {
//   result = "User does not exist!";
//   //res.json("User does not exist!");     
//   console.log(result);
//    console.log(user);
// }
//}
// var pwd=req.params.password;
// var hash = user[0].password;
else if((!(bcrypt.compareSync(req.params.password, user[0].password))))
{
  result = "Incorrect Password!!";
  console.log(result);
}

//console.log(bcrypt.compareSync(pwd, hash));
else
{
  result = user;
   console.log(result);
}
console.log("final result"+result);
res.json(result);
});
})


//sindhuupdate2
apiRouter.route('/users/:email/:medical/:info')

.put(function(req, res) {
  var email=sanitize(req.params.email);
  console.log("testing inside sindhuupdate22222"+email);
//var user = new User();
 var medicalConditions = sanitize(req.body.conditions);
 console.log(medicalConditions);
 var pregnancy = sanitize(req.body.pregnancy);
 var addiction=sanitize(req.body.addiction);
 var lastVisit=sanitize(req.body.lastVisit);
 var visitReason=sanitize(req.body.visitReason);

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
  var email=sanitize(req.params.email);
  console.log("testing inside emergency sindhu"+email);
//var user = new User();
    var efname1=sanitize(req.body.efname1);
    var elname1=sanitize(req.body.elname1);
    var eemail1=sanitize(req.body.eemail1);
    var efname2=sanitize(req.body.efname2);
    var elname2=sanitize(req.body.elname2);
    var eemail2=sanitize(req.body.eemail2);
    var notify=sanitize(req.body.notify);

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
userinfo.fname=sanitize(req.body.fname);
userinfo.lname=sanitize(req.body.lname);
userinfo.bday=sanitize(req.body.bday);
userinfo.gender=sanitize(req.body.gender);
userinfo.phone=sanitize(req.body.phone);
userinfo.address=sanitize(req.body.address);
userinfo.zipcode=sanitize(req.body.zipcode);

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

  //This webservice is used as only part of testing and the below get function is used for dynamice response
  console.log("Calling Disease Info API");
  //Fetch user entered symptom input text box
  console.log("Requested Body Part");
  console.log(req.body);
  

  //Applying Concept Extraction //Test webservice to test sample text
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
  
  var bodypartVal=sanitize(req.params.bodypart);
  var specbodypartVal=sanitize(req.params.specbodypart);
  var symbodypartVal=sanitize(req.params.symptom);

  //Applying Concept Extraction
  var conceptString="";
  var text=symbodypartVal; 
  textapi.entities({
    'text': text
  }, function(error,response){
    if(error){
      res.json(error);
    }
    else{
      var empty={};
      text=response;
      console.log(text);
      var entitiesObj=text.entities;
      var boolVal=_.isEqual(entitiesObj, empty);

      //Building Query
      var query = {};
      var query2 = {};
      var query3 = {};
      
      query["$or"]=[];


      if(boolVal){
     
       conceptString=text.text; 
       var textUser = conceptString;
       textUser=textUser.split(/[ ,]+/).filter(Boolean);
       console.log("in if condition");
       console.log(textUser.length);
       var textLen = textUser.length;
       for(inp=0;inp<textLen;inp++){
        query2["$and"]=[];
        query2["$and"].push({description:{$regex:textUser[inp]}});
        //query2["$and"].push({description:{$regex:bodypartVal}});
        query2["$and"].push({description:{$regex:specbodypartVal}});
        query["$or"].push(query2);
       }
       
          


           /*Sankirthi -Query using regex



query["date_created"]="whatever";

     db.facts.find({
     '$or' : [
         { 
             '$and' :[
             {
                 description:
                 {
                     $regex :'migraine'
                  }
              },
              {
                  description:
                  {
                      $regex :'head'
                  }
              },
              {
                  description:
                  {
                      $regex :'headache'
                  }
              }
              ]
          }
     ]
    }).count()

     */
        /* Kovid Changes Test for Query String Dynamically
         var searchString={};
         searchString["$or"]=[];
         var arraySymptoms=[]; */
       //var test1 = "/.*"+symbodypartVal+".*/";
       //arraySymptoms.push({"description":test1});
       //searchString["$or"].push({"$and":arraySymptoms});
       /* Kovid Changes */
      }else{
        console.log("In else condition");
        textKeywords = text.entities.keyword;
      var textLength=text.entities.keyword.length;
      for(var con=0;con<textLength;con++){
        //conceptString=conceptString+" "+textKeywords[con];
        query2["$and"]=[];
        query2["$and"].push({description:{$regex:textKeywords[con]}});
        //query2["$and"].push({description:{$regex:bodypartVal}});
        query2["$and"].push({description:{$regex:specbodypartVal}});
        query["$or"].push(query2);
        }
        
      }

     //Kovid Changes - Dynamic Search 
    // conceptStringFinal=bodypartVal+" "+specbodypartVal+" "+conceptString;
    // console.log("concept string" +conceptString);
    // console.log(" conceptStringFinal" +conceptStringFinal);
  
    //Comment Below for other execution

   
 //   var searchStr="\""+bodypartVal+"\""+" "+conceptString+"\""+specbodypartVal+"\"";

     var searchStr=""+conceptString+"\""+specbodypartVal+"\"";
    
    
    /* 
      Test for building query string dynamically
      //console.log("Search String" +searchStr);
      //Fact.find(JSON.stringify(searchString), function(err, data) {
      
    */

    /*Sample DB Query to be sent:*/
    // db.facts.find({
    //  '$or' : [
    //      { '$and' :[{description:/.*migraine.*/},{'description':/.*head.*/},{'description':/.*headache.*/}]},
    //      { '$and' :[{description:/.*fever.*/},{'description':/.*head.*/},{'description':/.*headache.*/}]},
    //       { '$and' :[{description:/.*cold.*/},{'description':/.*head.*/},{'description':/.*headache.*/}]}
    //  ]
    // }).count()
    /* End of Sample DB Query */



    //Comment below for new execution and add a new line



// query3["description"].push({$regex:'migraine'});
// query3["description"].push({$regex:'head'});
// query3["description"].push({$regex:'headache'});

// query2["$and"].push({description:{$regex:'migraine'}});
// query2["$and"].push({description:{$regex:'head'}});
// query2["$and"].push({description:{$regex:'headache'}});
// query["$or"].push(query2);
console.log(JSON.stringify(query));
   // Fact.find({$text:{$search: searchStr}},{id:1,_id:0}, function(err, data) {
    Fact.find(query, function(err, data) {
     if(err){
      console.log(err);
     } 
     
     callback1(data);

    // res.json(data);
    });
    function callback1(data,err){
      if(err){
        console.log(err);
      }else{
        var values=[];
        var dataLen=data.length;
        console.log("Results Count=" +dataLen);
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
         Disease.find(diseaseQuery,{name:1,id:1,_id:0},function(err, conditions) {
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

apiRouter.route('/conditions')

.get(function(req,res){

})


apiRouter.route('/conditions/:idVal')

.get(function(req,res){
  var idFact = sanitize(req.params.idVal);
  console.log(idFact);
  idFact=parseInt(idFact);
  console.log(idFact);
  Fact.find({"id":idFact},{fact:1,description:1,_id:0},function(error,condData){
    if(error){
      res.json(error);
    }else{
      res.json(condData);
    }

  })
  
})




apiRouter.route('/sendemail')

 .post(function(req, res) {
console.log("inside sendemail");
var email=sanitize(req.body.email);
var fname=sanitize(req.body.fname);
var notify=sanitize(req.body.notify);
var email1=sanitize(req.body.email1);
var sendtextto;
var sendtextto2;
 User.find({"email":email}, function(error, users) {
 if(error){
            console.log(error);
        }else{
            console.log(users);            
              }

 // return the users
 console.log("outside");
 console.log(users.email);
 console.log(users[0].email);
 var sendvia = users[0].notify;
 var phone = users[0].elname1;
 var eemail1 = users[0].eemail1;
 var phone2 = users[0].elname2;
 var eemail2 = users[0].eemail2;
 console.log(sendvia);
 //res.json(users);

 if(sendvia == 'Text')
 {
  telCarrier = TelCarrier.create({
  service: "data24-7.com",
  username: "sachutun",
  password: "Iwonttell3"
});
  console.error("before going to telcarrier lookup");
  telCarrier.lookup(phone, function (err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log('data');
    console.log(data.smsGateway);
     sendtextto=data.smsGateway;
console.log(sendtextto);
  }

     //create reusable transporter object using SMTP transport
//     var transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         host: 'smtp.gmail.com',
//         use_authentication: true,
//         auth: {
//             user: 'sindhurav18790@gmail.com',
//             pass: 'Sindhu@7'
//         }
        
//     });
// var mailOptions = {
//         from: 'Sindhu<sindhurav18790@gmail.com>', // sender address
//         to: sendtextto, // list of receivers
//         subject: 'Emergencyyyy!', // Subject line
//         text: 'Testing my code', // plaintext body
//         html: '<b>Emergency Alert!!! Please attend!</b>' // html body
//     };
//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, function(error, info){
//         if(error){
//             console.log(error);
//         }else{
//             console.log('Message sent: ' + info.response);            
//               }
//     transporter.close(); 
  
//     });
//var client = new postmark.Client("c3b13ea0-3d65-4176-9478-f6f31fddf21b");
console.log("postmark sindhu testing");
client.sendEmail({
    "From": "sindhura.vallabhaneni@sjsu.edu",
    "To": sendtextto,
    "Subject": "Emergencyyyy!",
    "TextBody": "Emergency Alert!!! Please attend!!",
    "Tag": "Emergency Alert"
}, function(error, success) {
    if(error) {
        console.error("Unable to send via postmark: " + error.message);
       return;
    }
    console.info("Sent to postmark for delivery");
    //res.json("in else success");
});
    })
  ///alert second contact via text
telCarrier.lookup(phone2, function (err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log('data');
    console.log(data.smsGateway);
     sendtextto2=data.smsGateway;
console.log(sendtextto2);
  }

//      //create reusable transporter object using SMTP transport
//     var transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         host: 'smtp.gmail.com',
//         use_authentication: true,
//         auth: {
//             user: 'sindhurav18790@gmail.com',
//             pass: 'Sindhu@7'
//         }
//     });
// var mailOptions = {
//         from: 'Sindhu<sindhurav18790@gmail.com>', // sender address
//         to: sendtextto2, // list of receivers
//         subject: 'Emergencyyyy!', // Subject line
//         text: 'Testing my code', // plaintext body
//         html: '<b>Emergency Alert!!! Please attend!</b>' // html body
//     };
//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, function(error, info){
//         if(error){
//             console.log(error);
//         }else{
//             console.log('Message sent: ' + info.response);            
//               }
//     transporter.close(); 
   
//     });
//var client = new postmark.Client("c3b13ea0-3d65-4176-9478-f6f31fddf21b");
console.log("postmark sindhu testing");
client.sendEmail({
    "From": "sindhura.vallabhaneni@sjsu.edu",
    "To": sendtextto2,
    "Subject": "Emergencyyyy!",
    "TextBody": "Emergency Alert!!! Please attend!!",
    "Tag": "Emergency Alert"
}, function(error, success) {
    if(error) {
        console.error("Unable to send via postmark: " + error.message);
       return;
    }
    console.info("Sent to postmark for delivery");
    //res.json("in else success");
});
    })
  res.json("in if success");
   ///alert second contact via text
}


else
{
  console.log("In Else Block");
   var sendemailto=eemail1+","+eemail2;
  console.log(sendemailto);
     //create reusable transporter object using SMTP transport
    // var transporter = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //         user: 'sindhurav18790@gmail.com',
    //         pass: 'Sindhu@7'
    //     }
    // });

    
    // var mailOptions = {
    //     from: 'Sindhu<sindhurav18790@gmail.com>', // sender address
    //     to: sendemailto, // list of receivers
    //     subject: 'Emergency!', // Subject line
    //     text: 'Testing my code', // plaintext body
    //     html: '<b>Emergency Alert!!! Please attend!</b>' // html body
    // };

    // // send mail with defined transport object
    // transporter.sendMail(mailOptions, function(error, info){
    //     if(error){
    //         console.log(error);
    //     }else{
    //         console.log('Message sent: ' + info.response);            
    //           }
    // transporter.close(); 
    // res.json("in else success");
    // });
// var email = new sendgrid.Email();

// email.addTo("vallabhanenisindhura85@gmail.com");
// email.setFrom("you@youremail.com");
// email.setSubject("Sending with SendGrid is Fun");
// email.setHtml("and easy to do anywhere, even with Node.js");

// sendgrid.send(email);
// res.json("in else success");



// Example request


//var client = new postmark.Client("c3b13ea0-3d65-4176-9478-f6f31fddf21b");
console.log("postmark sindhu testing");
client.sendEmail({
    "From": "sindhura.vallabhaneni@sjsu.edu",
    "To": sendemailto,
    "Subject": "Emergencyyyy!",
    "TextBody": "Emergency Alert!!! Please attend!!",
    "Tag": "Emergency Alert"
}, function(error, success) {
    if(error) {
        console.error("Unable to send via postmark: " + error.message);
       return;
    }
    console.info("Sent to postmark for delivery");
    res.json("in else success");
});
     }
  })
})
 

//bookappointment

apiRouter.route('/bookappointment')

 .post(function(req, res) {
console.log("inside book app server.js");
  var fname=sanitize(req.body.fname);
  var lname=sanitize(req.body.lname);
  var email=sanitize(req.body.email);
  var visitregarding=sanitize(req.body.visitregarding);
  var month=sanitize(req.body.month);
  var day=sanitize(req.body.day);
  var time=sanitize(req.body.time);
  var msg=sanitize(req.body.msg);
  var docname="mediclick";
  console.log(time);
//var text= "You are recieving this email from Mediclick."
var sendtodoctor="vallabhanenisindhura85@gmail.com";
var todoctor= "You are recieving this email because you have registered with mediclick's schedule appointment service."+" "+ fname+" "+lname+" "+" has scheduled and appointment with you on" + " "+ month+ " "+day+" "+ "at" + time +" "+ "Users Message: "+msg;
 var sendtouser =email;
 var touser= "Thank you for scheduling your doctor's appointment through mediclick. Please find the details of your appointment. "+ "Docname" + docname + "Appointment Time: " +  + " "+ month+ " "+day+" "+ "at" + time +" " + "Make you you arrive on time";



console.log("postmark sindhu testing");
client.sendEmail({
    "From": "sindhura.vallabhaneni@sjsu.edu",
    "To": sendtouser,
    "Subject": "Confirmation of your appointment!",
    "TextBody": touser,
    "Tag": "Emergency Alert"
}, function(error, success) {
    if(error) {
        console.error("Unable to send via postmark: " + error.message);
       return;
    }
    console.info("Sent to postmark for delivery");
    //res.json("in else success");
});


// //create reusable transporter object using SMTP transport
//     var transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: 'sindhurav18790@gmail.com',
//             pass: 'Sindhu@7'
//         }
//     });

    
//     var mailOptions = {
//         from: 'Sindhu<sindhurav18790@gmail.com>', // sender address
//         to: sendtouser, // list of receivers
//         subject: 'Confirmation of your appointment!', // Subject line
//         text: touser
        
//        // html: '<b>second line</b><br>'

//     };

//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, function(error, info){
//         if(error){
//             console.log(error);
//         }else{
//             console.log('Message sent: ' + info.response);            
//               }
//                // transporter.close(); 
//     });

    // var mailOptions = {
    //     from: 'Sindhu<sindhurav18790@gmail.com>', // sender address
    //     to: sendtodoctor, // list of receivers
    //     subject: 'Regading an appointment!', // Subject line
    //     text: todoctor
        
    //    // html: '<b>second line</b><br>'

    // };

    // // send mail with defined transport object
    // transporter.sendMail(mailOptions, function(error, info){
    //     if(error){
    //         console.log(error);
    //     }else{
    //         console.log('Message sent: ' + info.response);            
    //           }
    //             transporter.close(); 
    // });

    client.sendEmail({
    "From": "sindhura.vallabhaneni@sjsu.edu",
    "To": sendtodoctor,
    "Subject": "Regading an appointment!",
    "TextBody": todoctor,
    "Tag": "Emergency Alert"
}, function(error, success) {
    if(error) {
        console.error("Unable to send via postmark: " + error.message);
       return;
    }
    console.info("Sent to postmark for delivery");
    //res.json("in else success");
});

    res.json("Appointment scheduled!");

})
 



   
//As a part of testing web service with sample input
apiRouter.route('/textapi')
  .get(function(req,res){

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

//var httpServer = http.createServer(app);
// var httpsServer = https.createServer(credentials, app);

// //httpServer.listen(portHttp);
// httpsServer.listen(port);

// https.createServer(credentials, app).listen(port, function () {
//    console.log('Started!');
// });
console.log('listening to port' +port);
//setting public folder
