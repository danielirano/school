const curso = require("../models/curso");

module.exports = function (app) {
    
    var controller = {};
    
    var curso = app.models.curso;

    
    controller.salvarCurso = function (req, res) {
        curso.create(req.body).then(
            function (curso) {
                res.status(201).json(curso);
            }, function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    }
    
    controller.listaCursos = function (req, res) {
    
        curso.find().exec().then(
    
            function (cursos) {
                const response = cursos.map(cur => { 
                    return {
                        id: cur._id,
                        nome: cur.nome,
                        ativo: cur.ativo,
                        cargaHoraria: cur.cargaHoraria,
                        valorMensalidade: cur.valorMensalidade,
                        create: cur.create
                    }
                })
                res.status(200).json(response);
            },
            //em caso de erro
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    }

    
    controller.alteraCurso = function (req, res) {
        var _id = req.body._id;
        curso.findByIdAndUpdate(_id, req.body).exec().then(
            function (curso) {
                res.status(200).json(curso);
            }, function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    }
    
    controller.removeCurso = function (req, res) {
        var _id = req.params.id;
        curso.remove({ "_id": _id }).exec().then(
            
            function (curso) {
                res.status(204).end();
            },
            //em caso de erro
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    }
    
    controller.obtemCurso = function (req, res) {
        var _id = req.params.id;
        curso.findById(_id).exec().then(
    
            function (curso) {
                if (!curso) {
                    res.status(404).end();
                }
                else {
                    const response = {
                        id: curso._id,
                        nome: curso.nome,
                        ativo: curso.ativo,
                        cargaHoraria: curso.cargaHoraria,
                        valorMensalidade: curso.valorMensalidade,
                        create: curso.create
                    }
                    res.status(200).json(response);
                }
            }, 
    
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    }

    return controller;
}    
