var mongoose = require('mongoose');

var PadSchema = new mongoose.Schema({
	owner: {type:String, lowercase:true, trim:true, default:''},
	address: {type:String, lowercase:true, trim:true, default:''},
	city: {type:String, lowercase:true, trim:true, default:''},
	zip: {type:String, lowercase:true, trim:true, default:''},
	state: {type:String, lowercase:true, trim:true, default:''},
	rate: {type:Number, default: 0}
});

PadSchema.methods.summary = function() {
	var info = {
		'onwer':this.onwer,
		'address':this.address,
		'city':this.city,
		'zip':this.zip,
		'state':this.state,
		'rate':this.rate,
		'id':this._id
	};
	
	return info;
};


module.exports = mongoose.model('PadSchema', PadSchema);