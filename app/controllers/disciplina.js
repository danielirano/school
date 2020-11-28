const disciplina = require("../models/disciplina");

module.exports = function(app){
    /// cria a variável que vai conter as funções da controller
    var controller = {};
    // cria variável que irá acessar a model
    var disciplina = app.models.disciplina;

    // cria a função de cadastrar disciplina
    controller.salvarDisciplina = function(req, res) {
        disciplina.create(req.body).then(
            function(disciplina) {
                res.status(201).json(disciplina);
            }, function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    }
     // função que retorna os disciplinaes cadastrados
     controller.listaDisciplinas = function(req, res) {
        // executa um find para retornar os disciplinaes
        disciplina.find().populate('curso').populate('professor').exec().then(
            //em caso de sucesso
            function(disciplinas) {
                const response = disciplinas.map(dis => { // metado map ele percorre o array e organiza seus atributos.
                    return {
                     id: dis._id,
                      nome: dis.nome,
                      ativo: dis.ativo,
                      cargaHoraria: dis.cargaHoraria,
                      valorMensalidade: dis.valorMensalidade,
                      professor: {
                          id: dis.professor._id,
                          nome: dis.professor.nome,
                          ativo: dis.professor.ativo,
                          email: dis.professor.email,
                          dataNascimento: dis.professor.dataNascimento,
                      },
                      curso:{
                          id: dis.curso._id,
                          nome: dis.curso.nome,
                          ativo: dis.curso.ativo,
                          cargaHoraria: dis.curso.cargaHoraria,
                          valorMensalidade: dis.curso.valorMensalidade,
                      },
                    }
                  })
                res.status(200).json(response);
            },
            //em caso de erro
            function(erro) {
                console.error(erro);
                res.status(500).json(erro);
            }
        );
    }

    // atualiza disciplinaes já cadastrados
    controller.alteraDisciplina = function(req, res) {
        var _id = req.body._id;
        disciplina.findByIdAndUpdate(_id, req.body).exec().then(
            function(disciplina) {
                res.status(200).json(disciplina);
            }, function(erro) {
               console.error(erro);
               res.status(500).json(erro);
            }
        );
    }
    // remove disciplinaes cadastrados
    controller.removeDisciplina = function(req, res) {
            var _id = req.params.id;
            disciplina.remove({"_id": _id}).exec().then(
                //em caso de sucesso
                function(disciplina) {
                    res.status(204).end();
                },
                //em caso de erro
                function(erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
            );
        }
    //Retorna somente um disciplina
    controller.obtemDisciplina = function(req, res) {
        var _id = req.params.id;
        disciplina.findById(_id).populate('curso').populate('professor').exec().then(
            //sucesso
            function(disciplina) {
                if(!disciplina) {
                    res.status(404).end();
                }
                else {
                    const response = {
                        id: disciplina._id,
                        nome: disciplina.nome,
                        ativo: disciplina.ativo,
                        cargaHoraria: disciplina.cargaHoraria,
                        valorMensalidade: disciplina.valorMensalidade,
                        professor: {
                            id: disciplina.professor._id,
                            nome: disciplina.professor.nome,
                            ativo: disciplina.professor.ativo,
                            email: disciplina.professor.email,
                            dataNascimento: disciplina.professor.dataNascimento,
                        },
                        curso:{
                            id: disciplina.curso._id,
                            nome: disciplina.curso.nome,
                            ativo: disciplina.curso.ativo,
                            cargaHoraria: disciplina.curso.cargaHoraria,
                            valorMensalidade: disciplina.curso.valorMensalidade,
                        },
                    }

                    res.status(200).json(response);
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