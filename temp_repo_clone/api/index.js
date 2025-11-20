// api/index.js
import serverless from "serverless-http";
import app from "../server/server.js";
import connectDB from "../server/config/db.js";

let handler;

export default async function (req, res) {
  if (!handler) {
    await connectDB();       // connect DB only once
    handler = serverless(app);
  }
  return handler(req, res);
}
