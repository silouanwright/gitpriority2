import {
    types, onSnapshot, getSnapshot, destroy,
    flow
} from "mobx-state-tree";

const localStorageKey = "git-priority";
const defaultState = {
    count: 10,
    githubToken: ''
}

const initialState = localStorage.getItem(localStorageKey)
      ? JSON.parse(localStorage.getItem(localStorageKey))
      : defaultState

const AppStore = types.model({
    // count: types.optional(types.number, 0)
    count: 0,
    githubToken: '',
}).actions(self => {
    return {
        saveGithubToken(token){
            self.githubToken = token
        },
        increment(){
            self.count++
        },
        decrement() {
            self.count--
        }
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
