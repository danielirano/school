var mongoose = require('mongoose');
module.exports = function () {
    var schema = mongoose.Schema({
        nome: {
            type: String,
            required: true
        },
        cargaHoraria: {
            type: Number,
            required: true,
            enum: [20,40,80],
            default: 20
        },
        professor: {
            type: mongoose.Schema.ObjectId,
            ref: 'professor',
            required: true
        },
        curso: {
            type: mongoose.Schema.ObjectId,
            ref: 'curso',
            required: true
        }
    });
    return mongoose.model('disciplina', schema);
}