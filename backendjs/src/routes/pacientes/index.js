const pacienteController = require("../../controllers/paciente.controller");

const router = require("express").Router();
router.get("/", pacienteController.findAll);
router.post("/", pacienteController.create);

module.exports = router;
