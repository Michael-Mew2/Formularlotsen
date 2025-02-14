import React from 'react'
import { useLanguageStore } from '../store'

export default function LanguageSelector() {
    const {setLanguage} = useLanguageStore();

    
  return (
    <>
      <button onClick={() => setLanguage("de")}>🇩🇪 Deutsch</button>
      <button onClick={() => setLanguage("en")}>🇬🇧 English</button>  
      <button onClick={() => setLanguage("en")}>🇬🇧 English</button>  
      <button onClick={() => setLanguage("en")}>🇬🇧 English</button>  
      <button onClick={() => setLanguage("en")}>🇬🇧 English</button>  
      <button onClick={() => setLanguage("en")}>🇬🇧 English</button>  
    </>
  )
}
