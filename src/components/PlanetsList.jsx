import React from 'react'

export default function PlanetsList({ planets }) {
  const items = planets.map((body, index) => {
    return <div key={index}>{body.englishName}</div>
  })

  return (
    <div>{items}</div>
  )
}
