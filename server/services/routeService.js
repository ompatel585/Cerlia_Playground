const express = require('express');
const apiController = require('../controllers/apiController');

class RouteService {
    constructor() {
        this.router = express.Router();
        this.routes = new Map(); // In-memory store for route configs
    }

    registerRoute(path, methods) {
        // Normalize path (ensure it starts with '/')
        const normalizedPath = path.startsWith('/') ? path : `/${path}`;

        // Store route configuration
        this.routes.set(normalizedPath, methods);

        // Register routes based on selected methods
        if (methods.includes('GET')) {
            this.router.get(normalizedPath, apiController.get);
        }
        if (methods.includes('POST')) {
            this.router.post(normalizedPath, apiController.post);
        }
        if (methods.includes('PUT')) {
            this.router.put(`${normalizedPath}/:id`, apiController.put);
        }
        if (methods.includes('PATCH')) {
            this.router.patch(`${normalizedPath}/:id`, apiController.patch);
        }
        if (methods.includes('DELETE')) {
            this.router.delete(`${normalizedPath}/:id`, apiController.delete);
        }

        return {
            message: `Routes for ${normalizedPath} registered successfully`,
            routes: methods.map(method => ({
                method,
                url: method === 'GET' || method === 'POST'
                    ? `http://localhost:5000/api${normalizedPath}`
                    : `http://localhost:5000/api${normalizedPath}/:id`
            }))
        };
    }

    getRouter() {
        return this.router;
    }
}

module.exports = new RouteService();