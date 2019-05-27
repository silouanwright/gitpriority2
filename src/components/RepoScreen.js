import React from "react";

// Components
import Repos from "./Repos";
import Issues from "./Issues";

// Styles
import "../styles/display.css";

const RepoScreen = () => (
  <div className="row container">
    <Repos />
    <Issues />
  </div>
);

export default RepoScreen;
