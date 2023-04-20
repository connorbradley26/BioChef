import Image from 'next/image'
import { Inter } from 'next/font/google'
import UserAuth from '@/components/user-auth'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {
  const session = await getServerSession( authOptions )
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <UserAuth />
    </main>
  )
}
 