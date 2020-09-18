const controller = require('./controller');

module.exports = [
  {
    path: 'POST /auth/verifyToken',
    action: controller.verifyToken
  },
  {
    path: 'POST /auth/signToken',
    action: controller.signToken
  }
];
