const mongoose = require('mongoose');
const { Schema } = mongoose;

const reporteSchema = new Schema({
    postulantes: [
        {
            name: {
                type: String,
                required: true
            },
            dni: {
                type: String,
                required: true
            },
            nota: {
                type: Number
            },
            estado: {
                type: String
            }
        }
    ]
});


const Reporte = mongoose.model('Reporte', reporteSchema);


module.exports = Reporte;