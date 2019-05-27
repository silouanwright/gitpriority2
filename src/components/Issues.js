import React from 'react';
import { observer, inject } from 'mobx-react';

// Styles
import './Issues.css';
import '../styles/spacing.css';
import '../styles/formatting.css';
import '../styles/display.css';

const NoIssues = inject('store')(
    observer(({ store })  => (
        <div className="mal">
            <h3>
                No issues available for{' '}
                <strong
                    style={{
                        color: '#108ee9',
                        fontSize: '20px',
                        fontStyle: 'italic',
                        whiteSpace: 'pre',
                    }}
                >
                    {store.selectedRepo.name}
                </strong>
                . Please add some issues in Github, or try another repo.
            </h3>
        </div>
    )),
);

const Issue = ({ id, title, index, moveUp, moveDown }) => (
    <dl key={id}>
        <dt className="mbs">
            <h3 className="inline-block prm">{title}</h3>
            <span className="mrs arrow" onClick={() => moveUp(index)}>
                &uarr;
            </span>
            <span className="arrow" onClick={() => moveDown(index)}>
                &darr;
            </span>
        </dt>
    </dl>
);

const IssuesList = inject('store')(
    observer(props => (
        <div className="mal text-right">
            {props.store.issues.map((issue, i) => (
                <Issue
                    key={issue.id}
                    id={issue.id}
                    title={issue.title}
                    index={i}
                    moveUp={props.store.moveUp}
                    moveDown={props.store.moveDown}
                />
            ))}
        </div>
    )),
);

const Issues = inject('store')(
    observer(
        ({ store }) => {
            if (store.state === 'pending') return <h1>Loading...</h1>
            if (store.selectedRepo && store.issues.length > 0) return <IssuesList />
            return <NoIssues repoName={store.selectedRepo.name} />
        }
    ),
);

export default Issues;
