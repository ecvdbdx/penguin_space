import React from 'react'

function PlanetsList(props) {
  return (
    <div className="flex flex-col items-center justify-around flex-shrink-0 h-screen overflow-auto p-4">
      {props.planets.map((planet, index) => {
        return <div key={index}
                    onClick={() => props.setCurrentPlanetId(planet.id)}
                    className="mb-4 cursor-pointer">
          <img src={`img/${planet.englishName.toLowerCase()}.png`}
               className="h-16"
               alt={planet.englishName} />
        </div>
      })}
    </div>
  )
}

export default PlanetsList
