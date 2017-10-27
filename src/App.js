import React from 'react';
import { observer, inject } from "mobx-react";

// Components
import RepoScreen from './components/Count'
import LoginScreen from './components/Form.js';

const App = inject('store')(observer(({ store }) => (
    <div>
        {!store.githubToken ? (
            <LoginScreen />
        ) : (
            <RepoScreen />
        )}
    </div>
)))

export default App;
