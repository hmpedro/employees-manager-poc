const express = require('express');
const { employeeControllerFactory } = require('./factories/employee.controller.factory');
const { expressRouteAdapter } = require('../../utils/express.route.adapter');

const employeeController = employeeControllerFactory();

const router = express.Router();

router.get('/', expressRouteAdapter({ routeHandler: employeeController.retrieve }));
router.get('/:employeeId', expressRouteAdapter({ routeHandler: employeeController.retrieveById }));
router.post('/', expressRouteAdapter({ routeHandler: employeeController.create }));
router.put('/:employeeId', expressRouteAdapter({ routeHandler: employeeController.update }));
router.delete('/:employeeId', expressRouteAdapter({ routeHandler: employeeController.delete }));

module.exports = router;
