import React from 'react'

export default function PlanetsList(props) {
  return (
    <div className="flex flex-col items-center flex-shrink-0 py-8 px-4">
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
