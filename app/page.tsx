import UserAuth from '@/components/user-auth'


export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <UserAuth />
    </main>
  )
}
 