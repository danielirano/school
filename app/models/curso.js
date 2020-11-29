var mongoose = require('mongoose');
module.exports = function () {
    var schema = mongoose.Schema({

        nome: {
            type: String,
            required: [true, 'O Campo Nome é Obrigatório!']
        },
        ativo: {
            type: Boolean,
            required: false,
            default: true
        },
        cargaHoraria: {
            type: Number,
            required: true,
            message: 'A Carga horária deve Maior que 400 ou Menor que 1200.',
            min: [this.cargaHoraria >= 400 || this.cargaHoraria <= 1200],
            default: 400
        },
        valorMensalidade: {
            type: Number,
            required: true,
            message: 'A Valor da Mensalidade deve ser Maior que 99 ou Menor que 399.',
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
