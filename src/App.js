import './index.css'

import React from 'react'
import axios from 'axios'
import PlanetsList from './components/PlanetsList'
import PlanetView from './components/PlanetView'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      planets: [],
      currentPlanetId: ''
    }

    this.currentPlanet = this.currentPlanet.bind(this)
  }

  currentPlanet() {
    return this.state.planets.filter(planet => planet.id === this.state.currentPlanetId)
  }

  setCurrentPlanet(planetId) {
    this.setState({ currentPlanetId: planetId })
  }

  componentDidMount() {
    axios.get('https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,neq,0')
      .then(result => this.setState({ planets: result.data.bodies }))
  }

  renderPlanetView() {
    return this.state.currentPlanetId && <PlanetView planet={this.currentPlanet()} />
  }

  render() {
    return <>
      <PlanetsList planets={this.state.planets}
                   setCurrentPlanetId={planetId => this.setCurrentPlanetId(planetId)} />
      {this.renderPlanetView()}
    </>
  }
}

export default App
