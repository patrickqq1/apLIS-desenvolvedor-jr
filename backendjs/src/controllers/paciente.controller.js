const pacienteService = require("../services/paciente.service");
const PacienteRepository = require("../respositories/paciente.repository");
const db = require("../database/knex");

const pacienteRepository = new PacienteRepository(db);
const pacienteServiceInstance = new pacienteService(pacienteRepository);

class PacienteController {
  constructor(pacienteService) {
    this.pacienteService = pacienteService;
  }

  create = async (request, response) => {
    try {
      const paciente = await this.pacienteService.create({
        ...request.body,
        data_nascimento: request.body.dataNascimento,
      });
      return response.status(201).json({
        message: "Paciente criado com sucesso",
        data: paciente,
      });
    } catch (error) {
      const status = error.status || 500;
      return response.status(status).json({
        error: error.message || "Erro interno do servidor",
        details: error.details,
      });
    }
  };

  findAll = async (_request, response) => {
    try {
      const pacientes = await this.pacienteService.findAll();
      return response.status(200).json(pacientes);
    } catch (_error) {
      return response.status(500).json({ error: "Erro interno do servidor" });
    }
  };
}

module.exports = new PacienteController(pacienteServiceInstance);
