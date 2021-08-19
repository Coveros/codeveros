const core = require('@actions/core');
const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const serviceValues = {
  'auth-service': {
    context: 'services/auth-service/nodejs',
    image: 'coveros/codeveros-auth-service'
  },
  'gateway': {
    context: 'services/gateway/nodejs',
    image: 'coveros/codeveros-gateway'
  },
  'training-service': {
    context: 'services/training-service/nodejs',
    image: 'coveros/codeveros-training-service'
  },
  'user-service': {
    context: 'services/user-service/nodejs',
    image: 'coveros/codeveros-user-service'
  },
  'ui': {
    context: 'services/ui/angular',
    image: 'coveros/codeveros-ui'
  }
};

try {
  const services = JSON.parse(core.getInput('services'));
  const svcYaml = yaml.load(fs.readFileSync('.github/actions/get-matrix/services.yml'));
  console.log(`the service yaml: ${svcYaml}`);
  let include = [];
  for (let service of services) {
    if (serviceValues.hasOwnProperty(service)) {
      include.push(serviceValues[service])
    }
  }
  core.setOutput('matrix', JSON.stringify({ include }));
} catch (error) {
  core.setFailed(error.message);
}
