var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
  memberId: String,
  attendDate: { type: Date },
  donate: Number
});

var Event = mongoose.model('Event', EventSchema);

/* GET events page. */
router.get('/showListEvents', function(req, res, next) {
    console.log('enter showListEvents');
	res.render('events/eventList');
});

/* GET events list. */
router.post('/listEvents', function(req, res, next) {
    console.log('enter listEvents');
    var perPage = 10, page = req.body.pager.num > 1 ? req.body.pager.num-1 : 0;

    Event.find().limit(perPage).skip(perPage*page).exec(function (err, events) {
	      if (err) return console.error(err);
	      console.log(events);
	      var result = {"rows":events,"pager":{"num":req.body.pager.num,"count":1},"total":2};
	      res.json(result);
	    });
});


module.exports = router;