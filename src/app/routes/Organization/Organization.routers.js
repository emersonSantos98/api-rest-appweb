const router = require("express").Router();
const OrganizationController = require("../../controllers/Organization/OrganizationController");
const organizationController = new OrganizationController();
const { authenticateToken } = require("../../../../domain/auth/middlewares/MiddlewaresAuth");

router.post("/create", organizationController.create);

router.get("/findAll", authenticateToken, organizationController.findAll);

router.get("/findOne", authenticateToken, organizationController.findOne);

router.put("/update", authenticateToken, organizationController.update);

router.delete("/delete/:id", authenticateToken, organizationController.delete);

module.exports = router;
