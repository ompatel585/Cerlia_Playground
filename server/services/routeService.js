

// import express from 'express';
// import * as apiController from '../controllers/apiController.js';

// class RouteService {
//     constructor() {
//         this.router = express.Router();
//         this.routes = new Map(); // In-memory store for route configs
//     }

//     registerRoute(path, methods) {
//         // Normalize path (ensure it starts with '/')
//         const normalizedPath = path.startsWith('/') ? path : `/${path}`;

//         // Store route configuration
//         this.routes.set(normalizedPath, methods);

//         // Register routes based on selected methods
//         if (methods.includes('GET')) {
//             this.router.get(normalizedPath, apiController.get);
//         }
//         if (methods.includes('POST')) {
//             this.router.post(normalizedPath, apiController.post);
//         }
//         if (methods.includes('PUT')) {
//             this.router.put(`${normalizedPath}/:id`, apiController.put);
//         }
//         if (methods.includes('PATCH')) {
//             this.router.patch(`${normalizedPath}/:id`, apiController.patch);
//         }
//         if (methods.includes('DELETE')) {
//             this.router.delete(`${normalizedPath}/:id`, apiController.delete);
//         }

//         return {
//             message: `Routes for ${normalizedPath} registered successfully`,
//             routes: methods.map(method => ({
//                 method,
//                 url: method === 'GET' || method === 'POST'
//                     ? `http://localhost:5000/api${normalizedPath}`
//                     : `http://localhost:5000/api${normalizedPath}/:id`
//             }))
//         };
//     }

//     getRouter() {
//         return this.router;
//     }
// }

// export default new RouteService();



// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import * as apiController from '../controllers/apiController.js';

// const DATA_FILE = path.resolve('./routes.json');

// class RouteService {
//     constructor() {
//         this.router = express.Router();
//         this.routes = new Map();

//         this.loadRoutesFromFile();
//     }

//     loadRoutesFromFile() {
//         if (fs.existsSync(DATA_FILE)) {
//             const saved = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
//             saved.forEach(({ path, methods }) => {
//                 this.routes.set(path, methods);
//                 this._register(path, methods);
//             });
//         }
//     }

//     saveRoutesToFile() {
//         const arr = Array.from(this.routes, ([path, methods]) => ({ path, methods }));
//         fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2));
//     }

//     _register(normalizedPath, methods) {
//         if (methods.includes('GET')) {
//             this.router.get(normalizedPath, apiController.get);
//         }
//         if (methods.includes('POST')) {
//             this.router.post(normalizedPath, apiController.post);
//         }
//         if (methods.includes('PUT')) {
//             this.router.put(`${normalizedPath}/:id`, apiController.put);
//         }
//         if (methods.includes('PATCH')) {
//             this.router.patch(`${normalizedPath}/:id`, apiController.patch);
//         }
//         if (methods.includes('DELETE')) {
//             this.router.delete(`${normalizedPath}/:id`, apiController.delete);
//         }
//     }

//     registerRoute(path, methods) {
//         const normalizedPath = path.startsWith('/') ? path : `/${path}`;
//         this.routes.set(normalizedPath, methods);
//         this._register(normalizedPath, methods);
//         this.saveRoutesToFile();

//         return { message: `Routes for ${normalizedPath} registered`, path: normalizedPath, methods };
//     }

//     getRoutes() {
//         return Array.from(this.routes, ([path, methods]) => ({ path, methods }));
//     }

//     getRouter() {
//         return this.router;
//     }
// }

// export default new RouteService();






// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import * as apiController from '../controllers/apiController.js';

// const DATA_FILE = path.resolve('./routes.json');

// class RouteService {
//     constructor() {
//         this.routes = new Map();
//         this.router = express.Router();
//         this.loadRoutesFromFile();
//     }

//     loadRoutesFromFile() {
//         if (fs.existsSync(DATA_FILE)) {
//             const saved = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
//             saved.forEach(({ path, methods }) => {
//                 this.routes.set(path, methods);
//             });
//             this.rebuildRouter();  // build router after loading
//         }
//     }

//     saveRoutesToFile() {
//         const arr = Array.from(this.routes, ([path, methods]) => ({ path, methods }));
//         fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2));
//     }

