// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.connect('localhost:27017/test');
mongoose.createConnection('mongodb://sindhura:sindhu@ds019480.mlab.com:19480/mediclick')
var schema=mongoose.schema;
 console.log("iam testing register inside personalinfo.js");
 // user schema
<<<<<<< Updated upstream
 var personalinfoSchema = new Schema({
=======
 var personalinfoschema = new Schema({
>>>>>>> Stashed changes
 fname: {type: String},
 lname: {type: String},
 bday: {type: String},
 gender: {type: String},
 phone: {type: String},
 address: {type: String},
 zipcode: {type: String}
<<<<<<< Updated upstream
 });

 
 console.log("iam testing register inside personalinfo.js 1");
 // hash the password before the user is saved
 personalinfoSchema.pre('save', function(next) {
 console.log("In save function personalinfo"); 	
 next();
=======

// email: { type: String, required: true, index: { unique: true }},
 });


 personalinfoschema.pre('save', function(next) {
 console.log("inside personalinfo.js save function");	
  //var personalinfo = this;
 return next();
>>>>>>> Stashed changes
 });

 
 //closing db connection
//mongoose.connection.close();
 // return the model
<<<<<<< Updated upstream
 module.exports = mongoose.model('Personalinfo', personalinfoSchema);
=======
 module.exports = mongoose.model('Personalinfo', personalinfoschema);
>>>>>>> Stashed changes
