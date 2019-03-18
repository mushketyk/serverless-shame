import { Auth } from 'aws-amplify';
import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { Grid, Menu, Segment } from 'semantic-ui-react';
import './App.css';
import CreateShame from './components/CreateShame';
import Register from './components/Register';
import ShamesList from './components/ShamesList';
import SignIn from './components/SignIn';

class App extends Component {

  state = { authData: undefined }

  constructor() {
    super();

    this.onSignOut = this.onSignOut.bind(this);
  }

  async componentDidMount() {
    try {
      const authData = await Auth.currentSession();
      console.log('Auth data', authData);
      this.setState({
        authData
      })
    } catch (e) {
      console.log('Error failing current session', e);
    }
  }

  async onSignOut(event) {
    event.preventDefault();

    try {
      await Auth.signOut()
      this.setState({
        authData: undefined
      })
      alert('Signed out')
    } catch (e) {
      console.log('Failed to sign out ', e.message)
      alert('Failed to sign out')
    }
  }

  render() {
    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={20}>
                <Router>
                  <div>
                    {this.generateMenu()}

                    <Route path="/create/" component={CreateShame} />
                    <Route path="/signin/" component={SignIn} />
                    <Route path="/register/" component={Register} />
                    <Route path="/" exact component={ShamesList} />
                  </div>
                </Router>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }

  generateMenu() {
    if (this.state.authData) {
      return (
        <Menu>
          <Menu.Item name='home'>
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item name='create'>
            <Link to="/create/">Create</Link>
          </Menu.Item>

          <Menu.Item name='signout'>
            <a href="#" onClick={this.onSignOut}  >Sign out</a>
          </Menu.Item>

        </Menu>
      )
    } else {
      return (
        <Menu>
          <Menu.Item name='home'>
            <Link to="/">Home</Link>
          </Menu.Item>

          <Menu.Item name='signin'>
            <Link to="/signin">Sign in</Link>
          </Menu.Item>

          <Menu.Item name='register'>
            <Link to="/register">Register</Link>
          </Menu.Item>

        </Menu>
      )
    }
  }
}

export default App;
