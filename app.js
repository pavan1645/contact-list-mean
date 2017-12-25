var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

//Connect MongoDB
mongoose.connect("mongodb://localhost/contacts", {
	useMongoClient: true
});

//on connection
mongoose.connection.on('connected',(err) => {
	console.log("connected to db");
});

mongoose.connection.on('error', (err) => {
	if(err){ console.log("err"); }	
});

//Port
const port = 3000;

//Adding middleware - cors
app.use(cors());

//body-parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'dist')));

//routes
app.use('/api', route);

//Listen
app.listen(process.env.PORT || port, ()=>{
	console.log("Server started at port "+port);
});