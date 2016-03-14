var express = require('express');
var router = express.Router();
var ProfileController = require('../controllers/ProfileController');
var bcrypt = require('bcrypt');

function createErrorObject(msg){
	var error = {
		confirmation: 'fail',
		message: msg
	}

	return error;
}

router.get('/:action', function(req, res, next) {

	var action = req.params.action;
	if (action == 'logout'){
		req.session.reset();

		res.json({
			confirmation:'success',
			message:'BYE!'
		});
		return;
	}


	if (action == 'currentuser'){
		if (req.session == null){
			res.json(createErrorObject('User not logged in.'));
			return;
		}

		if (req.session.user == null){
			res.json(createErrorObject('User not logged in.'));
			return;
		}


		ProfileController.getById(req.session.user, function(err, result){
			if (err){
				res.json(createErrorObject(err.message));
				return;
			}

			res.json({
				confirmation:'success',
				currentuser: result
			});

			return;
		});

		return;
	}

	res.json({
		confirmation:'fail',
		message: 'Invalid Action: '+action
	});
});

router.post('/:action', function(req, res, next) {

	var action = req.params.action;
	if (action == 'login'){
		var loginCredentials = req.body;
		var email = loginCredentials.email.toLowerCase();

		// find the profile with that email:
		ProfileController.get({email:email}, true, function(err, results){
			if (err){
				res.json(createErrorObject(err.message));
				return;
			}

			if (results.length == 0){
				res.json(createErrorObject('User not found.'));
				return;				
			}

			var user = results[0]; // take most recent user

			var passwordCorrect = bcrypt.compareSync(loginCredentials.password, user.password);
			if (passwordCorrect == false){
				res.json(createErrorObject('Incorrect password'));
				return;
			}

			req.session.user = user._id; // user logged in - install session to track:

			res.json({
				confirmation:'success',
				profile: user.summary()
			});

			return;
		});

		return;
	}

	res.json({
		confirmation:'fail',
		message: 'Invalid Action: '+action
	});


});

module.exports = router;
