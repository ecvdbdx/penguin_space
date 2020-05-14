import React from 'react'

const SPEED = 10000000

class SolarSystem extends React.Component {
  constructor(props) {
    super(props)

    // Initialise planets angles
    let planetsAngles = {}
    this.props.planets.forEach(({ id }) => {
      planetsAngles[id] = 0
    })

    this.state = {
      rotating: false,
      planetsAngles: planetsAngles
    }

    this.getMaxSemimajorAxis = this.getMaxSemimajorAxis.bind(this)
    this.updatePlanetsAngles = this.updatePlanetsAngles.bind(this)
    this.toggleRotation = this.toggleRotation.bind(this)
  }

  getMaxSemimajorAxis() {
    return Math.max(...this.props.planets.map(planet => planet.semimajorAxis))
  }

  updatePlanetsAngles(interval) {
    let planetsAngles = {}
    this.props.planets.forEach(({ id, sideralOrbit }) => {
      const sideralOrbitInMilliseconds = sideralOrbit * 8.64e+7 // orbital period in milliseconds
      const travelledDistanceInOneInterval = 360 * interval / sideralOrbitInMilliseconds

      planetsAngles[id] = this.state.planetsAngles[id] + travelledDistanceInOneInterval * SPEED
    })

    this.setState({
      planetsAngles: planetsAngles
    })
  }

  toggleRotation() {
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
        <div className="sticky top-0 pt-8 -mt-8 z-20">
          <button className="btn sticky"
                  onClick={this.toggleRotation}>
            Toggle rotation
          </button>
        </div>

        <div className="relative flex-shrink-0 h-0 pb-full">
          {this.props.planets.map((planet, index) => {
            const planetAngle = this.state.planetsAngles[planet.id] || 0 // in degrees

            let planetOrbitDistance = 50 * planet.semimajorAxis / this.getMaxSemimajorAxis()
            // planetOrbitDistance = planetOrbitDistance - this.getMaxSemimajorAxis() / planet.semimajorAxis

            return (
              <>
                <div
                  key={index}
                  className="absolute border border-solid border-white rounded-full z-0 pointer-events-none"
                  style={{
                    width: `${planetOrbitDistance * 2}%`,
                    height: `${planetOrbitDistance * 2}%`,
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                  }}
                />
                <img
                  key={`i${index}`}
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
