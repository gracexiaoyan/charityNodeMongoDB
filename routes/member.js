var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var MemberSchema = new mongoose.Schema({
  name: String,
  sex: String,
  birthday: { type: Date },
  phone: String,
  cellphone: String,
  email: String,
  cardId: String,
  note: String,
  isMember: String,
  address: String,
  company: String,
  modifyDate: { type: Date, default: Date.now }
});

var Member = mongoose.model('Member', MemberSchema);

/* GET list page. */
router.get('/showListMembers', function(req, res, next) {
    console.log('enter showListMembers');
	  res.render('membership/memberList');
});

/* GET list. */
router.post('/listMembers', function(req, res, next) {
    console.log('enter listMembers');
    var con = {};
    if(req.body.conditions){
    	for (prop in req.body.conditions) {
            con[prop]=new RegExp(req.body.conditions[prop]);
        }
    }
    
    var perPage = 10, page = req.body.pager.num > 1 ? req.body.pager.num-1 : 0;
  	Member.find(con).limit(perPage).skip(perPage*page).sort({"modifyDate":"desc"}).exec(function (err, memberList) {
  		Member.count(con).exec(function (err, count) {
  			// console.log(memberList);
  			if (err) return console.error(err);
  			var pages = Math.ceil(count / perPage);
  			var result = {"rows":memberList,"pager":{"num":req.body.pager.num,"count":pages},"total":count};
              res.json(result);
      });
  	});
});

/* find members by conditions without pager */
router.post('/listMembersWithoutPage', function(req, res, next) {
    console.log('enter listMembersWithoutPage');
    var con = {};
    if(req.body.conditions){
      for (prop in req.body.conditions) {
            con[prop]=new RegExp(req.body.conditions[prop]);
        }
    }
    
    Member.find(con).exec(function (err, memberList) {
      if (err) return console.error(err);
      res.json(memberList);
    });
});

/* and or update a member. */
router.post('/addMember', function(req, res, next) {
    console.log('enter addMember');
    // check if the member has been existed
    Member.count({cellphone:/req.body.cellphone/i}, function(err, count) {
    	if (err){
      	  return next(err);
        } 
        if(count > 0){
        	console.log("exist");
        	res.json("exist");
        }
        else{
        	Member.create(req.body, function (err, post) {
  		      if (err){
  		      	return next(err);
  		      } 
  		      
  		      res.json("success");
  		    });
        }
    });
    
});

/* get member by id */
router.get('/:id', function(req, res, next) {
    console.log('enter getMember. id:' + req.params.id);
    Member.findById(req.params.id, function (err, post) {
	    if (err) return next(err);
	    res.json(post);
    });
});

/* update member by id */
router.put('/:id', function(req, res, next) {
    console.log('enter update Member. id:' + req.params.id);
    Member.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json("success");
    });
});

module.exports = router;