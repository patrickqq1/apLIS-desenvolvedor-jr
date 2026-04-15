const pacienteSchema = require("../models/paciente");

class PacienteService {
  constructor(pacienteRepository) {
    this.pacienteRepository = pacienteRepository;
  }

  async create(paciente) {
    const validatedPaciente = pacienteSchema.safeParse(paciente);
    if (!validatedPaciente.success) {
      const error = new Error("Dados do paciente invalidos");
      error.status = 400;
      error.details = validatedPaciente.error.flatten();
      throw error;
    }

    const existingPaciente = await this.pacienteRepository.findByCpf(
      validatedPaciente.data.cpf,
    );

    if (existingPaciente) {
      const error = new Error("Paciente com este CPF ja existe");
      error.status = 409;
      throw error;
    }

    console.log({
      ...validatedPaciente.data,
      data_nascimento: validatedPaciente.data.data_nascimento,
    });

    return await this.pacienteRepository.create({
      ...validatedPaciente.data,
    });
  }

  async findAll() {
    return await this.pacienteRepository.findAll();
  }
}

module.exports = PacienteService;
