import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import store from "./stores/store.js";
import { Provider } from "mobx-react";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
