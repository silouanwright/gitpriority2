import {
    types, onSnapshot, destroy,
    process,
} from "mobx-state-tree";

import { initApi } from './utils/gitFetch';

const localStorageKey = "git-priority";
const defaultState = {
    count: 10,
    githubToken: ''
}

const initialState = localStorage.getItem(localStorageKey)
      ? JSON.parse(localStorage.getItem(localStorageKey))
      : defaultState


const Repo = types.model({
    id: types.number,
    name: types.string,
})

const AppStore = types.model({
    // count: types.optional(types.number, 0)
    state: 'done',
    githubToken: '',
    repos: types.optional(types.array(Repo), [])
}).actions(self => {

    const fetchProjects = process(function* (token) { // <- note the star, this a generator function!
        self.state = "pending"
        try {
            // ... yield can be used in async/await style
            // self.githubProjects = yield initApi()
            let results = yield initApi(token)
            let user = yield Promise.resolve(results.getUser())
            let repos = yield Promise.resolve(user.listRepos());
            self.githubToken = token;
            console.log(repos.data);
            self.repos = repos.data;
            self.state = "done"
        } catch (error) {
            // ... including try/catch error handling
            console.error("Failed to fetch projects", error)
            self.state = "error"
        }
        // The action will return a promise that resolves to the returned value
        // (or rejects with anything thrown from the action)
        return self.state
    })

    return {
        fetchProjects,
        refreshGithubConnection(){
            fetchProjects(self.githubToken)
        },
        saveGithubToken(token){
            self.githubToken = token
        },
    }
})

let store = AppStore.create(initialState)

let snapshotListener;

(function createAppStore(snapshot) {
    // clean up snapshot listener
    if (snapshotListener) snapshotListener()
    // kill old store to prevent accidental use and run clean up hooks
    if (store) destroy(store)

    // create new one
    store = AppStore.create(snapshot)

    // connect local storage
    snapshotListener = onSnapshot(store, snapshot =>
        localStorage.setItem(localStorageKey, JSON.stringify(snapshot))
    )

    return store
})(initialState)

export default store;
