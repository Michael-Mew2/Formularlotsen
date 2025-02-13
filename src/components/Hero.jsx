import React from 'react'
import HeroPicture from './HeroPicture'
import { useLanguageStore } from '../store'

export default function Hero() {
  const {texts} = useLanguageStore(); 
  return (
    <>
    <div className='hero'>
        <HeroPicture />
        <div className="hero hero--overlay">
          <h1 style={{backgroundColor: "green", margin: "20px", display: "flex"}}>{texts.startseite?.hero?.heroMainTitle || "lädt..."}</h1>
          <h2 style={{backgroundColor: "green", margin: "20px", display: "flex"}}>{texts.startseite?.hero?.heroSubTitle || "lädt..."}</h2>
        </div>
    </div>
    </>
  )
}
