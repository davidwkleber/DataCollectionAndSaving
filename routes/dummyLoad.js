//
// module for setting Wind Speed of the wind fan
//
var DLserialListener = require('../serialListener');

// DLserialListener('COM3');


var express = require('express');
var router = express.Router();

// middleware specific to this route, logs timestamps
router.use(function timeLog(req, res, next){
	console.log('dummyLoad Time: ', Date.now());
	next();
})

// define the home page route
router.get('/', function(req, res){
console.log('dummyLoad get');
 	res.redirect('index');
})

router.post('/', function(req, res, next){

console.log('dummyLoad post');
console.log('dummyLoad value in post: ', req.param('dummyLoadValue', null));
	var dummyLoadValue = req.param('dummyLoadValue', null);
	var serialCallValue = Math.floor((dummyLoadValue-1)*5);
	
		console.log(' rounded dummy load: '+serialCallValue);
	if( serialCallValue < 0 ) {
		serialCallValue = 0;
	} else if ( serialCallValue > 1000 ) {
		serialCallValue = 1000;
	}
	console.log('dummyLoad serialCallValue: '+serialCallValue);

	var serialCall = 'I' + serialCallValue + '\n';

		console.log('dummyLoad serialCall: '+serialCall);
		res.render('index', {title: 'Dummy Load', seeValue: dummyLoadValue });
 
			console.log('dummyLoad rendered index: '+dummyLoadValue);

	DLserialListener.write('DL', serialCall);
	
			console.log('dummyLoad serialCall done: '+serialCall);

   
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

	