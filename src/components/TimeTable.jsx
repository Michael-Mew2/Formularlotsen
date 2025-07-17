import * as React from 'react';
import { useLanguageStore } from '../store';

export default function TimeTable({position}) {
    const [loading, setIsLoading] = React.useState(true);
    const {language} = useLanguageStore();

  return (
    <div className={`${position}`}>
        <p>Das ist ein kleiner Text</p>
    </div>
  )
}
