const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');

(async () => {
  try {
    const token = core.getInput('token', true);
    const octokit = new Octokit({ auth: `token ${token}` });

    const [owner, repo] = core.getInput('repo', true).split('/');

    const { data } = await octokit.repos.get({
      owner,
      repo,
    });
    const { stargazers_count: stars, forks_count: forks } = data;

    const type = core.getInput('type', true);
    const availableTypes = ['description', 'name'];
    if (!availableTypes.includes(type)) core.setFailed(`Wrong type, got ${type}, expected ${availableTypes.join(' | ')}.`);

    const params = {
      owner,
      repo,
    };

    const template = core.getInput('template', true);
    params[type] = template.replace('<star-fork>', `This repo has ${stars} star${stars > 1 ? 's' : ''} ${forks} fork${forks > 1 ? 's' : ''}`)
      .replace('<star>', stars.toString())
      .replace('<fork>', forks.toString());

    await octokit.repos.update(params);
  } catch (error) {
    core.setFailed(error);
  }
})();
