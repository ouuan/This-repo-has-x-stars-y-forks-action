const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require('@octokit/rest');

(async () => {
  const token = core.getInput('token') || process.env.GITHUB_TOKEN;
  const octokit = new Octokit({ auth: `token ${token}` });

  const { owner, repo } = github.context.repo;

  const { stargazers_count: stars, forks_count: forks } = (await octokit.repos.get({
    owner,
    repo,
  })).data;

  const descriptionTemplate = core.getInput('template') || '<star-fork>';
  const description = descriptionTemplate.replace('<star-fork>', `This repo has ${stars} star${stars > 1 ? 's' : ''} ${forks} fork${forks > 1 ? 's' : ''}`)
    .replace('<star>', stars.toString())
    .replace('<fork>', forks.toString());

  await octokit.repos.update({
    owner,
    repo,
    description,
  });
})();
