const router = require("express").Router();
const CodeController = require("../../controllers/Code/CodeController");


const codeController = new CodeController()

router.post("/validCode",  codeController.validationCode);
router.post("/createCode", codeController.createCode);


module.exports = router;

