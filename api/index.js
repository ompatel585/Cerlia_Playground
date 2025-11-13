// api/index.js
import serverless from "serverless-http";
import app from "../server/server.js";
import connectDB from "../server/config/db.js";

// Initialize DB connection once
let handler = null;

export default async function (req, res) {
  if (!handler) {
    await connectDB();
    handler = serverless(app);
  }
  
  return handler(req, res);
}
