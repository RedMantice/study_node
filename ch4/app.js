var express = require('express');
var jade = require('jade');

var app = express();

app.get("/",function(req,res){
  res.render('index.jade');
});

app.listen(1235);
console.log('Server running at http://127.0.0.1:1235');
