// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.connect('localhost:27017/test');
mongoose.createConnection('mongodb://sindhura:sindhu@ds019480.mlab.com:19480/mediclick')
var schema=mongoose.schema;
 console.log("iam testing register inside personalinfo.js");
 // user schema
 var personalinfoSchema = new Schema({
 fname: {type: String},
 lname: {type: String},
 bday: {type: String},
 gender: {type: String},
 phone: {type: String},
 address: {type: String},
 zipcode: {type: String}
 });

 
 console.log("iam testing register inside personalinfo.js 1");
 // hash the password before the user is saved
 personalinfoSchema.pre('save', function(next) {
 console.log("In save function personalinfo"); 	
 next();
 });

 
 //closing db connection
//mongoose.connection.close();
 // return the model
 module.exports = mongoose.model('Personalinfo', personalinfoSchema);