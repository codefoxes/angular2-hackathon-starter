var mongoose		= require('mongoose');
var optionSchema	= mongoose.Schema({
	key: String,
	value: String
});

module.exports		= mongoose.model('Option', optionSchema);
