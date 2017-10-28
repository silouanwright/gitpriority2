import React, { Component } from "react";
import { Form, Icon, Input, Button } from "antd";
import { observer, inject } from "mobx-react";
import "./LoginScreen.css";
const FormItem = Form.Item;

class NormalLoginForm extends Component {
  constructor() {
    super();
    this.state = {
      submitted: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          submitted: true
        });
        this.props.store.fetchProjects(values["github-key"]);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator("github-key", {
            rules: [
              { required: true, message: "Please input a valid Github API key" }
            ]
          })(
            <Input
              prefix={<Icon type="github" style={{ fontSize: 12 }} />}
              type="github-key"
              placeholder="Github API key"
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={this.state.submitted && true}
            ghost
            shape={this.state.submitted ? "circle" : null}
          >
            {!this.state.submitted && "Submit"}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

NormalLoginForm = inject("store")(observer(NormalLoginForm));
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

const LoginScreen = () => {
  return (
    <div className="login">
      <div>
        <h1>
          <b>Git </b>
          <i style={{ fontSize: "25px" }}>Priority</i>
        </h1>
        <p>Organize your issues. Plan your sprints.</p>
        <WrappedNormalLoginForm />
      </div>
    </div>
  );
};

export default LoginScreen;
