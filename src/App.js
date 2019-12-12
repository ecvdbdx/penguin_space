import './index.css'

import React from 'react'
import axios from 'axios'
import PlanetsList from './components/PlanetsList'
import PlanetView from './components/PlanetView'
import SolarSystem from './components/SolarSystem'

function isPlanet(planet) {
  const planetsIds = ['mercure', 'venus', 'terre', 'mars', 'jupiter', 'saturne', 'uranus', 'neptune', 'pluton']
  return planetsIds.includes(planet.id)
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      planets: [],
      currentPlanetId: ''
    }

    this.currentPlanet = this.currentPlanet.bind(this)
    this.setCurrentPlanetId = this.setCurrentPlanetId.bind(this)
  }

  currentPlanet() {
    return this.state.planets.find(planet => planet.id === this.state.currentPlanetId)
  }

  setCurrentPlanetId(planetId) {
    this.setState({ currentPlanetId: planetId })
  }

  componentDidMount() {
    axios.get('https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,neq,0')
      .then(result => {
        this.setState({
          planets: result.data.bodies.filter(isPlanet)
        })
      })
  }

  renderView() {
    if (!this.state.currentPlanetId) {
      return <SolarSystem planets={this.state.planets} />
    }
    return <PlanetView planet={this.currentPlanet()}
                       homepage={() => this.setCurrentPlanetId('')} />
  }

  render() {
    return <div className="flex">
      <PlanetsList planets={this.state.planets}
                   setCurrentPlanetId={this.setCurrentPlanetId} />
      {this.renderView()}
    </div>
  }
}

export default App
