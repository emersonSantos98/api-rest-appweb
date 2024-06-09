const router = require("express").Router();
const AddressController = require("../../controllers/Address/AddressController");
const {authenticateToken} = require("../../../../domain/auth/middlewares/MiddlewaresAuth");
const addressController = new AddressController();

router.post("/create", authenticateToken, addressController.create);

router.get("/findAll", authenticateToken, addressController.findAll);

router.get("/findOne/:id", authenticateToken, addressController.findOne);

router.put("/update", authenticateToken, addressController.update);

router.delete("/delete/:id", authenticateToken, addressController.delete);

module.exports = router;
