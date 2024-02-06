import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import styles from '../styles/valentine.module.css';
import Navbar from '../components/navbar';
import Image from 'next/image';
import Script from 'next/script';

// function handleClick(event) {
//   event.preventDefault;
//   console.log('button clicked')
// }

export default function Valentine() {

    return (
    <>
        <section>
          <section className={`${utilStyles.container55}`}>
            <Navbar/>
          </section>
          
          <Script
              src="valentine-script.js"
            />

          <div id={`${styles.valentineContainer}`}>
    
            {/* <div id={`${styles.gifContainer}`}> */}
              <Image 
                  priority
                  src="/gifs/question.gif"
                  className={styles.image}
                  id="questionGif"
                  height={280}
                  width={490}
                  style={{objectFit: "contain"}}
                  alt=""
                />
              <Image 
                  priority
                  src="/gifs/yes.gif"
                  className={styles.image}
                  id="yesGif"
                  height={0}
                  width={490}
                  style={{objectFit: "contain"}}
                  alt=""
                />

            <p className={`${styles.question}`} id="questionText">Will you be my Valentine?</p>
    
            <button className={`${styles.yesButton}`} id="yesButton">Yes</button>
            <button className={`${styles.noButton}`} id="noButton">No</button>
     
          </div>
        </section>
        

    </>
      
    );
  }
