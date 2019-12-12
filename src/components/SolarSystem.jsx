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
      <div className="w-120 h-120 relative">
        {this.props.planets.map((planet, index) => {
          const planetAngle = 45 // in degrees
          const planetOrbitDistance = 50 * planet.semimajorAxis / this.maxSemimajorAxis()
          return (
            <div key={index}
                 className="absolute border border-solid border-white rounded-full"
                 style={{
                   width: `${planetOrbitDistance * 2}%`,
                   height: `${planetOrbitDistance * 2}%`,
                   top: "50%",
                   left: "50%",
                   transform: "translate(-50%, -50%)"
                 }}>
              <div className="absolute w-2 h-2 bg-red-600 rounded-full"
                   style={{
                     top: `${50 - 50 * Math.sin(planetAngle * (Math.PI / 180))}%`,
                     left: `${50 + 50 * Math.cos(planetAngle * (Math.PI / 180))}%`,
                     transform: "translate(-50%, -50%)"
                   }} />
            </div>
          )
        })}
      </div>
    )
  }
}

export default SolarSystem
