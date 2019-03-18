import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react'

class CreateShame extends Component {
  render() {
    return (
      <div>
        <h1>Create</h1>

        <Form>
          <Form.Field>
            <label>Crime</label>
            <input placeholder='Something awful' />
          </Form.Field>
          <Form.Field>
            <label>Shame</label>
            <input placeholder='Give it all you have' />
          </Form.Field>
          <Button type='submit'>Shame!</Button>
        </Form>
      </div>

    )
  }
}

export default CreateShame;
