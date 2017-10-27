import React from 'react';
import { observer, inject } from "mobx-react";
import store from '../store';

const Count = inject("store")(observer(props =>
    <div>
        My awesome counter:
        <button onClick={() => props.store.decrement()}>-</button>
        {props.store.count}
        <button onClick={() => props.store.increment()}>+</button>
        <button onClick={() => props.store.saveGithubToken('abc')}>+</button>
        <input value={props.store.githubToken} readOnly />
    </div>
));

export default Count
