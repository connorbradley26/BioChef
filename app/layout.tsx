import NavBar from '@/components/nav-bar'
import './globals.css'
import { getCurrentUser } from '@/lib/session'
import { Inter as FontSans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: 'Bio Chef | Custom Meal Plans Based On Your Body',
  description: 'Custom Meal Plans Based On Your Body',
}



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user = await getCurrentUser();

  return (
    <html lang="en" className={fontSans.variable + " font-sans antialiased"} data-theme="light">
      <body className=''>
        <NavBar user={user} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
