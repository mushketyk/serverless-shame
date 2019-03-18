import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'

class CreateShame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      crime: '',
      shame: ''
    };

    this.handleCrimeChange = this.handleCrimeChange.bind(this);
    this.handleShameChange = this.handleShameChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCrimeChange(event) {
    this.setState({crime: event.target.value});
  }

  handleShameChange(event) {
    this.setState({shame: event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      await fetch('https://qbj898xhwe.execute-api.eu-central-1.amazonaws.com/dev/shames', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state)
      });

      alert('Shame to them!' + JSON.stringify(this.state));
      this.setState({
        crime: '',
        shame: ''
      })
    } catch (e) {
      alert('Uff... Could not shame: ' + e.message);
    }
  }

  render() {
    return (
      <div>
        <h1>Create</h1>

        <Form
          onSubmit={this.handleSubmit}
        >
          <Form.Field>
            <label>Crime</label>
            <input
              placeholder='Something awful' 
              value={this.state.crime}
              onChange={this.handleCrimeChange}/>
          </Form.Field>
          <Form.Field>
            <label>Shame</label>
            <input
              placeholder='Give it all you have'
              value={this.state.shame}
              onChange={this.handleShameChange}/>
          </Form.Field>
          <Button
            type='submit'
          >
            Shame!
          </Button>
        </Form>
      </div>

    )
  }
}

export default CreateShame;
