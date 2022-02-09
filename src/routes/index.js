const { Router } = require('express');
const healthRoutes = require('../modules/heath/health.routes');
const roleRoutes = require('../modules/role/role.routes');
const tagRoutes = require('../modules/tag/tag.routes');
const employeeRoutes = require('../modules/employee/employee.routes');

const router = Router();

router.use('/health', healthRoutes);
router.use('/roles', roleRoutes);
router.use('/tags', tagRoutes);
router.use('/employees', employeeRoutes);

module.exports = router;
