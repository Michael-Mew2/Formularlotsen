import * as React from 'react'

export default function FooterExternal({footerTexts}) {

  return (
    <div className='footerExternal'>
      {footerTexts.footer?.externalLinks.map((content, index) => (
        <p key={index}>
          {content.text}{' '}
          {content.links?.map((link, linkIndex) => (
            <React.Fragment key={linkIndex}>
              <a href={link.url} target="_blank" rel="noopener noreferrer">{link.name}</a>
              {linkIndex < content.links.length - 1 ? ' & ' : ''}
            </React.Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}

