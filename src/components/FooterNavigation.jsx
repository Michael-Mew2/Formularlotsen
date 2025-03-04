import * as React from 'react'
import { NavLink } from "react-router-dom";

export default function FooterNavigation({footerTexts}) {
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
