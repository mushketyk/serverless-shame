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
    // this.setState({
    // })
    // this.UNSAFE_componentWillMount.s
    // this.state.error = undefined
    // this.state.shames = [
    // {
    //   reporter: 'John Woods',
    //   crime: 'Portafilter is dirty',
    //   shame: 'Oh no-no-no',
    //   timestamp: '2019-03-18T13:24:15+0000'
    // },
    // {
    //   reporter: 'Anonymous',
    //   crime: 'Wrongful shaming',
    //   shame: 'Somebody is creating bogus shames',
    //   timestamp: '2019-03-18T13:24:15+0000'
    // }
    // ]
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
    // console.log('GrandChild did mount.');
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
