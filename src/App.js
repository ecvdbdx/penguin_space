import './index.css'

import React from 'react'
import axios from 'axios'
import PlanetsList from './components/PlanetsList'
import PlanetView from './components/PlanetView'

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

  componentWillMount() {
    axios.get('https://api.le-systeme-solaire.net/rest/bodies?filter[]=isPlanet,neq,0')
      .then(result => {
        this.setState({
          planets: result.data.bodies.filter(isPlanet)
        })
      })
  }

  renderPlanetView() {
    return this.state.currentPlanetId && <PlanetView planet={this.currentPlanet()} />
  }

  render() {
    return <div className="flex">
      <PlanetsList planets={this.state.planets}
                   setCurrentPlanetId={this.setCurrentPlanetId} />
      {this.renderPlanetView()}
    </div>
  }
}

export default App
