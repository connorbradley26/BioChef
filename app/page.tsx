import Hero from '@/components/hero'
import { getCurrentUser } from '@/lib/session';


export default async function Home() {
  const user = await getCurrentUser();

  return (
    <main className="">
      <Hero user={user}/>
    </main>
  )
}
 