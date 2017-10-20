import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import './App.css';
import github from 'github-api';
const FormItem = Form.Item;

class NormalLoginForm extends Component {

    constructor(){
        super();
        this.state = {
            submitted: false,
            repos: [],
            issues: []
        }
    }

    componentDidMount() {
        var gitpriority = sessionStorage.getItem('gitpriority');
        console.log(gitpriority);
        let parsed = JSON.parse(gitpriority);
        console.log("parsed", parsed);
        if (parsed.api_token){
            this.githubLogin(parsed.api_token);
        }
    }

    githubLogin(token) {

        var gh = new github({
            token
        });

        var me = gh.getUser();

        me.listRepos()
            .then(({data: reposJson}) => {
                this.setState({
                    repos: reposJson
                })

                let repo = reposJson.find(repo => {
                    return repo.name === 'dotfiles'
                })

                gh.getIssues(repo.owner.login, repo.name).listIssues()
                    .then(response => {
                        console.log("specific issue", response.data)
                })
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    submitted: true
                })
                const json = {
                    'api_token': values['github-key']
                }

                sessionStorage.setItem('gitpriority', JSON.stringify(json));
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
                <Form layout="inline" onSubmit={this.handleSubmit} className="login-form">
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
                <div>
            </div>
                </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;

