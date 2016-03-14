var Pad = require('../models/Pad');

module.exports = {

	get: function(params, isRaw, completion){
		Pad.find(params, function(err, pads){
			if (err){
				completion(err, null);
				return;
			}

			if (isRaw == true){
				completion(null, pads);
				return;
			}

			var list = [];
			for (var i=0; i<pads.length; i++){
				var pad = pads[i];
				list.push(pad.summary());
			}

			completion(null, list);
		});
	},

	getById: function(id, completion){
		Pad.findById(id, function(err, pad){
			if (err){
				completion({
					message:'Pad '+id+' not found'
				}, null);

				return;
			}

			if (pad == null){
				completion({
					message:'Pad '+id+' not found'
				}, null);

				return;
			}

			completion(null, pad.summary());
		});
	},

	post: function(params, completion){
		Pad.create(params, function(err, pad){
			if (err){
				completion(err, null);
				return;
			}

			completion(null, pad.summary());
			return;
		});
	},

	put: function(id, params, completion){
		Pad.findByIdAndUpdate(id, params, {new:true}, function(err, pad){
			if (err){
				completion(err, null);
				return;
			}

			completion(null, pad.summary());
		});
	}


}