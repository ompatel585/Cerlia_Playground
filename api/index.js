// api/index.js
import serverless from "serverless-http";
import app from "../server/server.js";     // your Express app
import connectDB from "../server/config/db.js";  // your Mongo connection

// Wrap the Express app for Vercel serverless
const handler = async (req, res) => {
  // ensure Mongo is connected for every invocation
  await connectDB();
  return serverless(app)(req, res);
};

export default handler;
