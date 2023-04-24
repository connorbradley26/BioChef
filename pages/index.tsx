
import Hero from '@/components/Hero';
import { NextPageWithLayout } from './_app';
import RootLayout from './layout';

interface Props {}

const Home: NextPageWithLayout<Props> = () => {

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