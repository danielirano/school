module.exports = function (app) {
    var controller = app.controllers.disciplina;
    // post - envia dados para o servidor cadastrar algo
    app.post('/disciplinas', controller.salvarDisciplina);
    app.get('/disciplinas', controller.listaDisciplinas);
    app.get('/disciplinas/:id', controller.obtemDisciplina);
    // Sempre que tiver : na rota, sabemos que é um parametro
    app.put('/disciplinas', controller.alteraDisciplina);
    app.delete('/disciplinas/:id', controller.removeDisciplina);
}