const express = require('express');
const router = express.Router();
const routeService = require('../services/routeService');

// Endpoint to create dynamic routes
router.post('/create-route', (req, res) => {
    const { path, methods } = req.body;

    if (!path || !methods || !Array.isArray(methods) || methods.length === 0) {
        return res.status(400).json({ error: 'Path and at least one method are required' });
    }

    try {
        const result = routeService.registerRoute(path, methods);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to register routes' });
    }
});

// Mount dynamic router
router.use('/', routeService.getRouter());

module.exports = router;