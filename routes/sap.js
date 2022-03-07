const express = require("express");
const router = express.Router();
const sapController = require("../controllers/sapController");

router.get('/',sapController.getAll)
router.post('/',sapController.create)
//router.postAll('/',sapController.postAll)

module.exports = router;