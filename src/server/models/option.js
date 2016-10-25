var mongoose		= require('mongoose');
var optionSchema	= mongoose.Schema({
	key: { type: String, required: true },
	value: String
});

module.exports		= mongoose.model('Option', optionSchema);
