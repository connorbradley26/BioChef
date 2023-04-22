import NavBar from '@/components/nav-bar'
import { Analytics } from '@vercel/analytics/react';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ReactElement } from 'react';
config.autoAddCss = false



export default function RootLayout({children }: {children : ReactElement}): ReactElement {


  return (
    <>
        <NavBar />
        {children}
        <Analytics />
      </>
  )
}
