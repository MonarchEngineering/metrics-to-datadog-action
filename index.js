const core = require('@actions/core');
const github = require('@actions/github');
const datadog = require('datadog-metrics');
const getRun = require('./getRun');

async function run() {
  try {
    datadog.init({
      apiKey: core.getInput('datadog-api-key'),
      prefix: 'actions.',
      defaultTags: [
          `status:${core.getInput('status')}`
      ],
    });

    run = await getRun(github.context);
    const repo = normalizeString(github.context.repo.repo);
    const actionName = normalizeString(run.runName);

    datadog.gauge(`${repo}.${actionName}.duration`, run.duration / 1000);
    datadog.flush();

  } catch (error) {
    core.setFailed(error.message);
  }
}

function normalizeString(str) {
  return str.
    toLowerCase().
    replace(/ /g, '_').
    replace(/-/g, '_')
}

run();
