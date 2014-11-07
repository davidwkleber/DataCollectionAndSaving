
module.exports = serialListener;

var SerialPort = require("serialport").SerialPort

   serialPortBlink = new SerialPort('COM12', {
        baudrate: 9600, 

    });
    
    //    serialPortADC = new SerialPort('COM9', {
    //    baudrate: 9600, 

   // });

function sleep(time, callback) {
// serialListener.prototype.sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
};



function serialListener()
{	//
	//
	//http://www.barryvandam.com/node-js-communicating-with-arduino/ 
	//copied from the server.js file
	var receivedData = "";
    var sendData = "";
	var delimiter = "\n";
 
 
 
 
    serialPortBlink.on("open", function () {
		console.log('serialListener.serialPortBlink.on Open');
		//
		//
		//My guess is, that the function sends to fast after the port opening. The uController is still in the reset stage
	
        sleep(2000, function() {
    // executes after two second, and blocks the thread, should be avoided. maybe we find another solution
    });

    /* 
	serialPortBlink.write('r2x', function(err, results) {
        console.log('Blink_err ' + err);
        console.log('Blink_results ' + results);
    });
	*/

    
 
    //
    //
    //you need some kind of delay between the different write commands; 200 seems to be the minimum delay.
    
      sleep(200, function() {
    // executes after two second, and blocks the thread, should be avoided. maybe we find another solution
    });      
       /* 
    serialPortBlink.write('r10x', function(err, results) {
    console.log('Blink_err ' + err);
    console.log('Blink_results ' + results);
    });
    */


  }); 
 
 
 
 
    serialPortADC.on("open", function () {
		
		
		
		// My guess is, that the function sends to fast after the port opening. The uController is still in the reset stage
	
		sleep(2000, function() {
		// executes after two second, and blocks the thread, should be avoided. maybe we find another solution
		});
/*
		serialPortADC.write('S', function(err, results) {
		console.log('ADC_err ' + err);
		console.log('ADC_results ' + results);        
        });
*/  
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
    
    


};


serialListener.doSomething = function() {
	console.log('serialListener.doSomething here');
	//	serialPortBlink.write('r2x', function(err, results) {
    //    console.log('Blink_err ' + err);
    //    console.log('Blink_results ' + results);
    // });
};

serialListener.write = function( id, value ) {

	console.log('serialListener.write  here');
	if( id === 'w' ) {
	serialPortBlink.write(value, function(err, results) {
        console.log('Blink_err ' + err);
        console.log('Blink_results ' + results);
    });
	} else {
		serialPortBlink.write(id+value+delimiter, function(err, results) {
        console.log('Blink_err ' + err);
        console.log('Blink_results ' + results);
    });
	};
};

