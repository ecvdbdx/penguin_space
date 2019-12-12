import React from 'react'

class SolarSystem extends React.Component {
    constructor(props) {
        super(props)

        this.orbitRef = React.createRef();
    }

    render() {
        const maxSemimajorAxis = Math.max(...this.props.planets.map(planet => planet.semimajorAxis))
        return (
            <div className="w-120 h-120 relative ">
                {this.props.planets.map((planet, index) => {
                    return <div key={index}
                        ref="this.orbitRef"
                        className="absolute border border-solid border-white rounded-full"
                        style={{
                            width: `${100 * planet.semimajorAxis / maxSemimajorAxis}%`, height: `${100 * planet.semimajorAxis / maxSemimajorAxis}%`,
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)"
                        }}>
                        <div className="w-2 h-2 bg-red-600"
                            style={{
                                top: `${50 + (1)}%`,
                                left: "50%",
                                transform: "translate(-50%, -50%)"
                            }}></div>
                    </div>
                })}
            </div>
        )
    }
}

export default SolarSystem
