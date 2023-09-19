const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    mail: String,
    name: String,
    lastname: String,
    dni: String,
    phone: String,
    password: String,
    privateKey: String,
    publicKey: String,
    faculty: String,
    modality: String,
});


const User = mongoose.model('User', userSchema);


module.exports = User;