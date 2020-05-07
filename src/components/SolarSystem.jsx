import React from 'react'

class SolarSystem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      rotating: false
    }

    this.maxSemimajorAxis = this.maxSemimajorAxis.bind(this)
    this.updatePlanetsAngles = this.updatePlanetsAngles.bind(this)
  }

  maxSemimajorAxis() {
    return Math.max(...this.props.planets.map(planet => planet.semimajorAxis))
  }

  updatePlanetsAngles(interval) {
    this.props.planets.forEach(({ id, sideralOrbit }) => {
      const sideralOrbitInMilliseconds = sideralOrbit * 8.64e+7 // orbital period in milliseconds
      const travelledDistanceInOneInterval = 360 * interval / sideralOrbitInMilliseconds

      // console.log(id, sideralOrbitInMilliseconds)

      this.setState({
        [id]: this.state[id] + travelledDistanceInOneInterval
      })
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.state.rotating && this.props.planets.length > 0) {
      this.setState({ rotating: true })

      // Initialise planets angles
      this.props.planets.forEach(({ id }) => {
        this.setState({
          [id]: 0
        })
      })

      const interval = 1 // in milliseconds
      setInterval(() => this.updatePlanetsAngles(interval), interval)
    }
  }

  render() {
    return (
      <div className="w-160 h-160 relative flex-shrink-0">
        {this.props.planets.map((planet, index) => {
          const planetAngle = this.state[planet.id] // in degrees

          const planetOrbitDistance = 50 * planet.semimajorAxis / this.maxSemimajorAxis()

          return (
            <>
              <div key={index}
                   className="absolute border border-solid border-white rounded-full z-0"
                   style={{
                     width: `${planetOrbitDistance * 2}%`,
                     height: `${planetOrbitDistance * 2}%`,
                     top: "50%",
                     left: "50%",
                     transform: "translate(-50%, -50%)"
                   }} />
              <img src={`img/${planet.englishName.toLowerCase()}.png`}
                   onClick={() => this.props.setCurrentPlanetId(planet.id)}
                   className="absolute h-8 cursor-pointer z-10"
                   style={{
                     top: `${50 - planetOrbitDistance * Math.sin(planetAngle * (Math.PI / 180))}%`,
                     left: `${50 + planetOrbitDistance * Math.cos(planetAngle * (Math.PI / 180))}%`,
                     transform: "translate(-50%, -50%)"
                   }}
                   alt={planet.englishName} />
            </>
          )
        })}
      </div>
    )
  }
}

export default SolarSystem
