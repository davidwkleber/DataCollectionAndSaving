
//
// module for setting Wind Speed of the wind fan
//
var DIserialListener = require('../serialListener');

DIserialListener('COM6');


var express = require('express');
var router = express.Router();

var http = require('http');
var httpServer = http.createServer();
var io = require('socket.io').listen(http);

	
httpServer.listen(3001);

console.log('setup connection now');

io.on('connection', function(socket){

  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
	io.on('sliderval', function(data) {
		console.log('DataInput : '+data);
	});
		io.on('update', function(data) {
		console.log('DataInput UPDATE: '+data);
	});
		io.emit('update', {
			dataSource: "somethig",
			dataInputData: "something else"
		});
// middleware specific to this route, logs timestamps
router.use(function timeLog(req, res, next){
	console.log('dataInput Time: ', Date.now());
	next();
})

// define the home page route
router.get('/', function(req, res){
console.log('dataInput get');
 	res.redirect('index');
})

router.post('/', function(req, res, next){

console.log('dataInput post');

console.log('dataInput value in post is now: ', req.param('dataInputValue', null));
	var dataInputValue = req.param('dataInputValue', null);
	console.log('dataInput value retrieved is : '+dataInputValue);
	if (dataInputValue == 'on') 
		var serialCall = 'AA'+ '\n';
	else var serialCall = 'S' + '\n';

	console.log('dataInput serialCall: '+serialCall);
	 	res.render('index', {title: 'Wind Lab', seeValue: dataInputValue }); 
	DIserialListener.write('DI', serialCall);

			console.log('dataInput serialCall done: '+serialCall);

})

router.put('/', function(req, res, next){
	var spinnerValue = req.body.value;
	res.seeValue = req.body.value;
	res.redirect('index');
})

router.get('/about', function(req, res){
	res.send('wind speed About page');
})

module.exports = router;

	