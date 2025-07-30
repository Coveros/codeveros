import * as core from '@actions/core';
import yaml from 'js-yaml';
import fs from 'fs';

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

  const optionsToSelect = JSON.parse(core.getInput('options-to-select'));

  let selected = [];
  for (let optionToSelect of optionsToSelect) {
    if (options.hasOwnProperty(optionToSelect)) {
      core.info(`Including ${optionToSelect} values in output`);
      selected.push(options[optionToSelect]);
    }
    else {
      core.info(`'${optionToSelect}' not found in options input, skipping`);
    }
  }
  core.setOutput('filtered', JSON.stringify(selected));
} catch (error) {
  core.setFailed(error.message);
}

