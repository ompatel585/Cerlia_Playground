

// import express from 'express';
// import routeService from '../services/routeService.js';

// const router = express.Router();

// // Endpoint to create dynamic routes
// router.post('/create-route', (req, res) => {
//     const { path, methods } = req.body;

//     if (!path || !methods || !Array.isArray(methods) || methods.length === 0) {
//         return res.status(400).json({ error: 'Path and at least one method are required' });
//     }

//     try {
//         const result = routeService.registerRoute(path, methods);
//         res.json(result);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to register routes' });
//     }
// });

// // Mount dynamic router
// router.use('/', routeService.getRouter());

// export default router;



// import express from 'express';
// import routeService from '../services/routeService.js';

// const router = express.Router();

// router.post('/create-route', (req, res) => {
//     const { path, methods } = req.body;
//     if (!path || !methods || !Array.isArray(methods) || methods.length === 0) {
//         return res.status(400).json({ error: 'Path and at least one method are required' });
//     }
//     try {
//         const result = routeService.registerRoute(path, methods);
//         res.json(result);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to register routes' });
//     }
// });

// router.use('/', routeService.getRouter());

// export default router;



// import express from 'express';
// import routeService from '../services/routeService.js';

// const router = express.Router();

// router.post('/create-route', (req, res) => {
//     const { path, methods } = req.body;
//     if (!path || !methods || !Array.isArray(methods) || methods.length === 0) {
//         return res.status(400).json({ error: 'Path and at least one method are required' });
//     }
//     try {
//         const result = routeService.registerRoute(path, methods);
//         res.json(result);
//     } catch (error) {
//         console.error('Error in /create-route:', error.message);
//         res.status(400).json({ error: error.message });
//     }
// });

// router.get('/routes', (req, res) => {
//     try {
//         res.json(routeService.getRoutes());
//     } catch (error) {
//         console.error('Error in /routes:', error.message);
//         res.status(500).json({ error: 'Failed to fetch routes' });
//     }
// });

// router.use('/', routeService.getRouter());

// export default router; 















// import express from 'express';
// import routeService from '../services/routeService.js';
// import RouteModel from '../models/apiModel/apiModel.js'; // Your mongoose model for routes
// const router = express.Router();

// router.post('/create-route', async (req, res) => {
//     const { path, methods } = req.body;

//     if (!path || !methods || !Array.isArray(methods) || methods.length === 0) {
//         return res.status(400).json({ error: 'Path and at least one method are required' });
//     }

//     try {
//         // Normalize path to always start with "/"
//         const normalizedPath = path.startsWith('/') ? path : `/${path}`;

//         // Check if the route already exists in DB
//         const existingRoute = await RouteModel.findOne({ path: normalizedPath });

//         if (existingRoute) {
//             return res.status(400).json({ error: `Route with path "${normalizedPath}" already exists.` });
//         }

//         // Save new route to MongoDB
//         const newRoute = new RouteModel({
//             path: normalizedPath,
//             methods,
//         });

//         await newRoute.save();

//         // Register route in memory to your routeService for express router
//         const result = routeService.registerRoute(normalizedPath, methods);

//         return res.json({
//             message: `Route ${normalizedPath} created successfully`,
//             ...result,
//         });
//     } catch (err) {
//         console.error('Error in /create-route:', err);
//         return res.status(500).json({ error: 'Internal server error' });
//     }
// });

// export default router;































// import express from 'express';
// import routeService from '../services/routeService.js';

// const router = express.Router();

// router.post('/create-route', async (req, res) => {
//     const { path, methods } = req.body;
//     if (!path || !methods || !Array.isArray(methods) || methods.length === 0) {
//         return res.status(400).json({ error: 'Path and at least one method are required' });
//     }
//     try {
//         const result = await routeService.registerRoute(path, methods);
//         res.json(result);
//     } catch (error) {
//         console.error('Error in /create-route:', error.message);
//         res.status(400).json({ error: error.message });
//     }
// });

// router.get('/routes', async (req, res) => {
//     try {
//         const routes = await routeService.getRoutes();
//         res.json({ routes });
//     } catch (error) {
//         console.error('Error in /routes:', error.message);
//         res.status(500).json({ error: 'Failed to fetch routes' });
//     }
// });

// router.use('/', routeService.getRouter());

// export default router;











import express from 'express';
import routeService from '../services/routeService.js';

const router = express.Router();

router.post('/create-route', async (req, res) => {
    const { path, methods } = req.body;
    if (!path || !methods || !Array.isArray(methods) || methods.length === 0) {
        return res.status(400).json({ error: 'Path and at least one method are required' });
    }
    try {
        const result = await routeService.registerRoute(path, methods);
        res.json(result);
    } catch (error) {
        console.error('Error in /create-route:', error.message);
        res.status(400).json({ error: error.message });
    }
});

router.get('/routes', async (req, res) => {
    try {
        const routes = await routeService.getRoutes();
        res.json(routes);
    } catch (error) {
        console.error('Error in /routes:', error.message);
        res.status(500).json({ error: 'Failed to fetch routes' });
    }
});

router.use('/', routeService.getRouter());

export default router;