import './index.css'

import React from 'react'
import PlanetsList from './components/PlanetsList'
import PlanetView from './components/PlanetView'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      planets: [],
      planet: {}
    }
  }

  componentDidMount() {
    fetch('https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,neq,0')
      .then(data => data.json())
      .then(data => this.setState({
        planets: data.bodies
      }))
    fetch('https://api.le-systeme-solaire.net/rest/bodies/mercure')
      .then(data => data.json())
      .then(data => this.setState({
        planet: data
      }))
  }

  render() {
    return Object.entries(this.state.planet).length > 0 ? <PlanetView planet={this.state.planet} /> : <div></div>
  }
}

export default App
