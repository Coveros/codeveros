const controller = require('./controller');
const { defaultController } = require('@coveros/codeveros-ms');

module.exports = [
  {
    path: 'GET /user',
    action: defaultController.find
  },
  {
    path: 'GET /user/:id',
    action: defaultController.findOne
  },
  {
    path: 'POST /user',
    action: defaultController.create
  },
  {
    path: 'PUT /user/:id',
    action: defaultController.update
  },
  {
    path: 'DELETE /user/:id',
    action: defaultController.deleteOne
  },
  {
    path: 'POST /user/login',
    action: controller.login
  },
  {
    path: 'POST /user/logout',
    action: controller.logout
  }
];
