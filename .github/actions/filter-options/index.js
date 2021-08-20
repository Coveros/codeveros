const core = require('@actions/core');
const yaml = require('js-yaml');
const fs = require('fs');

function isPathInput(text) {
  return !(text.includes('\n') || text.includes(':'))
}

function getFileContent(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Options file '${filePath}' not found`);
  }
  if (!fs.lstatSync(filePath).isFile()) {
    throw new Error(`'${filePath}' is not a file`);
  }
  return fs.readFileSync(filePath, {encoding: 'utf-8'});
}

try {
  const optionsInput = core.getInput('options');
  const optionsYamlStr = isPathInput(optionsInput) ? getFileContent(optionsInput) : optionsInput;

  const options = yaml.load(optionsYamlStr);
  const optionFilters = JSON.parse(core.getInput('filters'));

  let selected = [];
  for (let optionFilter of optionFilters) {
    if (options.hasOwnProperty(optionFilter)) {
      core.info(`Including ${optionFilter} values in output`);
      selected.push(options[optionFilter]);
    }
  }
  core.setOutput('filtered', JSON.stringify(selected));
} catch (error) {
  core.setFailed(error.message);
}

