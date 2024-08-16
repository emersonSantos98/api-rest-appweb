const router = require('express').Router();

// Suas outras rotas
const UserRoutes = require('./User/user.route');
const PermissionRoutes = require('./Permission/Permission.routers');
const UserGroupRoutes = require('./UserGroup/UserGroup.routers');
const PasswordUserOldRoutes = require('./PasswordUserOld/PasswordUserOld.routers');
const AuthRoutes = require('./auth/Auth.routers');
const PermissionUserGroupRoutes = require('./PemissionUserGroup/PermissionUserGroup.routers');
const CodeRoutes = require('./Code/Code.routers');
const CustomerRoutes = require('./Customer/Customer.routers');
const OrganizationRoutes = require('./Organization/Organization.routers');
const AddressRoutes = require('./Address/Address.routers');
const ProductRoutes = require('./Product/Product.route');
const CalculationRoutes = require('./Calculation/Calculation.route');
const ParameterRoutes = require('./Parameter/Parameter.route');
const StockMovementRoutes = require('./StockMovement/StockMovement.route');
const ProductVariationRoutes = require('./ProductVariation/ProductVariation.route');
const GenerateShippingLabelsRoutes = require('./generateShippingLabels/generateShippingLabels.route');
const GoogleRoutes = require('./auth/Google.routes');

router.use('/api/v1/user', UserRoutes);

/* Roles&permission*/
router.use('/api/v1/permission', PermissionRoutes);
router.use('/api/v1/usergroup', UserGroupRoutes);
router.use('/api/v1/permissionusergroup', PermissionUserGroupRoutes);
router.use('/api/v1/customer', CustomerRoutes);
router.use('/api/v1/passwordOldUsers', PasswordUserOldRoutes);
router.use('/api/v1/code', CodeRoutes);

/* Auth*/
router.use('/api/v1/authentication', AuthRoutes);
router.use('/auth', GoogleRoutes);

/* Organization*/
router.use('/api/v1/organization', OrganizationRoutes);
router.use('/api/v1/address', AddressRoutes);
router.use('/api/v1/product', ProductRoutes);
router.use('/api/v1/calculation', CalculationRoutes);
router.use('/api/v1/parameter', ParameterRoutes);
router.use('/api/v1/stockmovement', StockMovementRoutes);
router.use('/api/v1/productvariation', ProductVariationRoutes);
router.use('/api/v1/generateShippingLabels', GenerateShippingLabelsRoutes);

module.exports = router;
