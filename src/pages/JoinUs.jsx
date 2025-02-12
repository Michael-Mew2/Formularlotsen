import * as React from 'react'
import { useHeroPictureStore, useLanguageStore } from '../store'

export default function JoinUs() {
    const {texts, setPage} = useLanguageStore();
    const setHeroPicture = useHeroPictureStore((state) => state.setHeroPicture);
    const setHeroAlt = useHeroPictureStore((state)=> state.setHeroAlt);
    
    React.useEffect(() => {
        setHeroPicture("images/heroImages/AdobeStock_566575988.jpeg");
        setHeroAlt("Eine Gruppe von Menschen gibt sich zusammen die Hände");
        setPage("pages/join");
    }, []);

  return (
    <div className='joinUs'>
              <h1>{texts.join?.title || "lädt..."}</h1>
              <p>{texts.join?.description || "lädt..."}</p>
    </div>
  )
}
