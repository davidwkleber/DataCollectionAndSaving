//
// module for setting Wind Speed of the wind fan
//
var WSserialListener = require('../serialListener');

// WSserialListener('COM3');


var express = require('express');
var router = express.Router();

windSpeedValue = 0;

// middleware specific to this route, logs timestamps
router.use(function timeLog(req, res, next){
	console.log('windSpeed Time: ', Date.now());
	next();
})

// define the home page route
router.get('/', function(req, res){
console.log('windSpeed get');
 	res.redirect('index');
})

router.post('/', function(req, res, next){

console.log('windSpeed post');
console.log('windSpeed value in post: ', req.param('windSpeedValue', null));
	windSpeedValue = req.param('windSpeedValue', null);
	
	
	// var serialCallValue = Math.floor(windSpeedValue*0.625);
	var serialCallValue = Math.floor(windSpeedValue);
		console.log(' rounded wind speed: '+serialCallValue);

	if( serialCallValue < 0 ) {
		serialCallValue = 0;
	} else if ( serialCallValue > 100 ) {
		serialCallValue = 100;
	}
	console.log('windSpeed serialCallValue: '+serialCallValue);
	// for test rig, send r for blinkey light
//	var serialCall = 'r' + serialCallValue + 'x\n';
	// for real wind chamber fan, if %, start with F for forward and send % in delimeter
	var serialCall = 'F' + serialCallValue + '%\n';

		console.log('windSpeed serialCall: '+serialCall);
		res.render('index', {title: 'Wind Lab', seeValue: windSpeedValue });
 
			console.log('windSpeed rendered index: '+windSpeedValue);

	WSserialListener.write('w', serialCall);
	
			console.log('windSpeed serialCall done: '+serialCall);

   
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

	