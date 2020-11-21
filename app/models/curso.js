var mongoose = require('mongoose');
module.exports = function () {
    var schema = mongoose.Schema({

        nome: {
            type: String,
            required: true
        },
        ativo: {
            type: Boolean,
            required: false,
            default: true
        },
        cargaHoraria: {
            type: Number,
            required: true,
            min: [this.cargaHoraria >= 400 || this.cargaHoraria <= 1200],
            default: 400
        },
        valorMensalidade: {
            type: Number,
            required: true,
            min: [this.valorMensalidade >= 99 || this.valorMensalidade <= 399]
        },
        created: {
            type: Date,
            default: Date.now,
            required: false
        },
    }); 

    return mongoose.model('curso', schema);
}