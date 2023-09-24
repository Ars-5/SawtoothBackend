const mongoose = require('mongoose');
const { Schema } = mongoose;

const ListaSchema = new Schema({
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


const Lista = mongoose.model('Lista', ListaSchema);


module.exports = Lista;