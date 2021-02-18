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

    const oldArr = repo.split('-');
    const oldStarts = oldArr[3];
    const oldForks = oldArr[5];

    const stars = data.stargazers_count;
    const forks = data.forks_count;
    console.log(`Info: [oldStarts: ${oldStarts}] [oldForks: ${oldForks}] [stars: ${stars}] [forks: ${forks}]`);

    // No change no update
    if (oldStarts !== stars || oldForks !== forks) {
      await octokit.repos.update({
        owner,
        repo,
        name: `This-repo-has-${stars}-stars-${forks}-forks`,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}

run();
