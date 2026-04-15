const { Router } = require("express");
const router = Router();

router.use("/pacientes", require("./pacientes"));

module.exports = router;
