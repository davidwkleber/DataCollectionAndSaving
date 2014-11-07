
//
// module for recording and saving data measurements
//


var express = require('express');
var router = express.Router();

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

router.get('/about', function(req, res){
	res.send('record About page');
})

module.exports = router;

	