import React, {Component} from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';

import { API_ROOT } from '../constants';
import md5 from "md5";

class RegistrationForm extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                fetch(`${API_ROOT}/ownerregister`, {
                    method: 'POST',
                    body: JSON.stringify({
                        owner_id: values.username,
                        password: md5(values.username + md5(values.password)),
                        firstname: values.firstname,
                        lastname: values.lastname,
                        phone: values.phone,
                        email: values.email,
                        zipcode: values.zipcode,
                        city: values.city,
                        address: values.address,
                    }),
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.text();
                        }
                        throw new Error(response.statusText);
                    })
                    .then((data) => {
                        console.log('===== ', data);
                        let dataStatus = '{"status":"OK"}'
                        if(data === dataStatus){
                            message.success("Registration succeed.");
                        }else{
                            message.success("User already exist.");
                        }

                    })
                    .catch((err) => {
                        console.error(err);
                        message.error('Registration failed.');
                    });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="register">
                <Form.Item
                    label="Username"
                >
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password />)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>

                <Form.Item
                    label="First name"
                >
                    {getFieldDecorator('firstname', {
                        rules: [{ required: true, message: 'Please input your first name!' }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item
                    label="Last name"
                >
                    {getFieldDecorator('lastname', {
                        rules: [{ required: true, message: 'Please input your last name!' }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item
                    label="Phone"
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item
                    label="Email"
                >
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please input your email address!' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item
                    label="Zipcode"
                >
                    {getFieldDecorator('zipcode', {
                        rules: [{ required: true, message: 'Please input your zipcode!' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item
                    label="City"
                >
                    {getFieldDecorator('city', {
                        rules: [{ required: true, message: 'Please input your city!' }],
                    })(<Input />)}
                </Form.Item>
                <Form.Item
                    label="Address"
                >
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: 'Please input your address!' }],
                    })(<Input />)}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    <p>I already have an account, go back to <Link to="/ownerlogin">login as owner</Link></p>
                </Form.Item>
            </Form>
        );
    }
}

export const OwnerRegister = Form.create({ name: 'ownerregister' })(RegistrationForm);