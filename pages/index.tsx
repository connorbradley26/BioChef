
import Hero from '@/components/hero';
import { NextPageWithLayout } from './_app';
import RootLayout from './layout';



const Home: NextPageWithLayout = () => {

  return (
    <main className="">      
      <Hero />
    </main>
  )
}

Home.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>
}


export default Home;