import React, {Component} from 'react';
import {Form, Icon, Input, Button, message } from "antd";
import md5 from 'md5';
import { Link } from 'react-router-dom';
import { API_ROOT } from '../constants';


class NormalLoginForm extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                fetch(`${API_ROOT}/sitterlogin`, {
                    method: 'POST',
                    body: JSON.stringify({
                        user_id: values.username,
                        // password: md5(values.username + md5(values.password)),
                        password: values.password
                    }),
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.text();
                        }
                        throw new Error(response.stateText);
                    })
                    .then((data) => {
                        console.log(data);

                        //step4: 登录成功，保存token -> 用于实现持久登录

                        this.props.handleLoginSucceed(data);
                        message.success('Login succeed!');
                    })
                    .catch((err) => {
                        console.error(err);
                        message.error('Login failed.');
                    });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="sitter-login-form">
                <a>
                    Login as pet sitter here.
                </a>

                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="sitter-login-form-button">
                        Log in
                    </Button>
                    Or <Link to="/sitterregister">register to become a sitter now!</Link>
                </Form.Item>
            </Form>
        );
    }
}

export const SitterLogin = Form.create({ name: 'normalSitter_login' })(NormalLoginForm);