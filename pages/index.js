import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import styles from '../styles/learning.module.css';
import { getSortedPostsData } from '../lib/learning-script';
import Link from 'next/link';
import Num from '../components/format-num';
import Navbar from '../components/navbar';
import Preview from '../components/preview';
import { useEffect, useState } from 'react';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
      props: {
        allPostsData,
      },
    };
  }

export default function Learning({ allPostsData }) {
    const [selectedProjectNum, setSelectedProjectNum] = useState(allPostsData[0].num);

    const [selectedProject, setSelectedProject] = useState(allPostsData[0])


    useEffect(() => {
      const newSelectedProject = allPostsData.filter((post) => post.num === selectedProjectNum)[0];
      setSelectedProject(newSelectedProject);
    }, [selectedProjectNum])

    return (
    <>
      <section className={`${styles.indexContainer}`}>
        <Head>
          <title>Work | Claire Zhang</title>
          <meta name="description" content="Egleston Scholar @ Columbia University '25 thinking about intentional AI, human connection, and creativity." />

        </Head>
          
          <Navbar />

          <section className={`${utilStyles.container55}`}>
            <div className={`${styles.hello}`}>Egleston Scholar @ Columbia University '25 thinking about intentional AI, human connection, and creativity.</div> 
            <div className={`${styles.aboutMe}`}>I look for experiences with steep learning curves, teams that are like jazz bands, and a practice of writing as thinking. Here are some things I've worked on so far:</div>

            <section className={`${styles.menu} ${utilStyles.padding1px}`}>
                <div className={`${styles.menuContainer}`}>
                {allPostsData.map(({ id, num, title }) => (
                  <div>
                    <div onMouseEnter={() => setSelectedProjectNum(num)} className={styles.projectRow}>
                      <div className={styles.projectRowContent}>
                        <small className={utilStyles.lightText}>
                            <Num int={num} />
                        </small>
                        <Link className={`${utilStyles.projectLink}`}href={`/learning/${id}`}>{title}</Link>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
            </section>

            <Preview 
              title={selectedProject.title}
              roles={selectedProject.roles}
              year={selectedProject.year}
              description={selectedProject.description}
              image={selectedProject.image}
            />

            <br></br>

          </section>
        
      </section>
    </>
      
    );
  }
