import React from 'react'

export default function Divider({ thickness, color }) {
  return (
    <div className={`divider-component ${thickness} ${color}`}></div>
  )
}
