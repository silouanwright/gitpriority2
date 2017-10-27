import React from "react";
import { observer, inject } from "mobx-react";
import { Button } from "antd";

const Repos = inject("store")(
  observer(props => (
    <div style={{ padding: "15px" }}>
      <Button
        type="primary"
        onClick={() => props.store.refreshGithubConnection()}
      >
        Refresh{" "}
      </Button>
      <ul>
        {props.store.repos.map(repo => <li key={repo.id}>{repo.name}</li>)}
      </ul>
    </div>
  ))
);

export default Repos;
