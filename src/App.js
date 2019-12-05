import './index.css'

import React from 'react'
import PlanetsList from './components/PlanetsList'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      planets: []
    }
  }

  componentDidMount() {
    fetch('https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,neq,0')
      .then(data => data.json())
      .then(data => this.setState({
        planets: data.bodies
      }))
  }

  render() {
    return (
      <PlanetsList planets={this.state.planets} />
    )
  }
}

export default App
