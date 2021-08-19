const core = require('@actions/core');
const yaml = require('js-yaml');
const fs = require('fs');

try {
  const services = JSON.parse(core.getInput('services'));
  const serviceOptions = yaml.load(fs.readFileSync('.github/get-matrix.yml'));
  let include = [];
  for (let service of services) {
    if (serviceOptions.hasOwnProperty(service)) {
      core.info(`Including ${service} values in output`);
      include.push(serviceOptions[service])
    }
  }
  core.setOutput('matrix', JSON.stringify({ include }));
} catch (error) {
  core.setFailed(error.message);
}
