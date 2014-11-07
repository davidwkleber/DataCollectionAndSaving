

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
console.log('route index get ');
// console.log('index title: '+req.locals.title);
	res.render('index', { title: 'Wind Lab' });
 	// serialListener();
});

module.exports = router;
