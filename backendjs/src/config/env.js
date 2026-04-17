const z = require("zod");

/*
  Precisa carregar o env-file no comando de start: "dev": "nodemon src/server.js --env-file .env"
  Sem fazer isso sempre vai carregar dos valores "default" do zod
*/

const env = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("3000"),
  CORS_ORIGIN: z.string().default("*"),
  DATABASE_HOST: z.string().default("localhost"),
  DATABASE_PORT: z.string().default("3306"),
  DATABASE_USER: z.string().default("mysql"),
  DATABASE_PASSWORD: z.string().default("root"),
  DATABASE_NAME: z.string().default("aplis"),
});

const config = env.parse(process.env);

module.exports = { config };
