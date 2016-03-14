var express = require('express');
var router = express.Router();
var ProfileController = require('../controllers/ProfileController');
var PadController = require('../controllers/PadController');
var controllers = {
	'profile': ProfileController,
	'pad': PadController
}

function createErrorObject(msg){
	var error = {
		confirmation: 'fail',
		message: msg
	}

	return error;
}


router.post('/:resource', function(req, res, next) {
	var resource = req.params.resource;
	var controller = controllers[resource];
	if (controller == null){
		res.json(createErrorObject(resource+' is not a valid resource.'));
		return;
	}

	controller.post(req.body, function(err, result){
		if (err){
			res.json(createErrorObject(err.message));
			return;
		}

		if (resource == 'profile')
			req.session.user = result.id; // user logged in - install session to track:
		
		res.json({
			confirmation:'success',
			result: result
		});
		return;
	});

	
});

router.put('/:resource/:id', function(req, res, next) {
	var resource = req.params.resource;
	var controller = controllers[resource];
	if (controller == null){
		res.json(createErrorObject(resource+' is not a valid resource.'));
		return;
	}

	controller.put(req.params.id, req.body, function(err, result){
		if (err){
			res.json(createErrorObject(err.message));
			return;
		}

		res.json({
			confirmation: 'success',
			result: result
		});
		return;
	});

});


router.get('/:resource/:id', function(req, res, next) {
	var resource = req.params.resource;
	var controller = controllers[resource];
	if (controller == null){
		res.json(createErrorObject(resource+' is not a valid resource.'));
		return;
	}

	controller.getById(req.params.id, function(err, result) {
		if (err){
			res.json(createErrorObject(err.message));
			return;
		}

		res.json({
			confirmation:'success',
			result: result
		});
		return;
	});
});


router.get('/:resource', function(req, res, next) {
	var resource = req.params.resource;
	var controller = controllers[resource];
	if (controller == null){
		res.json(createErrorObject(resource+' is not a valid resource.'));
		return;
	}

	var raw = req.query.raw;
	if (raw == null)
		raw == 'no';
	
	var isRaw = (raw=='yes') ? true : false;
	delete req.query['raw'];

	controller.get(req.query, isRaw, function(err, results){
		if (err){
			res.json(createErrorObject(err.message));
			return;
		}

		res.json({
			confirmation:'success',
			results: results
		});
		return;
	});
});


module.exports = router;
