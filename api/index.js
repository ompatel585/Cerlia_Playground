// api/index.js
// api/index.js
import serverless from "serverless-http";
import app from "../server/server.js";
import connectDB from "../server/config/db.js";

// Connect to Mongo ONLY on cold start
let isConnected = false;

async function init() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

export default async function handler(req, res) {
  await init();
  const expressHandler = serverless(app);
  return expressHandler(req, res);
}
