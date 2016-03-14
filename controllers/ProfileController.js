var Profile = require('../models/Profile');
var bcrypt = require('bcrypt');

module.exports = {


	get: function(params, isRaw, completion){
		Profile.find(params, function(err, profiles){
			if (err){
				completion(err, null);
				return;
			}

			if (isRaw == true){
				completion(null, profiles);
				return;
			}

			var list = [];
			for (var i=0; i<profiles.length; i++){
				var profile = profiles[i];
				list.push(profile.summary());
			}

			completion(null, list);
		});
	},

	getById: function(id, completion){
		Profile.findById(id, function(err, profile){
			if (err){
				completion({
					message:'Profile '+id+' not found'
				}, null);

				return;
			}

			if (profile == null){
				completion({
					message:'Profile '+id+' not found'
				}, null);

				return;
			}

			completion(null, profile.summary());
		});
	},

	post: function(params, completion){

		// Hash the password:
		var plainTextPassword = params['password']; // 1234567
		var hashedPassword = bcrypt.hashSync(plainTextPassword, 10); // w3$rpfjaqpw3fr2134faw
		params['password'] = hashedPassword;


		Profile.create(params, function(err, profile){
			if (err){
				completion(err, null);
				return;
			}

			completion(null, profile.summary());
			return;
		});
	},

	put: function(id, params, completion){
		Profile.findByIdAndUpdate(id, params, {new:true}, function(err, profile){
			if (err){
				completion(err, null);
				return;
			}

			completion(null, profile.summary());
		});
	}


}