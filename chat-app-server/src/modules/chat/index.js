const chatRoutes = require("./chat-controller");
const {
  authenticateRequest,
} = require("../../common/middlewares");

const init = async (app) => {
  app.use(
    "/api/chat",
    // authenticateRequest,
    chatRoutes
  );
  return app;
};

module.exports = { init };
