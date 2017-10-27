import github from 'github-api';

export default (token => (
    new github({
        token
    })
));
