const UserRoutes = require('./User/User.routers');
const PermissionRoutes = require('./Permission/Permission.routers');
const UserGroupRoutes = require('./UserGroup/UserGroup.routers');
const PasswordUserOldRoutes = require('./PasswordUserOld/PasswordUserOld.routers');
const AuthRoutes = require('./auth/Auth.routers');
const PermissionUserGroupRoutes = require('./PemissionUserGroup/PermissionUserGroup.routers');
const SecurityGroupRoutes = require('./Security/Security.routers');
const CodeRoutes = require('./Code/Code.routers');
const CustomerRoutes = require('./Customer/Customer.routers');
const TemplateEmailRoutes = require('./TemplateEmail/TemplateEmail.routers');
const OrganizationRoutes = require('./Organization/Organization.routers');
const SendGridRoutes = require('./SendGrid/SendGrid.routers');
const AddressRoutes = require('./Address/Address.routers');
const FunnelRoutes = require('./Funnels/Funnels.routers');
const LanguagesRoutes = require('./Languages/Languages.routers');
const ObjectivesRoutes = require('./Objectives/ObjectivesAdm.routers');
const PagarMeCustomerRoutes = require('./PagarMe/Customer.routers');
const PagarMeCardRoutes = require('./PagarMe/Card.routers');
const PagarMeCheckoutRoutes = require('./PagarMe/Checkout.routers');
const PagarMePixRoutes = require('./PagarMe/Pix.routers');

const router = require('express').Router();

router.use('/user', UserRoutes);

/* Roles&Permission*/

router.use('/Permission', PermissionRoutes);
router.use('/usergroup', UserGroupRoutes);
router.use('/permissionusergroup', PermissionUserGroupRoutes);
router.use('/customer', CustomerRoutes);
router.use('/passwordOldUsers', PasswordUserOldRoutes);
router.use('/security', SecurityGroupRoutes);
router.use('/templateEmail', TemplateEmailRoutes);
router.use('/sendgrid', SendGridRoutes);
router.use('/code', CodeRoutes);
router.use('/funnel', FunnelRoutes);
router.use('/languages', LanguagesRoutes);
router.use('/objectives', ObjectivesRoutes);
router.use('/pagarme/customer', PagarMeCustomerRoutes);
router.use('/pagarme/card', PagarMeCardRoutes);
router.use('/pagarme/checkout', PagarMeCheckoutRoutes);
router.use('/pagarme/pix', PagarMePixRoutes);

/* Auth*/

router.use('/auth', AuthRoutes);

/* Organization*/

router.use('/organization', OrganizationRoutes);
router.use('/address', AddressRoutes);

module.exports = router;
