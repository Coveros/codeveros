const { defaultController } = require('@coveros/codeveros-ms');

const model = 'training';

module.exports = [
  {
    path: `GET /${model}`,
    action: defaultController.find
  },
  {
    path: `GET /${model}/:id`,
    action: defaultController.findOne
  },
  {
    path: `POST /${model}`,
    action: defaultController.create
  },
  {
    path: `PUT /${model}/:id`,
    action: defaultController.update
  },
  {
    path: `DELETE /${model}/:id`,
    action: defaultController.deleteOne
  }
];
