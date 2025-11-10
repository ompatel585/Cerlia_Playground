// api/index.js
import serverless from "serverless-http";
import app from "../server/server.js";
import connectDB from "../server/config/db.js";

// Connect to Mongo once at cold start
await connectDB();

// Export wrapped Express app
export default serverless(app);
