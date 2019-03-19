import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react'

class Shame extends Component {
  render() {
    return (
    <Card>
      <Card.Content>
        <Card.Header>{this.props.shame.crime}</Card.Header>
        {
          this.props.shame.imageUrl &&
          <Image src={this.props.shame.imageUrl} />
        }
        <Card.Meta>{this.props.shame.reporter}</Card.Meta>
        <Card.Meta>{this.props.shame.timestamp}</Card.Meta>
        <Card.Description>
          {this.props.shame.shame}
        </Card.Description>
      </Card.Content>
    </Card>
    )
  }
}

export default Shame;
