import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'
import { Auth } from 'aws-amplify';

class Register extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      givenName: '',
      familyName: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleGivenNameChange = this.handleGivenNameChange.bind(this);
    this.handleFamilyNameChange = this.handleFamilyNameChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleGivenNameChange(event) {
    this.setState({givenName: event.target.value});
  }

  handleFamilyNameChange(event) {
    this.setState({familyName: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();

    const data = await Auth.signUp({
      username: this.state.email,
      password: this.state.password,
      attributes: {
          given_name: this.state.givenName,
          family_name: this.state.familyName
      },
      validationData: []
    });

    alert('Successful authentication');
  }

  render() {
    return (
      <div>
        <h1>Register</h1>

        <Form
          onSubmit={this.handleSubmit}
        >
          <Form.Field>
            <label>Email</label>
            <input
              placeholder='Email'
              value={this.state.username}
              onChange={this.handleEmailChange}/>
          </Form.Field>

          <Form.Field>
            <label>Password</label>
            <input
              placeholder='Password'
              value={this.state.password}
              onChange={this.handlePasswordChange}/>
          </Form.Field>

          <Form.Field>
            <label>Given name</label>
            <input
              placeholder='Given name'
              value={this.state.givenName}
              onChange={this.handleGivenNameChange}/>
          </Form.Field>

          <Form.Field>
            <label>Family name</label>
            <input
              placeholder='Family name'
              value={this.state.familyName}
              onChange={this.handleFamilyNameChange}/>
          </Form.Field>

          <Button
            type='submit'
          >
            Register
          </Button>
        </Form>
      </div>

    )
  }
}

export default Register;
