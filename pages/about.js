import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/navbar';

import utilStyles from '../styles/utils.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>About | Claire Zhang</title>
      </Head>

      <section>
        <Navbar/>

        <div >
          <p className={utilStyles.headingMd}>Me in 1 second</p>

          <Image 
                  priority
                  src="/images/profile.png"
                  className={utilStyles.image}
                  height={350}
                  width={700}
                  style={{objectFit: "contain"}}
                  alt=""
                />
          <br></br>

          <p className={utilStyles.headingMd}>Me in 10 seconds</p>
          <p></p>
          <p>Short term goal: get industry experience in human-centered design and/or product management.</p>
          <p>Long term goal: lead a team that builds solutions to important problems.</p>
          <p>Lifetime goal: make life better for the people around me.</p>
          <br></br>

          <p className={utilStyles.headingMd}>Me in 10 minutes</p>
          <p></p>
          <p>Herman Hesse's Book <em>Siddhartha</em> says that wisdom comes from experience; we learn by doing, not by listening. I'm 20, but I'd like to think I've gained an okay-ish amount of experience so far. Here are some beliefs I've picked up — you decide if they're wise or not.</p>
          <br></br>

          <p>🚧 👷 🚧 👷 Coming soon... 👷 🚧 👷 🚧</p>
          <p></p>   

        </div>

      </section>




    </>
  );
}
