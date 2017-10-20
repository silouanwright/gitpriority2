import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './App.css';
const FormItem = Form.Item;

class NormalLoginForm extends Component {

  constructor(){
      super();
      this.state = {
          submitted: false,
      }
  }

  componentDidMount(){
    sessionStorage.setItem('gitpriority', 'hey');
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          this.setState({
              submitted: true
          })
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline" onSubmit={this.handleSubmit} className="login-form">
            <h1><b>Git</b> <i>Priority</i></h1>
        <FormItem>
          {getFieldDecorator('github-key', {
              rules: [{ required: true, message: 'Please input a valid Github API key' }],
          })(
            <Input
              prefix={
                <Icon type="github" style={{ fontSize: 12 }} />
              }
              type="github-key"
              placeholder="Github API key"
            />
          )}
        </FormItem>
        <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button" loading={this.state.submitted && true} ghost shape={this.state.submitted ? "circle" : null }>
                {!this.state.submitted && "Submit"}
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;

