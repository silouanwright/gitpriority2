import github from "github-api";

// Goals:
//
// 1. Normalize github library (some methods return promises, others don't)
// 2. Don't make any requests unless necessary.
// 3. If we already have an instance, use it again

export let api = null;
export let user = null;

const initApi = token => {
  api = new github({
    token
  });
  return api;
};

const fetchGithubUser = token => {
  api = api || initApi(token);
  return api.getUser();
};

export const fetchGithubRepos = token => {
  user = user || fetchGithubUser(token);
  return Promise.resolve(user.listRepos());
};

export const fetchGithubIssues = (token, login, repo) => {
  api = api || initApi(token);
  return api.getIssues(login, repo).listIssues();
};
