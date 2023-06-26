const createProxyMiddleware = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8081", // Replace with your Spring backend URL
      changeOrigin: true,
    })
  );
};
