import React from "react";
import { observer, inject } from "mobx-react";

// Components
import RepoScreen from "./components/RepoScreen.js";
import LoginScreen from "./components/LoginScreen.js";

const App = inject("store")(
  observer(({ store }) => (
    <div>{!store.githubToken ? <LoginScreen /> : <RepoScreen />}</div>
  ))
);

export default App;
