import { types, process } from "mobx-state-tree";
import { fetchGithubIssues, fetchGithubRepos } from "../utils/gitFetch";

const Issue = types.model("Issue", {
  id: types.identifier(types.number),
  title: types.string,
  body: types.maybe(types.string) 
  
});

const Repo = types.model("Repo", {
  id: types.identifier(types.number),
  name: types.optional(types.string, ""),
  owner: types.optional(
    types.model({
      login: ""
    }),
    {}
  )
});

export const AppStore = types
  .model({
    state: "done",
    githubToken: types.maybe(
      types.refinement(types.string, value => value.length > 0)
    ),
    issues: types.optional(types.array(Issue), []),
    repos: types.optional(types.array(Repo), []),
    selectedRepo: types.maybe(types.reference(Repo))
  })
  .actions(self => {
    const fetchProjects = process(function*(token) {
      self.state = "pending";
      try {
        let repos = yield fetchGithubRepos(token);

        self.repos = repos.data;

        // Save the token once we've received repos
        self.githubToken = token;
        self.selectedRepo = null;
      } catch (error) {
        console.error("Failed to fetch projects", error);
        self.state = "error";
      }
      self.state = "done"
      return self.state;
    });

    function refreshGithubConnection() {
      // I could add some loading state here in the future
      self.issues = [];
      self.selectedRepo = null;
      fetchProjects(self.githubToken);
    }

    const fetchIssues = process(function*(name, id) {
      self.state = 'pending'
      const chosenRepo = self.repos.find(repo => repo.id === id)
      if (!self.selectedRepo || self.selectedRepo !== id) {
        let issues = yield fetchGithubIssues(
          self.githubToken,
          chosenRepo.owner.login,
          chosenRepo.name
        );
        self.selectedRepo = chosenRepo.id
        self.issues = issues.data;
      } else {
        self.selectedRepo = null;
      }
      self.state = 'done'
    });

    function saveGithubToken(token) {
      self.githubToken = token;
    }

    function resetApplication() {
      // Must be a way where I could create the store
      // anew with store.create()
      self.githubToken = null;
      self.issues = [];
      self.selectedRepo = null;
    }

    function moveUp(index) {
      if (index !== 0) {
        self.issues = reorder(self.issues, index, index - 1);
      }
    }

    function moveDown(index) {
      if (index !== self.issues.length - 1) {
        self.issues = reorder(self.issues, index, index + 1);
      }
    }

    // a little function to help us with reordering the result
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    };

    return {
      moveUp,
      moveDown,
      fetchProjects,
      refreshGithubConnection,
      fetchIssues,
      saveGithubToken,
      resetApplication
    };
  });
