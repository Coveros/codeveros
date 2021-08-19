const core = require('@actions/core');

const serviceValues = {
  auth: {
    context: 'services/auth-service/nodejs',
    image: 'coveros/codeveros-auth-service'
  },
  gateway: {
    context: 'services/gateway/nodejs',
    image: 'coveros/codeveros-gateway'
  },
  training: {
    context: 'services/training-service/nodejs',
    image: 'coveros/codeveros-training-service'
  },
  user: {
    context: 'services/user-service/nodejs',
    image: 'coveros/codeveros-user-service'
  },
  ui: {
    context: 'services/ui/angular',
    image: 'coveros/codeveros-ui'
  }
};

try {
  const servicesInput = core.getInput('services');
  // const services = JSON.parse(core.getInput('services'));

  console.log(`The servicesInput: ${servicesInput}`);

  // let include = [];
  // for (let service of services) {
  //   if (serviceValues.hasOwnProperty(service)) {
  //     include.push(serviceValues[service])
  //   }
  // }
  // core.setOutput('matrix', JSON.stringify({ include }));

  core.setOutput('matrix', JSON.stringify({ include: [] } ));
} catch (error) {
  core.setFailed(error.message);
}