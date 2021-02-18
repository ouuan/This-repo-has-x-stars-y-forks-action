require('dotenv').config();
const github = require('@actions/github');
const { Octokit } = require('@octokit/rest');

async function run() {
  try {
    const { token } = process.env;
    const octokit = new Octokit({ auth: `token ${token}` });
    const context = github.context;

    const owner = context.repo.owner;
    const repo = context.repo.repo;

    const { data } = await octokit.repos.get({
      owner,
      repo,
    });

    const stars = data.stargazers_count;
    const forks = data.forks_count;

    await octokit.repos.update({
      owner,
      repo,
      name: `This-repo-has-${stars}-stars-${forks}-forks`,
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
