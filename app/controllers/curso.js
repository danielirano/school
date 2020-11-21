const curso = require("../models/curso");

module.exports = function(app){
    /// cria a variável que vai conter as funções da controller
    var controller = {};
    // cria variável que irá acessar a model
    var curso = app.models.curso;

    // cria a função de cadastrar Curso
    controller.salvarCurso = function(req, res) {
        curso.create(req.body).then(
            function(curso) {
                res.status(201).json(curso);
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    }
     // função que retorna os cursos cadastrados
     controller.listaCursos = function(req, res) {
        // executa um find para retornar os cursos
        curso.find().exec().then(
            //em caso de sucesso
            function(cursos) {
                res.status(200).json(cursos);
            },
            //em caso de erro
            function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    }

    // atualiza cursos já cadastrados
    controller.alteraCurso = function(req, res) {
        var _id = req.body._id;
        curso.findByIdAndUpdate(_id, req.body).exec().then(
            function(curso) {
                res.status(200).json(curso);
            }, function(erro) {
               console.error(erro);
               res.status(500).json(erro);
            }
        );
    }
    // remove cursos cadastrados
    controller.removeCurso = function(req, res) {
            var _id = req.params.id;
            curso.remove({"_id": _id}).exec().then(
                //em caso de sucesso
                function(curso) {
                    res.status(204).end();
                },
                //em caso de erro
                function(erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
            );
        }
    //Retorna somente um curso
    controller.obtemCurso = function(req, res) {
        var _id = req.params.id;
        curso.findById(_id).exec().then(
            //sucesso
            function(curso) {
                if(!curso) {
                    res.status(404).end();
                }
                else {
                    res.status(200).json(curso);
                }
            }, 
            //erro
            function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    }        

    return controller;
}    