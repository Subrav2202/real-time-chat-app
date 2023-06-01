const { setup: setupCore } = require('./src/core');
const { init } = require("./src/modules");
const { handleError, handleRequest } = require("./src/common/middlewares");

require("dotenv").config();

const PORT = process.env.PORT;

const start = async () => {
  // eslint-disable-next-line no-return-await
  const configureRoutes = async (app) => {
    console.log({app})
    app.use(handleRequest);
    const app2 = await init(app);
    console.log({ app2 })
  };

  const { app, eventEmitter, connectWithDb, logger } = await setupCore();
  // console.log({ app, eventEmitter, connectWithDb, logger})

  try {
    await configureRoutes(app);
    app.listen(PORT, async () => {
      console.log({ PORT })
      logger.info(`Server started on port ${PORT}`);

      const broadcastDatabaseConnectionEstablished = (em) => {
        em.emit("databaseConnectionEstablished");
      };

      eventEmitter.on("databaseConnectionEstablished", () => {
        logger.info(
          "eventEmitterHealthCheck()=> Database connection established"
        );
      });

      await connectWithDb(broadcastDatabaseConnectionEstablished, eventEmitter);
      logger.info(`Database connection established at ${new Date()}`);
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (err) {
    await handleError(err);
  }
};

start();
