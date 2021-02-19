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
    const { stargazers_count: starCount, forks_count: forkCount } = data;

    const type = core.getInput('type', true);
    const availableTypes = ['description', 'name'];
    if (!availableTypes.includes(type)) core.setFailed(`Wrong type, got ${type}, expected ${availableTypes.join(' | ')}.`);

    const params = {
      owner,
      repo,
    };

    const template = core.getInput('template', true);

    const placeHolder = ({ name = false, stars = true, forks = true } = {}) => {
      let content = 'This repo has';
      if (stars) content += `${starCount} star${starCount > 1 ? 's' : ''}`;
      if (forks) content += `${forkCount} fork${forkCount > 1 ? 's' : ''}`;
      if (name) content = content.toLowerCase().replace(' ', '-');
      return content;
    };

    params[type] = template
      .replace('<name>', placeHolder({ name: true }))
      .replace('<description>', placeHolder({ name: false }))
      .replace('<auto>', placeHolder({ name: type === 'name' }))
      .replace('<name-stars>', placeHolder({ name: true, forks: false }))
      .replace('<description-stars>', placeHolder({ name: false, forks: false }))
      .replace('<auto-stars>', placeHolder({ name: type === 'name', forks: false }))
      .replace('<name-stars>', placeHolder({ name: true, stars: false }))
      .replace('<description-stars>', placeHolder({ name: false, stars: false }))
      .replace('<auto-stars>', placeHolder({ name: type === 'name', stars: false }))
      .replace('<starCount>', starCount.toString())
      .replace('<forkCount>', forkCount.toString());

    await octokit.repos.update(params);
  } catch (error) {
    core.setFailed(error);
  }
})();
