
var http = require('http');

var fs = require('fs');

var path = require('path');

var mime = require('mime');

var SerialPort = require("serialport").SerialPort

var cache = {};

function send404(response) {
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Error 404: resource not found.');
	response.end();
}

function sendFile(response, filePath, fileContents) {
	response.writeHead(
		200,
		{"content-type": mime.lookup(path.basename(filePath))}
	);
	response.end(fileContents);
}

// Serve File, looking for cache version else read from disk
function serveStatic(response, cache, absPath) {

	// check if the file is in cache memory
	if (cache[absPath]) {

		// serve file from memory
		sendFile(response, absPath, cache[absPath]);
	} else {
		// File not in memory, check that it exists in file structure
		fs.exists(absPath, function(exists) {
			if (exists) {
				// read file from disk
				fs.readFile(absPath, function(err, data) {
					if (err) {
						send404(response);
					} else {
						// cache the file and serve it
						cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				});
			} else {
				send404(response);
			}
		});
	}
}

function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}

// create HTTP server using anonymous function to define behavior
var server = http.createServer(function(request, response) {
	var filePath = false;
	// if HTML file is root, server index.html
	// else serve file from public directory
	if (request.url == '/') {
		filePath = 'public/index.html';
	} else {
		filePath = 'public' + request.url;
	}
	var absPath = './' + filePath;

	serveStatic(response, cache, absPath);
});

// start the HTTP server
server.listen(3000, function() {
	console.log("Server listening on port 3000");
	//
	//
	//I did not know where to put the function calling. here it works. description is in the function
	serialListener(); 
});

// var chatServer = require('./lib/chat_server');
// chatServer.listen(server);

// var serialPort = new SerialPort('\\COM9' , { 
	// baudrate: 9600,
		 // dataBits: 8,
         // parity: 'none',
         // stopBits: 1,
         // flowControl: false
// });

// serialPort.on("open", function () {
	 // sleep(1000, function() {
   // // executes after one second, and blocks the thread
// });
	// serialPort.write('S', function(err, results) {
		// console.log('err ' + err);
		// console.log('results ' + results);
	// });
	
		// console.log('open');
	// serialPort.on('data', function(data) {
		// console.log('data received: ' + data);
	// });
// });

function serialListener()
{	//
	//
	//http://www.barryvandam.com/node-js-communicating-with-arduino/ 
	//copied from the server.js file
	var receivedData = "";
    var sendData = "";
    serialPortBlink = new SerialPort('COM3', {
        baudrate: 9600, 

    });
    
        serialPortADC = new SerialPort('COM6', {
        baudrate: 9600, 

    });
 
 
 
    serialPortBlink.on("open", function () {
		
		//
		//
		//My guess is, that the function sends to fast after the port opening. The uController is still in the reset stage
	
        sleep(2000, function() {
    // executes after two second, and blocks the thread, should be avoided. maybe we find another solution
    });

    serialPortBlink.write('r2x', function(err, results) {
        console.log('Blink_err ' + err);
        console.log('Blink_results ' + results);
    });

    
 
    //
    //
    //you need some kind of delay between the different write commands; 200 seems to be the minimum delay.
    
      sleep(200, function() {
    // executes after two second, and blocks the thread, should be avoided. maybe we find another solution
    });      
        
    serialPortBlink.write('r10x', function(err, results) {
    console.log('Blink_err ' + err);
    console.log('Blink_results ' + results);
    });
    


  }); 
 
 
 
 
    serialPortADC.on("open", function () {
		
		
		
		// My guess is, that the function sends to fast after the port opening. The uController is still in the reset stage
	
		sleep(2000, function() {
		// executes after two second, and blocks the thread, should be avoided. maybe we find another solution
		});

		serialPortADC.write('S', function(err, results) {
		console.log('ADC_err ' + err);
		console.log('ADC_results ' + results);        
        });
        
		// console.log('ADClog_open');
        
    //######Version one to receive data
        // serialPortADC.on('data', function(data) {
		// console.log('ADC_data received: ' + data);
        // });
        
    //######Version two to receive data with "x" as a delimiter 
    serialPortADC.on('data', function(data) {
         receivedData += data.toString();
      if (receivedData .indexOf('x') >= 0) {
       sendData = receivedData .substring(receivedData .indexOf('x') + 1) ;
       receivedData = '';
     }
     // // send the incoming data to browser with websockets.
   // socketServer.emit('update', sendData);
   
   console.log('ADC_data received: ' + sendData);
  }); 
    });  
    
    

}
