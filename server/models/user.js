/**
 * Created by koyexes on 1/14/2017.
 */
var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    }
});

var User = mongoose.model('User', userSchema);

module.exports = {User};