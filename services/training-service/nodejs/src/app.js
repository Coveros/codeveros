const { createService } = require('@coveros/codeveros-ms');
const path = require('path');

const trainingService = createService({
  routes: require('./lib/routes'),
  models: {
    training: require('./lib/Training')
  },
  specPath: path.resolve('src/swagger.yaml')
});

const app = trainingService.start();

module.exports = app;
