const express = require('express');
const { tagControllerFactory } = require('./factories/tag.controller.factory');
const { expressRouteAdapter } = require('../../utils/express.route.adapter');

const tagController = tagControllerFactory();

const router = express.Router();

router.get('/', expressRouteAdapter({ routeHandler: tagController.retrieve }));
router.get('/:tagId', expressRouteAdapter({ routeHandler: tagController.retrieveById }));
router.post('/', expressRouteAdapter({ routeHandler: tagController.create }));
router.put('/:tagId', expressRouteAdapter({ routeHandler: tagController.update }));
router.delete('/:tagId', expressRouteAdapter({ routeHandler: tagController.delete }));

module.exports = router;
