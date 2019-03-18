import React, { Component } from 'react';
import ShamesList from './components/ShamesList'
import './App.css';
import CreateShame from './components/CreateShame';
import SignIn from './components/SignIn';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import {
  Menu,
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'

class App extends Component {

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    // const { activeItem } = this.state

    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={20}>
                <Router>
                  <div>
                    <Menu>
                      <Menu.Item name='home'
                        onClick={this.handleItemClick} >
                        <Link to="/">Home</Link>
                      </Menu.Item>

                      <Menu.Item
                        name='create'
                        onClick={this.handleItemClick}
                      >
                        <Link to="/create/">Create</Link>
                      </Menu.Item>

                      <Menu.Item
                        name='signin'
                        onClick={this.handleItemClick}
                      >
                        <Link to="/signin">Sign in</Link>
                      </Menu.Item>

                    </Menu>

                    <Route path="/create/" component={CreateShame} />
                    <Route path="/signin/" component={SignIn} />
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
}

export default App;
