import React from 'react'

class SolarSystem extends React.Component {
  constructor(props) {
    super(props)

    this.mercure = {}
    this.venus = {}
    this.terre = {}
    this.mars = {}
    this.jupiter = {}
    this.saturne = {}
    this.uranus = {}
    this.neptune = {}
    this.pluton = {}
  }

  render() {
    const maxSemimajorAxis = Math.max(...this.props.planets.map(planet => planet.semimajorAxis))
    return (
      <div className="w-120 h-120 relative">
        {this.props.planets.map((planet, index) => {
          return <div key={index}
                      ref={element => this[planet.id] = element}
                      className="absolute border border-solid border-white rounded-full"
                      style={{
                        width: `${100 * planet.semimajorAxis / maxSemimajorAxis}%`,
                        height: `${100 * planet.semimajorAxis / maxSemimajorAxis}%`,
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"
                      }}>
            <div className="w-2 h-2 bg-red-600"
                 style={{
                   backgroundColor: this[planet.id].current && 'green',
                   top: this[planet.id] && this[planet.id].current && (this[planet.id].current.offsetHeight / 2 + this[planet.id].current.offsetHeight * Math.cos(1)),
                   left: this[planet.id] && this[planet.id].current && (this[planet.id].current.offsetWidth / 2 + this[planet.id].current.offsetWidth * Math.sin(1)),
                   transform: "translate(-50%, -50%)"
                 }} />
          </div>
        })}
      </div>
    )
  }
}

export default SolarSystem
