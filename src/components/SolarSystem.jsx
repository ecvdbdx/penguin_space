import React from 'react'

class SolarSystem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rotating: false
    }

    // Initialise planets angles
    this.props.planets.forEach(({ id }) => {
      this.state = {
        ...this.state,
        [id]: 0
      }
    })

    this.getMaxSemimajorAxis = this.getMaxSemimajorAxis.bind(this)
    this.updatePlanetsAngles = this.updatePlanetsAngles.bind(this)
    this.rotatePlanets = this.rotatePlanets.bind(this)
  }

  getMaxSemimajorAxis() {
    return Math.max(...this.props.planets.map(planet => planet.semimajorAxis))
  }

  updatePlanetsAngles(interval) {
    this.props.planets.forEach(({ id, sideralOrbit }) => {
      const sideralOrbitInMilliseconds = sideralOrbit * 8.64e+7 // orbital period in milliseconds
      const travelledDistanceInOneInterval = 360 * interval / sideralOrbitInMilliseconds

      this.setState({
        [id]: this.state[id] + travelledDistanceInOneInterval * 10000000
      })
    })
  }

  rotatePlanets() {
    this.setState({ rotating: !this.state.rotating })

    if (!this.state.rotating) {
      const interval = 10 // in milliseconds
      this.refreshPlanetsAngles = setInterval(() => this.updatePlanetsAngles(interval), interval)
    } else {
      clearInterval(this.refreshPlanetsAngles)
    }
  }

  componentWillUnmount() {
    clearInterval(this.refreshPlanetsAngles)
  }

  render() {
    return (
      <>
        <button className="btn"
                onClick={this.rotatePlanets}>
          Rotate planets
        </button>
        <div className="w-160 h-160 relative flex-shrink-0">
          {this.props.planets.map((planet, index) => {
            const planetAngle = this.state[planet.id] || 0 // in degrees

            let planetOrbitDistance = 50 * Math.log(planet.semimajorAxis) / Math.log(this.getMaxSemimajorAxis())
            planetOrbitDistance = planetOrbitDistance - Math.log(this.getMaxSemimajorAxis()) / Math.log(planet.semimajorAxis)

            return (
              <>
                <div
                  key={index}
                  className="absolute border border-solid border-white rounded-full z-0"
                  style={{
                    width: `${planetOrbitDistance * 2}%`,
                    height: `${planetOrbitDistance * 2}%`,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                  }}
                />
                <img
                  alt={planet.englishName}
                  className="absolute h-6 cursor-pointer z-10"
                  src={`img/${planet.englishName.toLowerCase()}.png`}
                  style={{
                    top: `${50 - planetOrbitDistance * Math.sin(planetAngle * (Math.PI / 180))}%`,
                    left: `${50 + planetOrbitDistance * Math.cos(planetAngle * (Math.PI / 180))}%`,
                    transform: "translate(-50%, -50%)"
                  }}
                  onClick={() => this.props.setCurrentPlanetId(planet.id)}
                />
              </>
            )
          })}
        </div>
      </>
    )
  }
}

export default SolarSystem
