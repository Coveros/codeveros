const { createService } = require('@coveros/codeveros-ms');

const authService = createService({
  routes: require('./lib/routes')
});

const app = authService.start();

module.exports = app;
