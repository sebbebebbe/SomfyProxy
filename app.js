var express = require('express');
var app = express();
var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var sleep = require('sleep');

var Gpio = require('onoff').Gpio,
  upButton = new Gpio(18, 'out'),
  downButton = new Gpio(24, 'in'),
  stopButton = new Gpio(14, 'out'),
  selectButton = new Gpio(23, 'out')

var standardButtonPress = 60000; //microseconds

var serialPort = new SerialPort("/dev/ttyUSB1", {
	baudrate: 9600,
	parser: serialport.parsers.readline("\n")
});

serialPort.on("open", function () {
	console.log('serial port open');
	serialPort.on('data', function (data) {
		console.log(data);
		var parameters = data.split(';')

		//these values are based on what i get from my Tellstick
		if(parameters[1] == '192')
		{
			up();
		}

		if(parameters[1] == '3')
		{
			down();
		}

		if(parameters[1] == '48')
		{
			stop();
		}

	});
});

app.get('/', function(req, res) {
  	res.type('text/plain');
  	res.send('');
});

app.post('/up', function(req, res) {
	res.type('text/plain');
  	res.send('going up');

	up();
});

app.post('/down', function(req, res) {
  	res.type('text/plain');
  	res.send('going down');

	down();

});

app.post('/stop', function(req, res) {
  	res.type('text/plain');
  	res.send('stopping');

	stop();

});

app.post('/select', function(req, res) {
  	res.type('text/plain');
  	res.send('changed channel');

	selectChannel();
});

function up() {
	upButton.writeSync(1);
	sleep.usleep(standardButtonPress);
	upButton.writeSync(0);
}

function stop() {
	stopButton.writeSync(1);
	sleep.usleep(standardButtonPress);
	stopButton.writeSync(0);
}

function down() {
	downButton.writeSync(1);
	sleep.usleep(standardButtonPress);
	downButton.writeSync(0);
}

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
