import React, { Component } from 'react';
import Shame from './Shame';
import { Card } from 'semantic-ui-react'  

class ShamesList extends Component {
  constructor(props) {
    super(props);
    this.shames = [
      {
        reporter: 'John Woods',
        crime: 'Portafilter is dirty',
        shame: 'Oh no-no-no',
        timestamp: '2019-03-18T13:24:15+0000'
      },
      {
        reporter: 'Anonymous',
        crime: 'Wrongful shaming',
        shame: 'Somebody is creating bogus shames',
        timestamp: '2019-03-18T13:24:15+0000'
      }
    ]
  }

  render() {
    return (
      <div>
        <h1>Shame list</h1>
        <Card.Group>
          {this.shames.map(shame => {
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

export default ShamesList;
