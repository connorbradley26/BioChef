import NavBar from '@/components/NavBar'
import { Analytics } from '@vercel/analytics/react';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ReactElement } from 'react';
config.autoAddCss = false



export default function RootLayout({children }: {children : ReactElement}): ReactElement {


  return (
    <div className='flex flex-col min-h-screen'>
        <NavBar />
        {children}
        <Analytics />
      </div>
  )
}
