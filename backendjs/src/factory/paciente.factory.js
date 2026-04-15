const PacienteRepository = require("../respositories/paciente.repository");
const PacienteService = require("../services/paciente.service");
const db = require("../database/knex");

const repo = new PacienteRepository(db);
const service = new PacienteService(repo);

module.exports = service;
