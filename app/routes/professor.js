module.exports = function (app) {
    var controller = app.controllers.professor;
    // post - envia dados para o servidor cadastrar algo
    app.post('/professores', controller.salvarProfessor);
    app.get('/professores', controller.listaProfessores);
    app.get('/professores/:id', controller.obtemProfessor);
    // Sempre que tiver : na rota, sabemos que é um parametro
    app.put('/professores', controller.alteraProfessor);
    app.delete('/professores/:id', controller.removeProfessor);
}