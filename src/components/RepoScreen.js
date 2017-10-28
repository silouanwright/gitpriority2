import React from "react";
import { observer, inject } from "mobx-react";

// Components
import Repos from "./Repos";
import Issues from "./Issues";

// Styles
import "../styles/display.css";

const RepoScreen = inject("store")(
  observer(props => (
    <div className="row container">
      <Repos />
      <Issues />
    </div>
  ))
);

export default RepoScreen;
