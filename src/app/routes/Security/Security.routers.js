const router = require("express").Router();
const SecurityController = require("../../controllers/Security/SecurityController");
const {authenticateToken , checkPermission} = require("../../../../domain/auth/middlewares/MiddlewaresAuth");

const securityController = new SecurityController()

router.post("/changePassword", authenticateToken, securityController.changePassword);
router.post("/forgotPassword", securityController.forgotPassword);
router.post("/resetPassword", securityController.resetPassword);
router.put("/twoFactorStatus", authenticateToken,securityController.twoFactorStatus);

module.exports = router;

