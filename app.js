
var express = require('express');
var app = express();

var sleep = require('sleep');

//var pigpio = require("pi-gpio");

var Gpio = require('onoff').Gpio,
  upButton = new Gpio(18, 'out'),
  downButton = new Gpio(24, 'in'),
  stopButton = new Gpio(14, 'out'),
  selectButton = new Gpio(23, 'out')

  stopButton.writeSync(0);
  upButton.writeSync(0);
//  downButton.writeSync(0);
  selectButton.writeSync(0);

var standardButtonPress = 60000; //microseconds

app.post('/', function(req, res) {
  res.type('text/plain');
  res.send('SomfyProxy');
});

app.post('/up', function(req, res) {
  res.type('text/plain');
  res.send('going up');

upButton.writeSync(1);
sleep.usleep(standardButtonPress);
upButton.writeSync(0);
                  
});

app.post('/down', function(req, res) {
  res.type('text/plain');
  res.send('going down');

console.log('setting down to 1')
downButton.setDirection('out');
downButton.writeSync(1);
sleep.usleep(60000);
downButton.writeSync(0);
downButton.setDirection('in');

/*downButton.write(1,function(err){
	console.log(err);
	sleep.usleep(200000);
	downButton.write(0,function(err){
	console.log(err);
	});
});*/
//sleep.sleep(5);
//console.log('setting down to 0');
//downButton.writeSync(0);


//pigpio.open(8, "output", function(err) {     // Open pin 16 for output
//	console.log(err);
//         pigpio.write(8, 1, function() {        
//setTimeout(function(){pigpio.write(8, 0, function() { pigpio.close(8);},1000);
//  });
//});
//});
   
});

app.post('/stop', function(req, res) {
  res.type('text/plain');
  res.send('stopping');

stopButton.writeSync(1);
sleep.usleep(standardButtonPress);
stopButton.writeSync(0);

});

app.post('/select', function(req, res) {
  res.type('text/plain');
  res.send('changed channel');

selectChannel();
});


function selectChannel()
{
selectButton.writeSync(1);
sleep.sleep(2);
selectButton.writeSync(0);
}

app.listen(4747);

function exit() {
  stopButton.writeSync(0);
  stopButton.unexport();

  upButton.writeSync(0);
  upButton.unexport();

  //downButton.writeSync(0);
  //downButton.unexport();

  selectButton.writeSync(0);
  selectButton.unexport();

  process.exit();
}

process.on('SIGINT', exit);
