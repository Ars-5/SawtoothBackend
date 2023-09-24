const mongoose = require('mongoose');
const { Schema } = mongoose;

const docenteSchema = new Schema({
    mail: String,
    name: String,
    lastname: String,
    dni: String,
    phone: String,
    password: String,
    privateKey: String,
    publicKey: String,
    faculty: String,
});


const Docente = mongoose.model('Docente', docenteSchema);


module.exports = Docente;