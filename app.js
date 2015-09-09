var express = require('express');
var app = express();

var sleep = require('sleep');

var Gpio = require('onoff').Gpio,
  upButton = new Gpio(18, 'out'),
  downButton = new Gpio(24, 'in'),
  stopButton = new Gpio(14, 'out'),
  selectButton = new Gpio(23, 'out')

  //stopButton.writeSync(0);
  //upButton.writeSync(0);
  //downButton.writeSync(0);
  //selectButton.writeSync(0);

var standardButtonPress = 60000; //microseconds

app.get('/', function(req, res) {
  	res.type('text/plain');
  	res.send('');
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

	downButton.writeSync(1);
	sleep.usleep(standardButtonPress);
	downButton.writeSync(0);
   
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

  	downButton.writeSync(0);
  	downButton.unexport();

  	selectButton.writeSync(0);
  	selectButton.unexport();

  	process.exit();
}

process.on('SIGINT', exit);
