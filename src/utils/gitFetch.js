import github from 'github-api';

export let api = null;

export const initApi = (token) => {
    api = new github({
        token
    });
    return api;
}
