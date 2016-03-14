var mongoose = require('mongoose');

var ProfileSchema = new mongoose.Schema({
	firstName: {type:String, lowercase:true, trim:true, default:''},
	lastName: {type:String, lowercase:true, trim:true, default:''},
	city: {type:String, lowercase:true, trim:true, default:''},
	zip: {type:String, lowercase:true, trim:true, default:''},
	state: {type:String, lowercase:true, trim:true, default:''},
	email: {type:String, trim:true, default:''},
	password: {type:String, default:''}
});

ProfileSchema.methods.summary = function() {
	var profileDetails = {
		'firstName':this.firstName,
		'lastName':this.lastName,
		'city':this.city,
		'zip':this.zip,
		'state':this.state,
		'email':this.email,
		'id':this._id
	};
	
	return profileDetails;
};


module.exports = mongoose.model('ProfileSchema', ProfileSchema);