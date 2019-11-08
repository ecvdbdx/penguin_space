import React from 'react'
import PlanetsList from './components/PlanetsList'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      bodies: [],
      planets: []
    }
  }

  componentDidMount() {
    fetch('https://api.le-systeme-solaire.net/rest/bodies/')
      .then(data => data.json())
      .then(data => this.setState({
        bodies: data.bodies,
        planets: data.bodies.filter(body => body.isPlanet)
      }))
  }

  render() {
    return (
      <PlanetsList bodies={this.state.planets} />
    )
  }
}

export default App
