// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// mongoose.connect('localhost:27017/test');
mongoose.createConnection('mongodb://sindhura:sindhu@ds019480.mlab.com:19480/mediclick')
var schema=mongoose.schema;
 console.log("inside personalinfo.js");
 // user schema
 var personalinfo = new Schema({
 fname: String,
 lname: String,
 bday: String,
 gender: String,
 phone: String,
 address: String,
 zipcode: String

// email: { type: String, required: true, index: { unique: true }},
 });


 personalinfo.pre('save', function(err) {
 console.log("inside personalinfo.js save function");	
  //var personalinfo = this;
 if (err) {
 	console.log(err);
 	}
 console.log('entered info');
 //return next();
 });

 // return the model
 module.exports = mongoose.model('personalinfo', personalinfo);