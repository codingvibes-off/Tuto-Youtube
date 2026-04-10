var express = require('express');
var app = express();

app.use(express.static(__dirname + '/src'));

app.listen('2930');
console.log('App started: http://localhost:2930');