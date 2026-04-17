import { useEffect, useState } from "react";
import Button from "./ui/button/button";
import { Card, CardBody, CardFooter, CardHeader } from "./ui/card/card";
import { PACIENTES_API_URL, MEDICOS_API_URL } from "../config/api";

const FormCadastroMedico = () => {
  const [activeTab, setActiveTab] = useState("pacientes");
  const [pacienteForm, setPacienteForm] = useState({
    nome: "",
    dataNascimento: "",
    carteirinha: "",
    cpf: "",
  });
  const [medicoForm, setMedicoForm] = useState({
    nome: "",
    CRM: "",
    UFCRM: "",
  });

  const [pacientes, setPacientes] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPacientes = async () => {
    try {
      const response = await fetch(PACIENTES_API_URL);
      if (!response.ok) {
        throw new Error("Falha ao carregar pacientes");
      }
      const data = await response.json();
      setPacientes(data);
    } catch (_err) {
      if (activeTab === "pacientes") {
        setError("Erro ao listar pacientes");
      }
    }
  };

  const fetchMedicos = async () => {
    try {
      const response = await fetch(MEDICOS_API_URL);
      if (!response.ok) {
        throw new Error("Falha ao carregar medicos");
      }
      const data = await response.json();
      setMedicos(data);
    } catch (_err) {
      if (activeTab === "medicos") {
        setError("Erro ao listar medicos");
      }
    }
  };

  useEffect(() => {
    fetchPacientes();
    fetchMedicos();
  }, []);

  const handlePacienteChange = (event) => {
    const { name, value } = event.target;
    setPacienteForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleMedicoChange = (event) => {
    const { name, value } = event.target;
    setMedicoForm((previous) => ({ ...previous, [name]: value }));
  };

  const handlePacienteSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(PACIENTES_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pacienteForm),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error || "Falha ao cadastrar paciente");
      }

      setPacienteForm({
        nome: "",
        dataNascimento: "",
        carteirinha: "",
        cpf: "",
      });
      await fetchPacientes();
    } catch (err) {
      setError(err.message || "Erro ao listar pacientes");
    } finally {
      setLoading(false);
    }
  };

  const handleMedicoSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(MEDICOS_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(medicoForm),
      });

      if (!response.ok) {
        const body = await response.json();
        throw new Error(body.error || "Falha ao cadastrar medico");
      }

      setMedicoForm({
        nome: "",
        CRM: "",
        UFCRM: "",
      });
      await fetchMedicos();
    } catch (err) {
      setError(err.message || "Erro ao cadastrar medico");
    } finally {
      setLoading(false);
    }
  };

  const isPacientesView = activeTab === "pacientes";

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2>Registros</h2>
        <button
          className={isPacientesView ? "menu-item active" : "menu-item"}
          onClick={() => {
            setActiveTab("pacientes");
            setError("");
          }}
          type="button"
        >
          Pacientes
        </button>
        <button
          className={!isPacientesView ? "menu-item active" : "menu-item"}
          onClick={() => {
            setActiveTab("medicos");
            setError("");
          }}
          type="button"
        >
          Medicos
        </button>
      </aside>

      <Card>
        <CardHeader>
          {isPacientesView
            ? "Cadastro e Listagem de Pacientes"
            : "Cadastro e Listagem de Medicos"}
        </CardHeader>

        {isPacientesView ? (
          <form onSubmit={handlePacienteSubmit}>
            <CardBody>
              <div className="form-grid">
                <label>
                  Nome
                  <input
                    name="nome"
                    value={pacienteForm.nome}
                    onChange={(e) => {
                      const onlyLetters = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
                      handlePacienteChange({
                        target: {
                          name: "nome",
                          value: onlyLetters,
                        },
                      });
                    }}
                    required
                    type="text"
                    pattern="[A-Za-zÀ-ÿ\s]+"
                  />
                </label>

                <label>
                  Data de nascimento
                  <input
                    name="dataNascimento"
                    value={pacienteForm.dataNascimento}
                    onChange={handlePacienteChange}
                    required
                    type="date"
                  />
                </label>

                <label>
                  Carteirinha
                  <input
                    name="carteirinha"
                    value={pacienteForm.carteirinha}
                    onChange={(e) => {
                      const onlyNumbers = e.target.value.replace(/\D/g, "");
                      handlePacienteChange({
                        target: {
                          name: "carteirinha",
                          value: onlyNumbers,
                        },
                      });
                    }}
                    required
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </label>

                <label>
                  CPF
                  <input
                    name="cpf"
                    value={pacienteForm.cpf}
                    onChange={(e) => {
                      const onlyNumbers = e.target.value.replace(/\D/g, "");
                      handlePacienteChange({
                        target: {
                          name: "cpf",
                          value: onlyNumbers,
                        },
                      });
                    }}
                    required
                    maxLength={11}
                    minLength={11}
                    pattern="[0-9]{11}"
                    type="text"
                    inputMode="numeric"
                  />
                </label>
              </div>

              {error ? <p className="error-message">{error}</p> : null}

              <div className="list-header">
                <h3>Pacientes cadastrados</h3>
              </div>

              {pacientes.length === 0 ? (
                <p>Nenhum paciente encontrado.</p>
              ) : (
                <ul className="record-list">
                  {pacientes.map((paciente) => (
                    <li key={paciente.id}>
                      <strong>{paciente.nome}</strong>
                      <span>CPF: {paciente.cpf}</span>
                      <span>Carteirinha: {paciente.carteirinha}</span>
                      <span>Nascimento: {paciente.dataNascimento}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
            <CardFooter>
              <Button disabled={loading} type="submit">
                {loading ? "Cadastrando..." : "Cadastrar paciente"}
              </Button>
            </CardFooter>
          </form>
        ) : (
          <form onSubmit={handleMedicoSubmit}>
            <CardBody>
              <div className="form-grid">
                <label>
                  Nome
                  <input
                    name="nome"
                    value={medicoForm.nome}
                    onChange={(e) => {
                      const onlyLetters = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");

                      handleMedicoChange({
                        target: {
                          name: "nome",
                          value: onlyLetters,
                        },
                      });
                    }}
                    required
                    type="text"
                    pattern="[A-Za-zÀ-ÿ\s]+"
                  />
                </label>

                <label>
                  CRM
                  <input
                    name="CRM"
                    value={medicoForm.CRM}
                    onChange={(e) => {
                      const onlyNumbers = e.target.value.replace(/\D/g, "");
                      handleMedicoChange({
                        target: {
                          name: "CRM",
                          value: onlyNumbers,
                        },
                      });
                    }}
                    required
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </label>

                <div
                  style={{
                    width: "80px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <label
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    UFCRM
                  </label>

                  <select
                    name="UFCRM"
                    required
                    value={medicoForm.UFCRM}
                    onChange={handleMedicoChange}
                    style={{
                      padding: "0.75rem 1rem",
                      borderRadius: "12px",
                      backgroundColor: "#fff",
                      border: "1px solid #cbd5e1",
                      color: "#000",
                      textAlign: "center",
                      outline: "none",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">UF</option>

                    {[
                      "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
                      "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
                      "RS", "RO", "RR", "SC", "SP", "SE", "TO"
                    ].map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {error ? <p className="error-message">{error}</p> : null}

              <div className="list-header">
                <h3>Medicos cadastrados</h3>
              </div>

              {medicos.length === 0 ? (
                <p>Nenhum medico encontrado.</p>
              ) : (
                <ul className="record-list">
                  {medicos.map((medico) => (
                    <li key={medico.id}>
                      <strong>{medico.nome}</strong>
                      <span>CRM: {medico.CRM}</span>
                      <span>UFCRM: {medico.UFCRM}</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardBody>
            <CardFooter>
              <Button disabled={loading} type="submit">
                {loading ? "Cadastrando..." : "Cadastrar medico"}
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
};

export default FormCadastroMedico;
