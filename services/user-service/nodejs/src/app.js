const { createService } = require('@coveros/codeveros-ms');
const path = require('path');

const userService = createService({
  routes: require('./lib/routes'),
  models: {
    user: require('./lib/User')
  },
  specPath: path.resolve('src/swagger.yaml')
});

const app = userService.start();

module.exports = app;
