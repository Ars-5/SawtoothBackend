const mongoose = require('mongoose');
const { Schema } = mongoose;

const examenSchema = new Schema({
    dni: String,
    name: String,
    lastname: String,
    date: String,
    p1: String,
    p2: String,
    p3: String,
    p4: String,
    p5: String,
});


const Examen = mongoose.model('Examen', examenSchema);


module.exports = Examen;