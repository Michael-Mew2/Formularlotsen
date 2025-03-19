import React from 'react'
import { useHeroPictureStore } from '../store'

export default function HeroPicture() {
    const heroPicture = useHeroPictureStore((state) => state.heroPicture)
    const heroAlt = useHeroPictureStore((state) => state.heroAlt)
    // console.log("1:", heroPicture, "; 2:", heroAlt);
    
  return (
    <>
    <img className='hero hero--picture' src={heroPicture} alt={heroAlt} />
    </>
  )
}
