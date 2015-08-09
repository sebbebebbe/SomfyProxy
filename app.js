var express = require('express');
var app = express();

//var Gpio = require('onoff').Gpio,
  //upButton = new Gpio(27, 'out'),
  //downButton = new Gpio(15, 'out'),
  //stopButton = new Gpio(14,'out')

var gpio = require('pi-gpio');

var standardTimeout = 500;

app.get('/', function(req, res) {
  res.type('text/plain');
  res.send('SomfyProxy');
});

app.get('/up', function(req, res) {
  res.type('text/plain');
  res.send('going up');
//setTimeout(function (){  upButton.writeSync(1);
//},500);
//upButton.writeSync(0);                  
});

app.get('/down', function(req, res) {
  res.type('text/plain');
  res.send('going down');
//setTimeout(function() {
  //  downButton.writeSync(0);
//}, 100);

//setTimeout(function() {
  //  downButton.writeSync(1);
//}, standardTimeout);

//setTimeout(function() {
//    downButton.writeSync(0);
//}, 100);

});

app.get('/stop', function(req, res) {
  res.type('text/plain');
  res.send('stopping');

//setTimeout(function() {
//    stopButton.writeSync(0);
//}, 100);

//setTimeout(function() {
//    stopButton.writeSync(1);
//}, standardTimeout);

//setTimeout(function() {
//    stopButton.writeSync(0);
//}, 100);

setTimeout(function(){ 
 gpio.open(7, "output", function(err) { 
    gpio.write(7, 1, function() {         
        gpio.close(7);              
    });
})}
,500);

});

app.listen(4734);

function exit() {
  //stopButton.writeSync(0);
  //stopButton.unexport();
  process.exit();
}

process.on('SIGINT', exit);
