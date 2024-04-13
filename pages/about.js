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
          <p>Long term goal: lead a team that creates holistic solutions to important problems.</p>
          <p>Lifetime goal: make life better for the people around me.</p>
          <br></br>

          <p className={utilStyles.headingMd}>Me in 10 minutes</p>
          <p>For the last few years, I tried to always ask ‘Why not?’ instead of ‘Why?’. Almost always, the answer was, ‘Well, I guess there’s no reason not to.” So I’ve ended up doing a lot of different things. In approximate chronological order, here are some highlights:</p>
          <ul>
            <li>Designed, built, and launched rockets</li>
            <li>Built full-stack web applications</li>
            <li>Researched how we can use AI to bring thoughtful nature design back to our cities</li>
            <li>Used ML to make climate model hyperparameter tuning more efficient</li>
            <li>Assisted Columbia Business School professors in behavioral research</li>
            <li>Started teaching myself how to use Figma for better visual communication</li>
            <li>Become a New York state certified EMT and volunteered 200 hours</li>
            <li>Built full-stack mobile applications</li>
            <li>Helped design and deliver solutions for older adults with dementia</li>
            <li>Applied human-centered design principles to conceptualize better solutions for areas from mental health support to human spaceflight</li>
          </ul>
          <p>By exploring broadly in the past, I’ve developed the perspective and motivation to focus in on a specific goal moving forward. Here’s what I want to do:</p>
          <br></br>
          <p><b>integrate creativity, intentional design, and knowledge of emerging technology to create meaningful solutions that are thoughtful, purposeful, and impactful</b></p>
          <br></br>
          <p>Now I always answer ‘Why not?’ with ‘Would doing this bring me closer to my goal?’.</p>

          <br></br>
          <br></br>


        </div>

      </section>




    </>
  );
}
