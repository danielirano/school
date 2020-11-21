module.exports = function (app) {
    var controller = app.controllers.curso;
    // post - envia dados para o servidor cadastrar algo
    app.post('/cursos', controller.salvarCurso);
    app.get('/cursos', controller.listaCursos);
    app.get('/cursos/:id', controller.obtemCurso);
    // Sempre que tiver : na rota, sabemos que é um parametro
    app.put('/cursos', controller.alteraCurso);
    app.delete('/cursos/:id', controller.removeCurso);
}