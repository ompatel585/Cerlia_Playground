// exports.get = (req, res) => {
//     res.json({
//         message: `GET request to ${req.originalUrl}`,
//         data: [], // Placeholder for data
//     });
// };

// exports.post = (req, res) => {
//     res.json({
//         message: `POST request to ${req.originalUrl}`,
//         data: req.body, // Echo back the request body
//     });
// };

// exports.put = (req, res) => {
//     res.json({
//         message: `PUT request to ${req.originalUrl}`,
//         id: req.params.id,
//         data: req.body,
//     });
// };

// exports.patch = (req, res) => {
//     res.json({
//         message: `PATCH request to ${req.originalUrl}`,
//         id: req.params.id,
//         data: req.body,
//     });
// };

// exports.delete = (req, res) => {
//     res.json({
//         message: `DELETE request to ${req.originalUrl}`,
//         id: req.params.id,
//     });
// };


function validateData(data, schema) {
    const errors = [];

    for (const field of schema) {
        const value = data[field.name];
        const fieldName = field.name;

        // Check if required
        if (field.required && (value === undefined || value === null || value === "")) {
            errors.push(`${fieldName} is required`);
            continue;
        }

        // Skip validation if value is optional and missing
        if (!field.required && value === undefined) continue;

        // Type validation
        switch (field.type) {
            case "string":
                if (typeof value !== "string") errors.push(`${fieldName} must be a string`);
                break;

            case "number":
                if (typeof value !== "number") errors.push(`${fieldName} must be a number`);
                if (field.min !== undefined && value < field.min)
                    errors.push(`${fieldName} must be at least ${field.min}`);
                if (field.max !== undefined && value > field.max)
                    errors.push(`${fieldName} must be at most ${field.max}`);
                break;

            case "boolean":
                if (typeof value !== "boolean") errors.push(`${fieldName} must be a boolean`);
                break;

            default:
                errors.push(`Unknown type for ${fieldName}`);
        }
    }

    return errors;
}

// Simulated dynamic schema map (you can replace this with DB later)
const routeSchemas = {
    "/posts": [
        { name: "title", type: "string", required: true },
        { name: "views", type: "number", min: 0 },
        { name: "isPublished", type: "boolean", default: false },
    ],
};

function getSchemaForRoute(path) {
    // Can add path normalization logic
    return routeSchemas[path] || [];
}

exports.get = (req, res) => {
    res.json({
        message: `GET request to ${req.originalUrl}`,
        data: [],
    });
};

exports.post = (req, res) => {
    const schema = getSchemaForRoute(req.path);
    const errors = validateData(req.body, schema);

    if (errors.length > 0) {
        return res.status(400).json({ message: "Validation failed", errors });
    }

    res.status(201).json({
        message: `POST request to ${req.originalUrl}`,
        data: req.body,
    });
};

exports.put = (req, res) => {
    const schema = getSchemaForRoute(req.path);
    const errors = validateData(req.body, schema);

    if (errors.length > 0) {
        return res.status(400).json({ message: "Validation failed", errors });
    }

    res.json({
        message: `PUT request to ${req.originalUrl}`,
        id: req.params.id,
        data: req.body,
    });
};

exports.patch = (req, res) => {
    const schema = getSchemaForRoute(req.path);
    const errors = validateData(req.body, schema);

    if (errors.length > 0) {
        return res.status(400).json({ message: "Validation failed", errors });
    }

    res.json({
        message: `PATCH request to ${req.originalUrl}`,
        id: req.params.id,
        data: req.body,
    });
};

exports.delete = (req, res) => {
    res.json({
        message: `DELETE request to ${req.originalUrl}`,
        id: req.params.id,
    });
};
