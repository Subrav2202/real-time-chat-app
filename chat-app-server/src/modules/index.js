const fs = require("fs");

const init = async (app) => {
  const rootPath = __dirname;
  console.log({ rootPath })
  const moduleNames = await fs.promises.readdir(rootPath);
  console.log({ moduleNames })
  await Promise.all(
    moduleNames.map(async (moduleName) => {
      const stat = await fs.promises.lstat(`${rootPath}/${moduleName}`);
      console.log({ stat })
      console.log('directory', stat.isDirectory())
      if (stat.isDirectory()) {
        console.log('hello1')
        // eslint-disable-next-line global-require
        const module = require(`./${moduleName}`);
        console.log('hello2')
        console.log('module6576575', module)
        if (module.init) {
          console.log('inside init')
          await module.init(app);
          // console.log(`Module ${moduleName} loaded`);
        }
      }
    })
  );
  return app;
};

module.exports = { init };
