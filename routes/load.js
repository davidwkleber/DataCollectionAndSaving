//
// module for setting Load 
//
var serialListener = require('../lib/serialListener');

var express = require('express');
var router = express.Router();

// middleware specific to this route, logs timestamps
router.use(function timeLog(req, res, next){
	console.log('load Time: ', Date.now());
	next();
})

// define the home page route
router.get('/', function(req, res){
console.log('load get');
 	res.redirect('index');
})

router.post('/', function(req, res, next){
console.log('load post');
	var spinnerValue = req.body.loadSliderValue;
	// res.render('load', {seeValue: spinnerValue });
	res.render('index', {title: 'Wind Lab', load_seeValue: spinnerValue });
	serialListener.write('g', spinnerValue + serialListener.delimiter);

})

router.put('/', function(req, res, next){
	var spinnerValue = req.body.value;
	res.load_seeValue = req.body.value;
	res.redirect('index');
})

router.get('/about', function(req, res){
	res.send('load About page');
})

module.exports = router;

	