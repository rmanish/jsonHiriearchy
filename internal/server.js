const fs = require('fs');
require('dotenv').config();
const bundlePath = process.cwd() + '/' + process.env.BUILD_PATH;

(async () => {
  try {
    if (fs.existsSync(bundlePath)) {
      const bootstrapApplication = require(bundlePath).default;
      const app = await bootstrapApplication();
      const hapiSwagger = require('hapi-swagger');
      const config = require('./../serviceSetup');
      await app.server.register([
        {
          plugin: hapiSwagger,
          options: {
            documentationPage: false,
            swaggerUI: false,
            host: process.env.API_URL,
            basePath: '/' + process.env.SERVICE_NAME,
            schemes: ['http'],
            info: {
              title: process.env.SERVICE_NAME + ' Service',
              version: config.version
            },
            grouping: 'tags'
          }
        }
      ]);
      await app.server.start();
      // WARNING: DO NOT CHANGE THE BELOW STRING. This power the swagger generation script
      console.log(`Server started at ${app.server.info.uri}`);
    } else {
      console.warn('There is no build file to start the server');
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
