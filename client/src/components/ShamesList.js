import React, { Component } from 'react';
import Shame from './Shame';
import { Card } from 'semantic-ui-react'

class ShamesList extends Component {

  // state = { error: undefined,
  //   shames: []
  // }

  constructor(props) {
    super(props);
    this.state = {
      error: undefined,
      shames: []
    }
  }

  async componentDidMount() {
    try {
      console.log('Fetching shames')
      const response = await fetch('https://qbj898xhwe.execute-api.eu-central-1.amazonaws.com/dev/shames')
      const shames = await response.json()
      console.log('Fetched shames', shames)
      this.setState({
        shames,
        error: undefined
      })

    } catch (e) {
      this.setState({
        shames: [],
        error: e.message
      })
    }
  }

  render() {
    console.log('State', this.state)
    if (this.state.error) {
      return <p>{this.state.error}</p>
    } else {
      return (
        <div>
          <h1>Shame list</h1>
          <Card.Group>
            {this.state.shames.map(shame => {
              return <Shame
                shame={shame}
              />
            })
            }
          </Card.Group>
        </div>
      )
    }
  }


}

export default ShamesList;