//     _register(normalizedPath, methods) {
//         if (methods.includes('GET')) {
//             this.router.get(normalizedPath, apiController.get);
//         }
//         if (methods.includes('POST')) {
//             this.router.post(normalizedPath, apiController.post);
//         }
//         if (methods.includes('PUT')) {
//             this.router.put(`${normalizedPath}/:id`, apiController.put);
//         }
//         if (methods.includes('PATCH')) {
//             this.router.patch(`${normalizedPath}/:id`, apiController.patch);
//         }
//         if (methods.includes('DELETE')) {
//             this.router.delete(`${normalizedPath}/:id`, apiController.delete);
//         }
//     }

//     rebuildRouter() {
//         this.router = express.Router();  // reset router instance
//         for (const [path, methods] of this.routes.entries()) {
//             this._register(path, methods);
//         }
//     }

//     registerRoute(path, methods) {
//         const normalizedPath = path.startsWith('/') ? path : `/${path}`;
//         this.routes.set(normalizedPath, methods);

//         this.rebuildRouter();  // important: rebuild router after adding new route
//         this.saveRoutesToFile();

//         return { message: `Routes for ${normalizedPath} registered`, path: normalizedPath, methods };
//     }

//     getRoutes() {
//         return Array.from(this.routes, ([path, methods]) => ({ path, methods }));
//     }

//     getRouter() {
//         return this.router;
//     }
// }

// export default new RouteService();






























// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import * as apiController from '../controllers/apiController.js';

// const DATA_FILE = path.resolve('./routes.json');

// class RouteService {
//     constructor() {
//         this.routes = new Map();
//         this.router = express.Router();  // create once, never replace

//         this.loadRoutesFromFile();
//     }

//     loadRoutesFromFile() {
//         if (fs.existsSync(DATA_FILE)) {
//             const saved = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
//             saved.forEach(({ path, methods }) => {
//                 this.routes.set(path, methods);
//                 this._register(path, methods);
//             });
//         }
//     }

//     saveRoutesToFile() {
//         const arr = Array.from(this.routes, ([path, methods]) => ({ path, methods }));
//         fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2));
//     }

//     _register(normalizedPath, methods) {
//         if (methods.includes('GET')) {
//             this.router.get(normalizedPath, apiController.get);
//         }
//         if (methods.includes('POST')) {
//             this.router.post(normalizedPath, apiController.post);
//         }
//         if (methods.includes('PUT')) {
//             this.router.put(`${normalizedPath}/:id`, apiController.put);
//         }
//         if (methods.includes('PATCH')) {
//             this.router.patch(`${normalizedPath}/:id`, apiController.patch);
//         }
//         if (methods.includes('DELETE')) {
//             this.router.delete(`${normalizedPath}/:id`, apiController.delete);
//         }
//     }

//     registerRoute(path, methods) {
//         const normalizedPath = path.startsWith('/') ? path : `/${path}`;
//         if (this.routes.has(normalizedPath)) {
//             throw new Error(`Route ${normalizedPath} already exists.`);
//         }

//         this.routes.set(normalizedPath, methods);
//         this._register(normalizedPath, methods);  // register new routes immediately
//         this.saveRoutesToFile();

//         return { message: `Routes for ${normalizedPath} registered`, path: normalizedPath, methods };
//     }

//     getRoutes() {
//         return Array.from(this.routes, ([path, methods]) => ({ path, methods }));
//     }

//     getRouter() {
//         return this.router;
//     }
// }

// export default new RouteService();













// import express from 'express';
// import mongoose from 'mongoose';
// import * as apiController from '../controllers/apiController.js';
// import Route from '../models/apiModel/apiModel.js';

// class RouteService {
//     constructor() {
//         this.routes = new Map();
//         this.router = express.Router();
//         this.loadRoutesFromDB();
//     }

//     async loadRoutesFromDB() {
//         try {
//             const savedRoutes = await Route.find();
//             savedRoutes.forEach(({ path, methods }) => {
//                 this.routes.set(path, methods);
//                 this._register(path, methods);
//             });
//             console.log('Routes loaded from MongoDB:', savedRoutes);
//         } catch (error) {
//             console.error('Error loading routes from DB:', error.message);
//         }
//     }

//     // async saveRoutesToDB(normalizedPath, methods) {
//     //     try {
//     //         await Route.create({ path: normalizedPath, methods });
//     //         console.log(`Route ${normalizedPath} saved to MongoDB`);
//     //     } catch (error) {
//     //         console.error('Error saving route to DB:', error.message);
//     //         throw new Error('Failed to save route to database');
//     //     }
//     // }

