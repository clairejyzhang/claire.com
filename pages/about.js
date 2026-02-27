import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../components/navbar';
import utilStyles from '../styles/utils.module.css';


export default function Home() {
  return (
    <>
      <Head>
        <title>About | Claire Zhang</title>
        <meta name="description" content="Some things about me and some of my beliefs." />
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

          <p className={utilStyles.headingMd}>Me in 10 seconds (February 2026)</p>
          <p></p>
          <p>I'm 22 years old and live in Manhattan, where I work as the solo employee at a VC fund, volunteer as an EMT in Central Park, and wrangle my friends to hang out. Over the next year I want to: </p>
          <ul className={utilStyles.bothMargins}>
              <li>Make more intergenerational friends</li>
              <li>Learn more about building things in the physical world</li>
              <li>Be more patient and disciplined</li>
              <li>Go backpacking for the first time</li>
          </ul>
          <br></br>

          <p className={utilStyles.headingMd}>Me in 1 minute</p>
          <ul>
            <li>Born and raised in Seattle, WA</li>
            <li>Public libraries and orchestra rehearsals were my third spaces growing up</li>
            <li>Went to Columbia because I wanted to be in New York</li>
            <li>Wasn't sure what I wanted in a career when I started college so I did a bunch of random things — in hindsight I've been optimizing for challenge, impact, and people, or something like that</li>
            <li>I am pretty sure what I want out of life broadly though: live in a city by the water, with lots of sunny days and people I love to enjoy them with</li>
            
          </ul>

          <p>Some things I believe:</p>
          <ul className={utilStyles.bothMargins}>
            <li><a className={utilStyles.linkBlue} href="https://www.amazon.com/Humankind-Hopeful-History-Rutger-Bregman/dp/0316418536">Our human nature is to be good and kind</a></li>
            <li>The best teams are like jazz bands</li>
            <ul className={utilStyles.sublist}>
              <li>Compact, dynamic, aware, team over self, shared love of the art</li>
            </ul>

            <li>Writing is thinking</li>
            <ul className={utilStyles.sublist}>
              <li>Making tacit knowledge explicit is soft power in a workplace — things like meeting notes and weekly summaries are a privilege to send, not a chore</li>
            </ul>

            <li>"Hell yeah or no"</li>
            <ul className={utilStyles.sublist}>
              <li>Even doing nothing is better than doing something uninteresting</li>
              <li>Find and maintain momentum</li>
            </ul>

            <li>Bring back analog</li>
            <ul className={utilStyles.sublist}>
              <li>Digital artifacts are losing the attention war — physical objects have presence</li>
              <li>A picture is worth 1,000 words but the clay pot you made in kindergarten is worth 1,000 pictures</li>
            </ul>
          </ul>         

          <br></br>
          <br></br>


        </div>

      </section>




    </>
  );
}
