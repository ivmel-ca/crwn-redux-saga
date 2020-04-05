import React from 'react';
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import './sign-up.styles.scss';
import {signUpStart} from "../../redux/user/user.actions";

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword} = this.state;
        const { signUpStart } = this.props;

        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        signUpStart({
            displayName,
            email,
            password
        });

        this.setState({
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
    };

    handleChange = event => {
      const  { name, value } = event.target;
      this.setState({[name]: value});

    };

    render() {
        const {displayName, email, password, confirmPassword} = this.state;

        return (
            <div className="sign-up">
                <h2 className="title">
                    I do not have an account
                </h2>
                <span>
                    Sign up with your email and password
                </span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                    type="text"
                    name="displayName"
                    label="displayName"
                    value={ displayName }
                    onChange={ this.handleChange }
                    required
                    />
                    <FormInput
                        type="email"
                        name="email"
                        label="email"
                        value={ email }
                        onChange={ this.handleChange }
                        required
                    />
                    <FormInput
                        type="password"
                        name="password"
                        label="password"
                        value={ password }
                        onChange={ this.handleChange }
                        required
                    />
                    <FormInput
                        type="password"
                        name="confirmPassword"
                        label="confirmPassword"
                        value={ confirmPassword }
                        onChange={ this.handleChange }
                        required
                    />
                    <CustomButton type="submit"  >SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    signUpStart: data => dispatch(signUpStart(data))
});

export default connect(null, mapDispatchToProps)(SignUp);