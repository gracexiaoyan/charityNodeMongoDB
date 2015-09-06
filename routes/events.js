var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new mongoose.Schema({
  memberId: {type: Schema.Types.ObjectId, ref: 'Member'},
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
    var conEvent = {};
    var con = {};
    if(req.body.attendDate){
      var queryDate = new Date(req.body.attendDate);
      var startDate = new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate());
      var endDate = new Date(queryDate.getFullYear(), queryDate.getMonth(), queryDate.getDate()+1);
      con = { attendDate: { $gte: startDate,  $lte: endDate} };
    }

    var perPage = 10, page = req.body.pager.num > 1 ? req.body.pager.num-1 : 0;

    Event.find(con).populate('memberId').limit(perPage).skip(perPage*page).sort({"attendDate":"desc"}).exec(function (err, events) {
	      if (err) return console.error(err);
        Event.count(con).exec(function (err, count) {
          if (err) return console.error(err);
          var pages = Math.ceil(count / perPage);
          Event.aggregate([
              {$match: con},
              {$group: { _id: null, total: {$sum: '$donate'}}}
            ], function(err, sum){
              if(err) console.log(err);
              var result = {"rows":events,"pager":{"num":req.body.pager.num,"count":pages},"total":count,"amount":sum[0].total};
              res.json(result);
          });          
        });
	  });
});

/* add an event */
router.post('/addEvent', function(req, res, next) {
  console.log('enter addEvent');
  Event.create(req.body, function (err, post) {
    if (err){
      return next(err);
    } 
    res.json("success");
  });
});

/* get event by id */
router.get('/:id', function(req, res, next){
  console.log('enter get Event');
  Event.findOne({_id: req.params.id}).populate('memberId').exec(function(err, post) {
    if (err) return next(err);
    console.log(post);
    res.json(post);
  })
});

/* update event by id */
router.put('/:id', function(req, res, next) {
    console.log('enter update event. id:' + req.params.id);
    Event.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json("success");
    });
});

/* DELETE event by id */
router.delete('/:id', function(req, res, next) {
  Event.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;