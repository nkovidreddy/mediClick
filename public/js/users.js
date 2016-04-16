// grab the packages that we need for the user model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// mongoose.connect('localhost:27017/test');
//mongoose.connect('mongodb://sindhura:sindhu@ds019480.mlab.com:19480/mediclick')
mongoose.createConnection('mongodb://sindhura:sindhu@ds019480.mlab.com:19480/mediclick')
var schema=mongoose.schema;
 console.log("iam testing register inside users.js");
 // user schema
 var UserSchema = new Schema({
 //name: String,
 email: { type: String, required: true, index: { unique: true }},
 password: { type: String, required: true, select: false }
 });
 console.log("iam testing register inside users.js 1");
 // hash the password before the user is saved
 UserSchema.pre('save', function(next) {
 	
 var user = this;

 // hash the password only if the password has been changed or user is new
 if (!user.isModified('password')) return next();
 // generate the hash
  bcrypt.hash(user.password, null, null, function(err, hash) {
  if (err) return next(err);

 // // change the password to the hashed version
 user.password = hash;
  next();
  });

 });

 // method to compare a given password with the database hash
 UserSchema.methods.comparePassword = function(password) {
 var user = this;

 return bcrypt.compareSync(password, user.password);
 };
 //closing db connection
//mongoose.connection.close();
 // return the model
 module.exports = mongoose.model('User', UserSchema);