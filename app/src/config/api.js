const getNodeApiBaseUrl = (path) => {
  const baseUrl =
    import.meta.env.VITE_NODE_API_BASE_URL || "http://localhost:3000";
  return `${baseUrl}${path}`;
};

const getPHPApiBaseUrl = (path) => {
  const baseUrl =
    import.meta.env.VITE_PHP_API_BASE_URL || "http://localhost:8000";
  return `${baseUrl}${path}`;
};

export const PACIENTES_API_URL = getNodeApiBaseUrl("/api/v1/pacientes");
export const MEDICOS_API_URL = getPHPApiBaseUrl("/api/v1/medicos");
