import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Auth } from 'aws-amplify';

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();

    const user = await Auth.signIn(this.state.email, this.state.password);

    console.log('Auth user: ', user)
    console.log('JWT token: ', user.signInUserSession.accessToken.jwtToken)
    alert('Signed in');
  }

  render() {
    return (
      <div>
        <h1>Sign in</h1>

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
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}/>
          </Form.Field>

          <Button
            type='submit'
          >
            Sign in
          </Button>
        </Form>
      </div>

    )
  }
}

export default SignIn;
