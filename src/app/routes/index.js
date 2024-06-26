const UserRoutes = require('./User/User.routers');
const PermissionRoutes = require('./Permission/Permission.routers');
const UserGroupRoutes = require('./UserGroup/UserGroup.routers');
const PasswordUserOldRoutes = require('./PasswordUserOld/PasswordUserOld.routers');
const AuthRoutes = require('./auth/Auth.routers');
const PermissionUserGroupRoutes = require('./PemissionUserGroup/PermissionUserGroup.routers');
const CodeRoutes = require('./Code/Code.routers');
const CustomerRoutes = require('./Customer/Customer.routers');
const OrganizationRoutes = require('./Organization/Organization.routers');
const AddressRoutes = require('./Address/Address.routers');


const router = require('express').Router();

router.use('/user', UserRoutes);

/* Roles&Permission*/

router.use('/Permission', PermissionRoutes);
router.use('/usergroup', UserGroupRoutes);
router.use('/permissionusergroup', PermissionUserGroupRoutes);
router.use('/customer', CustomerRoutes);
router.use('/passwordOldUsers', PasswordUserOldRoutes);
router.use('/code', CodeRoutes);

/* Auth*/

router.use('/auth', AuthRoutes);

/* Organization*/

router.use('/organization', OrganizationRoutes);
router.use('/address', AddressRoutes);

module.exports = router;
