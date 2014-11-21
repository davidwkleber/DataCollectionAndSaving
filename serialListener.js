
module.exports = serialListener;

var app = require('./app');
var portConfig = require('./portConfig.json');

var serialport = require("serialport");
var SerialPort = serialport.SerialPort; // localize object constructor
// var SerialPort = require("serialport").SerialPort

console.log('ports '+ portConfig.stepper.port +" "+ portConfig.windSpeed.port + " " + portConfig.measurement.port);

   
   PAserialPort = new SerialPort(portConfig.stepper.port, {
 
		// test rig
		// baudrate: 9600,
		
		// wind tower
		baudrate: portConfig.stepper.baudrate,

	}, function (err) {
		if (err) console.log('Eroror opening Pitch Angle port: ' +  portConfig.stepper.port);
	});
	  
   WSserialPort = new SerialPort(portConfig.windSpeed.port, {
		baudrate: portConfig.windSpeed.baudrate,
	}, function (err) {
		if (err) console.log('Eroror opening Wind Speed port: ' +  portConfig.windSpeed.port);
	});
		
	DLserialPort = new SerialPort(portConfig.loadController.port, {
		baudrate: portConfig.loadController.baudrate,
	}, function (err) {
		if (err) console.log('Eroror opening dummy load  port: ' +  portConfig.loadController.port);
	});

	DIserialPort = new SerialPort(portConfig.measurement.port, {
		baudrate: portConfig.measurement.baudrate,
		parser: serialport.parsers.readline("EOL"),
	}, function (err) {
		if (err) console.log('Eroror opening measurement  port: ' +  portConfig.measurement.port);
	});


function sleep(time, callback) {
// serialListener.prototype.sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
};

var _comPort = '';

var socketServer;
var socketio = require('socket.io');
socketServer = socketio.listen(app, true);

function serialListener(ComPort)
{	//
	//
	//http://www.barryvandam.com/node-js-communicating-with-arduino/ 
	//copied from the server.js file
	var receivedData = "";
    var sendData = "";
	var delimiter = "\n";
	var comPort = ComPort;
	_comPort = comPort;
	
 console.log('serialListenerInit called with comPort:'+comPort);

var io = require('socket.io').listen(1337);


console.log('setup connection now');

io.sockets.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
	io.on('sliderval', function(data) {
		console.log('DataInput : '+data);
	});
		io.on('updateData', function(data) {
		console.log('DataInput UPDATE: '+data);
	});
		io.emit('updateData', {
			dataSource: "somethig",
			dataInputData: "something else \n"
		});

 	
 
   DIserialPort.on("open", function () {
		console.log('serialListener.DIserialPort.on Open ' + portConfig.measurement.port);

        sleep(2000, function() {
		});
	});
    WSserialPort.on("open", function () {
		console.log('serialListener.WSserialPort.on Open ' + portConfig.windSpeed.port);

		//
		//
		//My guess is, that the function sends to fast after the port opening. The uController is still in the reset stage
	
        sleep(2000, function() {
    // executes after two second, and blocks the thread, should be avoided. maybe we find another solution
		});
	});

	
    PAserialPort.on("open", function () {
		console.log('serialListener.PAserialPort.on Open ' + portConfig.stepper.port);
		//
		//
		//My guess is, that the function sends to fast after the port opening. The uController is still in the reset stage

        sleep(2000, function() {
    // executes after two second, and blocks the thread, should be avoided. maybe we find another solution
    });
	
	DLserialPort.on("open", function () {
		console.log('serialListener.DLserialPort.on Open ' + portConfig.loadController.port);
        sleep(2000, function() {
		});
	});
	
  }); 
 
 var sendData = '';
 var receivedData = '';
 var chunksIn = 0;
 
    DIserialPort.on('data', function(data) {
		chunksIn = chunksIn+1;
        receivedData += data.toString();

			var jsonOpened = receivedData.indexOf('{');
			var jsonClosed = receivedData.indexOf('}', jsonOpened);

		if( jsonClosed !== -1 && jsonOpened !== -1 ) {
			if ( jsonClosed > jsonOpened ) {
				sendData = receivedData.substring(jsonOpened, jsonClosed+1);
				receivedData = receivedData.substring(jsonClosed+2, receivedData.length);'';
				chunksIn = 0;
			}
		 }
         // send the incoming data to browser with websockets.
		if (sendData.length > 0 ) {
			var now = new Date();
			var formatNow = now.getDate()+"/"+(now.getMonth()+1)+"/"+now.getFullYear()+'\:'+now.getHours()+'\:'+now.getMinutes()+'\:'+now.getSeconds()+'\:'+now.getMilliseconds();
		
			//	console.log('SEND update data : '+sendData);
			var sendJSON = '{\n  \"date\": \"'+formatNow+'\",';
			sendJSON += sendData.substring(1, sendData.length-3);
			sendJSON += ",\n  \"windSpeed\": "+windSpeedValue+",\n";
			sendJSON += "  \"pitchAngle\": "+pitchAngleValue+",\n";
			sendJSON += "  \"dummyLoad\": "+dummyLoadValue+"\n";
			sendJSON += "}";
			
			// console.log( "serialListener send JSON : \n"+sendJSON);	

			io.emit('updateData', sendJSON);

			sendJSON = "";
			sendData = "";
			// console.log("in SerialListener: the wind speed: "+windSpeedValue);
			// console.log("in SerialListener: the pitch angle: "+pitchAngleValue);
			// console.log("in SerialListener: the dummy load: "+dummyLoadValue);


		};
	}); 
 
 
 
    WSserialPort.on('data', function(data) {
         receivedData += data.toString();
	}); 
    PAserialPort.on('data', function(data) {
         receivedData += data.toString();
	}); 
    DLserialPort.on('data', function(data) {
         receivedData += data.toString();
	}); 
   

};


serialListener.doSomething = function() {
	console.log('serialListener.doSomething here');
};

serialListener.write = function( id, value ) {

     sleep(200, function() {
    }); 
	
	console.log('serialListener write value: '+value);
	if( id === 'w' ) {
		WSserialPort.write(value, function(err, results) {
			console.log('Blink_err ' + err);
			console.log('Blink_results from windSpeed ' + results);
		});
	} else if (id === 'PA') {
		console.log('PAserialListener.write '+value);

		PAserialPort.write(value, function(err, results) {
			console.log('PitchAngle ' + err);
			console.log('PitchAngle ' + results);
		});
	} else if (id === 'DL') {
		console.log('DLserialListener.write '+value);

		DLserialPort.write(value, function(err, results) {
			console.log('loadController ' + err);
			console.log('loadController ' + results);
		});
	} else if (id === 'DI') {
		console.log('DIserialListener.write '+value);

		DIserialPort.write(value, function(err, results) {
			console.log('DI_err ' + err);
			console.log('DI_results ' + results);
		});
	} else {
		console.log('bad id '+id);
	};
	

};

