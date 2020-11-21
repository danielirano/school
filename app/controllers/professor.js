const professor = require("../models/professor");

module.exports = function(app){
    /// cria a variável que vai conter as funções da controller
    var controller = {};
    // cria variável que irá acessar a model
    var professor = app.models.professor;

    // cria a função de cadastrar professor
    controller.salvarProfessor = function(req, res) {
        professor.create(req.body).then(
            function(professor) {
                res.status(201).json(professor);
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    }
     // função que retorna os professores cadastrados
     controller.listaProfessores = function(req, res) {
        // executa um find para retornar os professores
        professor.find().exec().then(
            //em caso de sucesso
            function(professores) {
                res.status(200).json(professores);
            },
            //em caso de erro
            function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    }

    // atualiza professores já cadastrados
    controller.alteraProfessor = function(req, res) {
        var _id = req.body._id;
        professor.findByIdAndUpdate(_id, req.body).exec().then(
            function(professor) {
                res.status(200).json(professor);
            }, function(erro) {
               console.error(erro);
               res.status(500).json(erro);
            }
        );
    }
    // remove professores cadastrados
    controller.removeProfessor = function(req, res) {
            var _id = req.params.id;
            professor.remove({"_id": _id}).exec().then(
                //em caso de sucesso
                function(professor) {
                    res.status(204).end();
                },
                //em caso de erro
                function(erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
            );
        }
    //Retorna somente um professor
    controller.obtemProfessor = function(req, res) {
        var _id = req.params.id;
        professor.findById(_id).exec().then(
            //sucesso
            function(professor) {
                if(!professor) {
                    res.status(404).end();
                }
                else {
                    res.status(200).json(professor);
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