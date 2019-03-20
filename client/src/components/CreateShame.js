import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Auth } from 'aws-amplify'

class CreateShame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      crime: '',
      shame: '',
      file: undefined,
      authData: undefined
    };

    this.handleCrimeChange = this.handleCrimeChange.bind(this);
    this.handleShameChange = this.handleShameChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCrimeChange(event) {
    this.setState({ crime: event.target.value });
  }

  handleShameChange(event) {
    this.setState({ shame: event.target.value });
  }

  handleFileChange(files) {
    console.log('File change', files)
    this.setState({
      file: files[0]
    })
    // this.setState({ shame: event.target.value });
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

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const data = {
        crime: this.state.crime,
        shame: this.state.shame
      }

      const reply = await fetch('https://qbj898xhwe.execute-api.eu-central-1.amazonaws.com/dev/shames', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        headers: {
          "Content-Type": "application/json",
          "Authorization": this.state.authData.idToken.jwtToken
        },
        body: JSON.stringify(data)
      });
      const response = await reply.json();

      console.log('Created shame', response);
      const uploadUrl = response.uploadUrl;
      if (this.state.file) {
        console.log('File to upload', this.state.file)

        await fetch(uploadUrl, {
          method: 'PUT',
          body: this.state.file
        })
      }

      alert('Shame to them!' + JSON.stringify(data));
      this.setState({
        crime: '',
        shame: '',
        file: undefined
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
              onChange={this.handleCrimeChange} />
          </Form.Field>
          <Form.Field>
            <label>Shame</label>
            <input
              placeholder='Give it all you have'
              value={this.state.shame}
              onChange={this.handleShameChange} />
          </Form.Field>
          <Form.Field>
            <label>Evidence</label>
            <input
              type="file"
              accept="image/*"
              placeholder='Give it all you have'
              value={this.file}
              onChange={ (e) => this.handleFileChange(e.target.files) } />
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
