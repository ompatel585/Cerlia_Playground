// api/index.js
import serverless from "serverless-http";
import app from "../server/server.js";
import connectDB from "../server/config/db.js";

await connectDB();

export default serverless(app);
