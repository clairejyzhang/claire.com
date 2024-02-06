import Head from 'next/head';
import Image from 'next/image';
import utilStyles from '../styles/utils.module.css';
import Navbar from '../components/navbar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Claire Zhang</title>
      </Head>

      <section className={utilStyles.container55}>
        <Navbar />
        <p>Hi! I'm Claire. This site is a WIP.</p>
        {/* <ul>
          <li>student 🦁</li>
          <li>aspiring product manager </li>
          <li>New York State certified EMT 🚑</li>
        </ul>
        <p>who believes that life is best lived in service of others. I've formed this belief through There are many forms of service, but in terms of work, my experiences as a</p>
        <ul>
          <li>developer 🧑‍</li>
          <li>researcher</li>
          <li>lead UI/UX designer</li>
        </ul>
        <p>inform my approach to building high-impact solutions.</p>
        <Image 
              priority
              src="/images/profile.jpg"
              className={utilStyles.image}
              height={280}
              width={490}
              style={{objectFit: "contain"}}
              alt=""
            />
        <p>If you’re here, it means a) you want to learn more about me or b) you saw the cutoff picture and scrolled to see the rest of it (you fell into my trap!). </p>
        <br/>
        <p>Beyond what I do for work, you should also know that I’m into music, which I explore by</p>
        <ul>
          <li>playing jazz violin 🎻‍</li>
          <li>learning new bass lines (currently practicing: Space Oddity) 🎸</li>
          <li>abusing my Spotify Premium subscription</li>
        </ul>
        <p>and reading, most recently</p>
        <ul>
          <li>On Writing - Stephen King‍</li>
          <li>An American Sickness - Elizabeth Rosenthal</li>
          <li>Being Mortal - Atul Gawande</li>
          <li>The Three Body Problem - Cixin Liu 🧑‍🚀</li>
        </ul>
        <p>If you recommend me a song or book here, I’ll rec you one too! ❤️❤️</p> */}
      </section>




    </>
  );
}