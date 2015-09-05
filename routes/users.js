var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res, next) {
	console.log('enter userlist');
	var db = req.db;
	db.on('error', console.error.bind(console, 'connection error:'));
	console.log('on db');
	db.once('open', function (callback) {
		console.log('open db');
	    var kittySchema = mongoose.Schema({
	        username: String,
	        email:String
	    });
	    var Kitten = mongoose.model('Kitten', kittySchema);

	    Kitten.find(function (err, kittens) {
	      if (err) return console.error(err);
	      console.log(kittens);
	      res.render('userList', {
	            "userlist" : kittens
	          });
	    });
  });

    // var collection = db.get('usercollection');
    // collection.find({},{},function(e,docs){
    // 	//res.render('myHtml');
    //     res.render('userList', {
    //         "userlist" : docs
    //     });
    // });
  //res.send('respond with a resource');
});

module.exports = router;
