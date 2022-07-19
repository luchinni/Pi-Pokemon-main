const { Router } = require("express");
const router = Router();
const { getAllTypes } = require("../controllers/types_controller")


router.get("/", getAllTypes)

module.exports = router;