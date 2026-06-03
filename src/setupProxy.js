const { createProxyMiddleware } = require("http-proxy-middleware");

// Local dev: forward /api/search to FastAPI backend on :8000
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://127.0.0.1:8000",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    })
  );
};
