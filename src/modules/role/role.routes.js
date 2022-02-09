const express = require('express');
const { roleControllerFactory } = require('./factories/role.controller.factory');
const { expressRouteAdapter } = require('../../utils/express.route.adapter');

const roleController = roleControllerFactory();

const router = express.Router();

router.get('/', expressRouteAdapter({ routeHandler: roleController.retrieve }));
router.get('/:roleId', expressRouteAdapter({ routeHandler: roleController.retrieveById }));
router.post('/', expressRouteAdapter({ routeHandler: roleController.create }));
router.put('/:roleId', expressRouteAdapter({ routeHandler: roleController.update }));
router.delete('/:roleId', expressRouteAdapter({ routeHandler: roleController.delete }));

module.exports = router;
