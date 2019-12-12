import React from 'react'

class SolarSystem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      orbitsRefs: {}
    }

    this.maxSemimajorAxis = this.maxSemimajorAxis.bind(this)
  }

  maxSemimajorAxis() {
    return Math.max(...this.props.planets.map(planet => planet.semimajorAxis))
  }

  render() {
    return (
      <div className="w-160 h-160 relative">
        {this.props.planets.map((planet, index) => {
          const planetAngle = 0 // in degrees
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
                   }} />
            </>
          )
        })}
      </div>
    )
  }
}

export default SolarSystem
