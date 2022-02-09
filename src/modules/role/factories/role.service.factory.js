const RoleService = require('../role.service');
const RoleRepository = require('../role.repository');

const roleRepository = new RoleRepository();

exports.roleServiceFactory = () => new RoleService({ roleRepository });
