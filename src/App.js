import React, { Component } from 'react';
import Form from './Form.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="login">
            <div>
                <h1>
                <b>Git </b>
                <i>Priority</i>
                </h1>
                <Form />
            </div>
        </div>
      </div>
    );
  }
}

export default App;
