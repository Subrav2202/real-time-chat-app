const authRoutes = require("./auth-controller");


const init = async (app) => {
  app.use("/api/auth", authRoutes);
  return app;
};

module.exports = { init };
