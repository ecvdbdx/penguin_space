import React from 'react'

export default function PlanetView(props) {
  return (
    <div className="flex pt-12 pl-16 pr-8 flex-grow">
      <div className="flex-grow flex-shrink-0">
        <h2 className="font-semibold text-7xl tracking-tighter mb-4">{props.planet.englishName}</h2>

        <table className="border-collapse">
          <tbody>
            <tr>
              <th className="font-semibold text-left pr-8">Mass</th>
              <td className="py-1">{props.planet.mass.massValue}x10<sup>{props.planet.mass.massExponent}</sup></td>
            </tr>
            <tr>
              <th className="font-semibold text-left pr-8">Density</th>
              <td className="py-1">{props.planet.density} g.cm<sup>3</sup></td>
            </tr>
            <tr>
              <th className="font-semibold text-left pr-8">Gravity</th>
              <td className="py-1">{props.planet.gravity} m.s<sup>-2</sup></td>
            </tr>
            <tr>
              <th className="font-semibold text-left pr-8">Sideral orbit</th>
              <td className="py-1">{props.planet.sideralOrbit} days</td>
            </tr>
            <tr>
              <th className="font-semibold text-left pr-8">Sideral rotation</th>
              <td className="py-1">{props.planet.sideralRotation} hours</td>
            </tr>
            <tr>
              <th className="font-semibold text-left pr-8">Mean radius</th>
              <td className="py-1">{props.planet.meanRadius} km</td>
            </tr>
            <tr>
              <th className="font-semibold text-left pr-8">Semi-major axis</th>
              <td className="py-1">{props.planet.semimajorAxis} km</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="pl-12">
        <img className="planet-preview-image ml-auto mt-8"
             src={`img/${props.planet.englishName.toLowerCase()}.png`}
             alt={props.planet.englishName} />
      </div>
    </div>
  )
}
