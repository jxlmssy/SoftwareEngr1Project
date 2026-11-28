// Vercel serverless entry point: every /api/* request is routed here
// (see vercel.json) and handled by the Express app in backend/server.js.
module.exports = require("../backend/server");
