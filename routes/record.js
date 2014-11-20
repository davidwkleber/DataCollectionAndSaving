
//
// module for recording and saving data measurements
//


var express = require('express');
var router = express.Router();
var io = require('socket.io');


// middleware specific to this route, logs timestamps
router.use(function timeLog(req, res, next){
	console.log('record Time: ', Date.now());
	next();
})

// define the home page route
router.get('/', function(req, res){
console.log('record get');
 	res.redirect('index');
})

router.post('/', function(req, res, next){

console.log('record post');


})

router.put('/', function(req, res, next){
	var spinnerValue = req.body.value;
	res.seeValue = req.body.value;
	res.redirect('index');
})
		var recordedData;
		var recordsocket;

router.recordData =  function(req, res, next){
	
		var recordDataItem;
		
		
			console.log('record');
			recordedData = [];
			var recordsocket = io.connect('http://127.0.0.1:1337');

			recordsocket.on('connect', function (data) {
					console.log('record client connected ');
					console.log('record connected data ' + data);
			
				
					recordsocket.on('updateData', function (data) {
					//	console.log('record update raw: ' + data);
						recoreDataItem = JSON.parse(data);
						console.log('record updateData  ' + recordDataItem.power);
						recordedData.push(data);
					});	
			
				
			});	
		
};

router.stopRecording = function () {
			console.log('stop recording');
		//	recordsocket.disconnect();
};
		
router.saveData = 	function () {
			console.log('save data');
			console.log('recorded data saved: '+recordedData);
			recordedData = [];
};

router.get('/about', function(req, res){
	res.send('record About page');
})

module.exports = router;

	