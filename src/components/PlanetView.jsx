import React from 'react'
import { directive } from '@babel/types'

export default function PlanetView(props) {
  console.log(props)
  return (
    <div className="flex">
      <div className="w-1/3">
        <h2 className="font-semibold text-7xl mb-4">Mercury</h2>
        <p className="mb-16">Mercury is the closest planet to the sun and the eighth largest. It has a diameter of 4,880 kilometers. Mercury has the widest temperature extremes in the solar system ranging from 90 degrees Kelvin to 700 degrees Kelvin. Mercury has a thick iron core and a thinner outer crust of rocky material.
        </p>
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
          </tbody>
        </table>
      </div>
      <div className="w-2/3">
        <img className="w-8/12 ml-auto" src="./img/mercury.png" alt="mercure" />
      </div>
    </div>
  )
}
