import React from 'react';
import { Form, Segment, Button, Label, Divider } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import TextInput from '../../../app/form/TextInput';
import { connect } from 'react-redux';
import { registerUser } from './authActions'
import { combineValidators, isRequired } from 'revalidate'
import SocialLogin from '../SocialLogin/SocialLogin';
import { socialLogin } from './authActions'
const actions = {
    registerUser, socialLogin
}

const validate = combineValidators({
    displayName: isRequired('Display name is required'),
    email: isRequired('Email is needed'),
    password: isRequired('Password is needed')
})
const RegisterForm = ({ handleSubmit, registerUser, error, invalid, submitting, socialLogin }) => {

    return (
        <div>
            <Form autoComplete='off' size="large" onSubmit={handleSubmit(registerUser)}>
                <Segment>
                    <Field
                        name="displayName"
                        type="text"
                        component={TextInput}
                        placeholder="Known As"
                    />
                    <Field
                        name="email"
                        type="text"
                        component={TextInput}
                        placeholder="Email"
                    />
                    <Field
                        name="password"
                        type="password"
                        component={TextInput}
                        placeholder="Password"
                    />
                    {error && <Label basic color='red'>{error}</Label>}
                    <Button disabled={invalid || submitting} fluid size="large" color="teal">
                        Register
          </Button>
                    <Divider horizontal> Or </Divider>

                    <SocialLogin socialLogin={socialLogin} />
                </Segment>
            </Form>
        </div>
    );
};

export default connect(null, actions)(reduxForm({ form: 'registerForm', validate })(RegisterForm));