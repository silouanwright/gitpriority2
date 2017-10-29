import { onSnapshot, destroy } from "mobx-state-tree";
import { AppStore } from "./AppStore.js";

const localStorageKey = "git-priority";

const defaultState = {
  githubToken: null,
  selectedRepo: null
};

const initialState = localStorage.getItem(localStorageKey)
  ? JSON.parse(localStorage.getItem(localStorageKey))
  : defaultState;

let store = AppStore.create(initialState);

let snapshotListener;

(function createAppStore(snapshot) {
  // clean up snapshot listener
  if (snapshotListener) snapshotListener();
  // kill old store to prevent accidental use and run clean up hooks
  if (store) destroy(store);

  // create new one
  store = AppStore.create(snapshot);

  // connect local storage
  snapshotListener = onSnapshot(store, snapshot =>
    localStorage.setItem(localStorageKey, JSON.stringify(snapshot))
  );

  return store;
})(initialState);

export default store;
