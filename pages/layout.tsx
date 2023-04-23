import NavBar from '@/components/NavBar'
import { Analytics } from '@vercel/analytics/react';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ReactElement } from 'react';
import Head from 'next/head';
config.autoAddCss = false



export default function RootLayout({children }: {children : ReactElement}): ReactElement {


  return (
    <div className='flex flex-col min-h-screen'>
        <Head>
          <title>Bio Chef | Meal Plans For Your Bodies Needs</title>
        </Head>
        <NavBar />
        {children}
        <Analytics />
      </div>
  )
}
