// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.connect('localhost:27017/test');
mongoose.createConnection('mongodb://sindhura:sindhu@ds019480.mlab.com:19480/mediclick')
var schema=mongoose.schema;
 console.log("iam testing register inside detdieaseinfo.js");
 // user schema
var facts = new Schema({

 });

 // return the model
 module.exports = mongoose.model('facts', facts);