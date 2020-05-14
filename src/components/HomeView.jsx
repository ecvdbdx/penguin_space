import React from 'react'
import SolarSystem from './SolarSystem'

function HomeView(props) {
  return (
    <div className="flex-grow pt-12 pl-16 pr-8">
      <div>
        <div>
          <h2 className="font-semibold text-7xl tracking-tighter leading-none mb-8">
            Solar<br />System
          </h2>
          <p>Select on a planet from the left pane to visualise some information related to it.</p>
        </div>

        <div>
          {props.planets.length > 0 &&
          <SolarSystem
            planets={props.planets}
            setCurrentPlanetId={props.setCurrentPlanetId}
          />}
        </div>
      </div>
    </div>
  )
}

export default HomeView
