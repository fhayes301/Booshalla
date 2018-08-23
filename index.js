var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose')
var cors = require('cors');
var logger = require('morgan');
var bodyParser = require('body-parser');
var subscribersController = require('./controllers/subscribers_controller.js');
require('dotenv').config();

mongoose.connect(`mongodb://${process.env.MLAB_USERNAME}:${process.env.MLAB_PASSWORD}@ds229732.mlab.com:29732/booshalla`)
  .then(
  ()=>{
    console.log("connected to mongoDB")},
  (err)=>{
     console.log("err",err);
   })

app.use(express.static(path.join(__dirname, '/views')));

app.use(cors()); // for testing

app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies

app.use(bodyParser.json());
app.use(logger('dev'));
// app.use(cors({origin: "*"}))
app.use((req, res, next) => {
  const origin = req.get('origin');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


// viewed at localhost:8080
app.get('/', function(req,res) {
	res.sendFile(path.join(__dirname +'/views/index.html'))
});

app.get('/subscribers', subscribersController.read)
app.post('/subscribers', subscribersController.create)


app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message});
});

module.exports = app;

app.listen(process.env.PORT || 5000);
