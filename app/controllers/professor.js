const professor = require("../models/professor");

module.exports = function (app) {
    
    var controller = {};
   
    var professor = app.models.professor;

  
    controller.salvarProfessor = function (req, res) {
        professor.create(req.body).then(
            function (professor) {
                res.status(201).json(professor);
            }, function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    }
 
    controller.listaProfessores = function (req, res) {

        // executa um find para retornar os professores
        professor.find().exec().then(
            //em caso de sucesso
            function (professores) {
                const response = professores.map(prof => {
                    return {
                        id: prof._id,
                        nome: prof.nome,
                        ativo: prof.ativo,
                        email: prof.email,
                        dataNascimento: prof.dataNascimento
                    }
                })
                res.status(200).json(response);
            },
       
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    }


    controller.alteraProfessor = function (req, res) {
        var _id = req.body._id;
        professor.findByIdAndUpdate(_id, req.body).exec().then(
            function (professor) {
                res.status(200).json(professor);
            }, function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    }

    controller.removeProfessor = function (req, res) {
        var _id = req.params.id;
        professor.remove({ "_id": _id }).exec().then(
         
            function (professor) {
                res.status(204).end();
            },
           
            function (erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    }

    controller.obtemProfessor = function (req, res) {
        var _id = req.params.id;
        professor.findById(_id).exec().then(
            function (professor) {
                if (!professor) {
                    res.status(404).end();
                }
                else {
                    const response = {
                        id: professor._id,
                        nome: professor.nome,
                        ativo: professor.ativo,
                        email: professor.email,
                        dataNascimento: professor.dataNascimento
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
