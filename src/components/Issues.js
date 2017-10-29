import React from "react";
import { observer, inject } from "mobx-react";

// Styles
import "./Issues.css";
import "../styles/spacing.css";
import "../styles/formatting.css";
import "../styles/display.css";

const Issues = inject("store")(
  observer(
    props =>
      props.store.selectedRepo &&
      (props.store.issues.length > 0 ? (
        <div className="mal text-right">
          {props.store.issues.map((issue, i) => (
            <dl key={issue.id}>
              <dt className="mbs">
                <h3 className="inline-block prm">{issue.title}</h3>
                <span
                  className="mrs arrow"
                  onClick={() => props.store.moveUp(i)}
                >
                  &uarr;
                </span>
                <span className="arrow" onClick={() => props.store.moveDown(i)}>
                  &darr;
                </span>
              </dt>
            </dl>
          ))}
        </div>
      ) : (
        <div className="mal">
          <h3>
            No issues available for{" "}
            <strong
              style={{
                color: "#108ee9",
                fontSize: "20px",
                fontStyle: "italic",
                whiteSpace: "pre"
              }}
            >
              {props.store.selectedRepo.name}
            </strong>. Please add some issues in Github, or try another repo.
          </h3>
        </div>
      ))
  )
);

export default Issues;
