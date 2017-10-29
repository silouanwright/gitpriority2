import React from "react";
import { observer, inject } from "mobx-react";
import { Button } from "antd";
import "./RepoScreen.css";
import "../styles/spacing.css";

const Repos = inject("store")(
  observer(props => (
    <div className="mal text-center">
      <div>
        <Button
          type="primary"
          onClick={() => props.store.refreshGithubConnection()}
          className="mbm inline-block"
        >
          Reset Page
        </Button>
      </div>
      <div>
        <Button
          type="primary"
          onClick={() => props.store.removeGithubToken()}
          className="mbm inline-block"
          ghost
        >
          Reset Application
        </Button>
      </div>
      <ul>
        {props.store.repos.map(repo => (
          <li key={repo.id}>
            <a
              href={`/issues/${repo.name}/`}
              className="mrm"
              onClick={e => props.store.fetchIssues(e, repo.name, repo.id)}
            >
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  ))
);

export default Repos;
