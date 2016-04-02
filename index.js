
var express=require('express');
var app=express();
var path=require('path');

//var bodyParser=require('body-Parser');
//var mongoose=require('mongoose');

var port=process.env.PORT || 3000;

app.use(express.static(__dirname+'/'));

//Setup one route to index.html file
 app.get('/',function(req,res){
 	//res.send('index',{title:'hey',message:'Hello there!'});
 	res.sendFile(path.join(__dirname+'/views/index.html'))
 	//next();
 });
app.get('/',function(req,res){
 	//res.send('index',{title:'hey',message:'Hello there!'});
 	res.sendFile(path.join(__dirname+'/views/index.html'))
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

app.listen(port);
console.log('listening to port' +port);
//setting public folder
