class PacienteRepository {
  constructor(db) {
    this.db = db;
  }

  toCamelCase(paciente) {
    if (!paciente) return paciente;
    const { data_nascimento, ...rest } = paciente;
    return {
      ...rest,
      dataNascimento: data_nascimento,
    };
  }

  async create(paciente) {
    const [id] = await this.db("pacientes").insert(paciente);
    const result = { id, ...paciente };
    return this.toCamelCase(result);
  }

  async findAll() {
    const rows = await this.db("pacientes").select("*");
    return rows.map((row) => this.toCamelCase(row));
  }

  async findByCpf(cpf) {
    const row = await this.db("pacientes").where({ cpf }).first();
    return this.toCamelCase(row);
  }
}

module.exports = PacienteRepository;
