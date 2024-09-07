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
          <p>Short term goal: do cool things with cool people</p>
          <p>Long term goal: product management on a team that builds AI solutions to important problems</p>
          <p>Lifetime goal: make life better for those around me</p>
          <br></br>

          <p className={utilStyles.headingMd}>Me in 1 minute</p>
          <ul>
            <li>Born and raised in Seattle, WA</li>
            <li>Bookstores and orchestra rehearsals were my third spaces growing up</li>
            <li>Went to Columbia because I wanted to be in New York</li>
            <li>Wasn't sure what I wanted in a career when I started college so I did a bunch of random things — in hindsight I've been doing gradient descent along the axes of 'challenge,' 'impact,' and 'people' or something like that but I don't know yet if my current goal of product management is a local or global maximum</li>
            <li>I am pretty sure what I want out of life more broadly though, which is to live in a city by the water with lots of sunny days, and people I love who'll experience them with me</li>
          </ul>

          <p>Some things I believe:</p>
          <ul className={utilStyles.bothMargins}>
            <li>The best teams are like jazz bands</li>
            <ul className={utilStyles.sublist}>
              <li>Compact, dynamic, aware, team over self, shared love of the art</li>
              <li>Now that I think about it you could totally get all these things from playing a team sport, but I was asthmatic as a kid so no wonder I only found it through jazz</li>
            </ul>
            <li>Writing is thinking</li>
            <ul className={utilStyles.sublist}>
              <li>Part of the purpose of this website is to serve as a forcing function for me to write... clearly it's working 🦧</li>
              <li>Writing is 'soft power' in a workplace — things like meeting notes and weekly summaries are a privilege to send, not a chore</li>
            </ul>
            <li>"Hell yeah or no"</li>
            <ul className={utilStyles.sublist}>
              <li>Doing things you're excited about should give you energy instead of taking it away</li>
              <li>Figure out what makes you feel momentum</li>
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