//     async saveRoutesToDB(normalizedPath, methods) {
//         try {
//             await Route.findOneAndUpdate(
//                 { path: normalizedPath },
//                 { methods: methods },
//                 { upsert: true, new: true, setDefaultsOnInsert: true }
//             );
//             console.log(`Route ${normalizedPath} saved/updated in MongoDB`);
//         } catch (error) {
//             console.error('Error saving route to DB:', error);
//             throw new Error('Failed to save route to database');
//         }
//     }


//     _register(normalizedPath, methods) {
//         if (methods.includes('GET')) {
//             this.router.get(normalizedPath, apiController.get);
//         }
//         if (methods.includes('POST')) {
//             this.router.post(normalizedPath, apiController.post);
//         }
//         if (methods.includes('PUT')) {
//             this.router.put(`${normalizedPath}/:id`, apiController.put);
//         }
//         if (methods.includes('PATCH')) {
//             this.router.patch(`${normalizedPath}/:id`, apiController.patch);
//         }
//         if (methods.includes('DELETE')) {
//             this.router.delete(`${normalizedPath}/:id`, apiController.delete);
//         }
//     }

//     async registerRoute(path, methods) {
//         const validMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
//         if (!path || typeof path !== 'string' || path.includes(' ')) {
//             throw new Error('Invalid path');
//         }
//         if (!methods || !Array.isArray(methods) || methods.length === 0 || !methods.every(m => validMethods.includes(m))) {
//             throw new Error('Invalid or empty methods');
//         }

//         const normalizedPath = path.startsWith('/') ? path : `/${path}`;
//         if (this.routes.has(normalizedPath)) {
//             throw new Error(`Route ${normalizedPath} already exists`);
//         }

//         this.routes.set(normalizedPath, methods);
//         this._register(normalizedPath, methods);
//         await this.saveRoutesToDB(normalizedPath, methods);

//         return { message: `Routes for ${normalizedPath} registered`, path: normalizedPath, methods };
//     }

//     async getRoutes() {
//         try {
//             const routes = await Route.find();
//             return routes.map(({ path, methods }) => ({ path, methods }));
//         } catch (error) {
//             console.error('Error fetching routes from DB:', error.message);
//             return [];
//         }
//     }

//     getRouter() {
//         return this.router;
//     }
// }

// export default new RouteService();


import express from 'express';
import mongoose from 'mongoose';
import * as apiController from '../controllers/apiController.js';
import Route from '../models/apiModel/apiModel.js';

class RouteService {
    constructor() {
        this.routes = new Map();
        this.router = express.Router();
        this.loadRoutesFromDB();
    }

    async loadRoutesFromDB() {
        try {
            const savedRoutes = await Route.find();
            savedRoutes.forEach(({ path, methods }) => {
                this.routes.set(path, methods);
                this._register(path, methods);
            });
            console.log('Routes loaded from MongoDB:', savedRoutes);
        } catch (error) {
            console.error('Error loading routes from DB:', error.message);
        }
    }

    async saveRoutesToDB(normalizedPath, methods) {
        try {
            await Route.create({ path: normalizedPath, methods });
            console.log(`Route ${normalizedPath} saved to MongoDB`);
        } catch (error) {
            console.error('Error saving route to DB:', error.message);
            throw new Error('Failed to save route to database');
        }
    }

    _register(normalizedPath, methods) {
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
    }

    async registerRoute(path, methods) {
        const validMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
        if (!path || typeof path !== 'string' || path.includes(' ')) {
            throw new Error('Invalid path');
        }
        if (!methods || !Array.isArray(methods) || methods.length === 0 || !methods.every(m => validMethods.includes(m))) {
            throw new Error('Invalid or empty methods');
        }

        const normalizedPath = path.startsWith('/') ? path : `/${path}`;
        if (this.routes.has(normalizedPath)) {
            throw new Error(`Route ${normalizedPath} already exists`);
        }

        this.routes.set(normalizedPath, methods);
        this._register(normalizedPath, methods);
        await this.saveRoutesToDB(normalizedPath, methods);

        return { message: `Routes for ${normalizedPath} registered`, path: normalizedPath, methods };
    }

    async getRoutes() {
        try {
            const routes = await Route.find();
            return routes.map(({ path, methods }) => ({ path, methods }));
        } catch (error) {
            console.error('Error fetching routes from DB:', error.message);
            return [];
        }
    }

    getRouter() {
        return this.router;
    }
}

export default new RouteService();