const core = require('@actions/core');
const github = require('@actions/github');

async function getRun(context) {
    const ghToken = core.getInput('github-token') || process.env['GITHUB_TOKEN'];
    const octokit = github.getOctokit(ghToken)

    const run = await octokit.rest.actions.getWorkflowRun({
        owner: context.repo.owner,
        repo: context.repo.repo,
        run_id: context.runId,
    });

    const createdAt = Date.parse(run.data.created_at);
    const duration = Date.now() - createdAt;
    const runName = run.data.name;
    const conclusion = run.data.conclusion;
    const status = run.data.status;

    return {
        createdAt,
        duration,
        runName,
        conclusion,
        status,
    }
}

module.exports = getRun;
