//
// module for setting Pitch Angle of the wind turbine blades
//

var PAserialListener = require('../serialListener');

// PAserialListener('COM7');

var express = require('express');
var router = express.Router();

pitchAngleValue = 1;

var lastPitchAngle = '0';

// middleware specific to this route, logs timestamps
router.use(function timeLog(req, res, next){
	console.log('pitchAngle Time: ', Date.now());
	next();
})

// define the home page route
router.get('/', function(req, res){
console.log('pitchAngle get');
 	res.redirect('/');
})


// Post handler for the PitchAngle
//
router.post('/', function(req, res, next){

	// deterine if the movement is forward or backwards, based upon the 
console.log('pitchAngle post');
	var forwardOrBack = 'F';
	var diffAngle = 0;
	var serialValue = 0;
	pitchAngleValue = req.param('pitchAngleValue', null);
		console.log('pitchAngleValue param in PA.js '+ req.param('pitchAngleValue', null));
		console.log('pitchAngleValue value  in PA.js '+ pitchAngleValue);
			console.log('? by Pitch Angle '+pitchAngleValue);
		console.log('? by last Pitch Angle '+lastPitchAngle);

	if (pitchAngleValue == "down" ) {
			forwardOrBack = 'F';
			serialValue = Math.floor(1000);
			pitchAngleValue = 0;
	} else if ( pitchAngleValue == "up" ) {
			forwardOrBack = 'B';
			serialValue = Math.floor(1000);
			pitchAngleValue = 0;
	} else 
	if ( +pitchAngleValue < +lastPitchAngle ) {
					console.log('F by Pitch Angle '+pitchAngleValue);
		console.log('F by last Pitch Angle '+lastPitchAngle);
		diffAngle = Math.abs(lastPitchAngle - pitchAngleValue);
		forwardOrBack = 'F';
		console.log('F by '+diffAngle);
		serialValue = Math.floor(diffAngle * 13.3);

	} else {
		forwardOrBack = 'B';
		diffAngle = Math.abs(pitchAngleValue-lastPitchAngle);
				console.log('B by Pitch Angle '+pitchAngleValue);
		console.log('B by last Pitch Angle '+lastPitchAngle);

		//diffAngle = lastPitchAngle - pitchAngleValue;;
		console.log('B by '+diffAngle);
		serialValue = Math.floor(diffAngle * 13.3);
	}
	
	console.log('lastPitchAngle in PA.js '+lastPitchAngle);
	console.log('pitchAngleValue in PA.js '+pitchAngleValue);
	console.log('diff angle: '+diffAngle);
	console.log('Set the value to in PA.js '+serialValue);
console.log('serialValue '+serialValue);
	// This is for the real wind tower
	var setPAValue = forwardOrBack+serialValue;
		

	// test the Pitch Control, 3 times.
// var setPAValue = 'T3';
	
	// this is for the test rig board, y for the yellow light.
	// PAserialListener.write('y', spinnerValue + serialListener.delimiter);
	
	PAserialListener.write('PA', setPAValue);
	lastPitchAngle = pitchAngleValue;
	// res.body.PAcurrentAngle = PAcurrentAngle;
	res.render('index', {title: 'Wind Labor', PAcurrentAngle: lastPitchAngle });
})

router.put('/', function(req, res, next){
	var spinnerValue = req.body.value;
	res.seeValue = req.body.value;
	res.redirect('/');
})

router.get('/about', function(req, res){
	res.send('About page');
})

module.exports = router;

	