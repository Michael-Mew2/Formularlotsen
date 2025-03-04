import * as React from 'react'
import { NavLink } from "react-router-dom";
import { useFooterLanguageStore, useLanguageStore } from '../store';

export default function FooterNavigation() {
    const {footerTexts, loadFooter} = useFooterLanguageStore();
    const {language} = useLanguageStore();

    React.useEffect(() => {
        loadFooter(language);
    }, [language]);

  return (
    <div className='footerNavigation'>
        <ul>
            {footerTexts.footer?.navLinks.map((item, index) => (
                <li key={index}>
                    <NavLink to={item.route} aria-label={item.ariaLabel}>{item.name}</NavLink>
                </li>
            ))}
        </ul>
    </div>
  )
}
