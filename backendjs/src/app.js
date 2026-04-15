const { config } = require("./config/env");
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
require("dotenv").config();

const app = express();

app.use(
  express.json({
    limit: "10mb",
  }),
);
app.use(morgan(config.NODE_ENV === "production" ? "combined" : "dev"));
app.use(
  cors({
    origin: config.CORS_ORIGIN,
  }),
);

app.use("/api/v1", require("./routes"));

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.use((err, req, res, next) => {
  if (config.NODE_ENV !== "production") {
    console.error(err);
  }

  if (err.status) {
    return res.status(err.status).json({
      error: err.message,
      details: err.details,
    });
  }

  return res.status(500).json({ error: "Internal server error" });
});

module.exports = { app };
