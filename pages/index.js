import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import styles from '../styles/learning.module.css';
import { getSortedPostsData } from '../lib/learning-script';
import Link from 'next/link';
import Num from '../components/format-num';
import Navbar from '../components/navbar';
import Image from 'next/image';
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
  const [selectedProject, setSelectedProject] = useState(allPostsData[0]);

  useEffect(() => {
    const newSelectedProject = allPostsData.filter((post) => post.num === selectedProjectNum)[0];
    setSelectedProject(newSelectedProject);
  }, [selectedProjectNum]);

  return (
    <>
      <section className={`${styles.indexContainer}`}>
        <Head>
          <title>Work | Claire Zhang</title>
          <meta name="description" content="Egleston Scholar @ Columbia University '25 thinking about intentional AI, human connection, and creativity." />
        </Head>

        <Navbar />

        
        <section className={`${utilStyles.container55}`}>
          <div className={`${utilStyles.title}`}>Egleston Scholar @ Columbia University '25 thinking about intentional AI, human connection, and creativity.</div>
          <div className={`${styles.aboutMe}`}>
            I look for experiences with steep learning curves, teams that are like jazz bands, and a practice of writing as thinking. Here are some things I've worked on so far:
          </div>

          <div className={`${styles.columnContainer}`}>
            <div className={`${styles.column} ${styles.columnProjectRows}`}>
              {allPostsData.map(({ id, num, title }) => (
                    <div key={id}>
                      <div onMouseEnter={() => setSelectedProjectNum(num)} className={styles.projectRow}>
                        <div className={styles.projectRowContent}>
                          <small className={utilStyles.lightText}>
                            <Num int={num} />
                          </small>
                          <Link className={`${utilStyles.projectLink}`} href={`/learning/${id}`}>
                            {title}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
            <div className={`${styles.column} ${styles.columnPreviews}`}>
              <div className={styles.previewText}>
                <div className={styles.previewTitle}>{selectedProject.title}</div>
                  <div className={styles.previewSubtitle}>
                    {selectedProject.roles ? selectedProject.roles.join(', ').toUpperCase() : ''} · {selectedProject.year}
                  </div>
                <div className={styles.previewBlurb}>{selectedProject.description}</div>
              </div>              
              <div className={styles.previewThumbnailContainer}>
                <div className={styles.previewThumbnailBackground}> </div>
                <Image
                      priority
                      src={selectedProject.image}
                      height={400}
                      width={600}
                      style={{ objectFit: 'contain' }}
                      alt="thumbnail"
                      className={styles.previewThumbnail}
                />
              </div>
              
            </div>
          </div>
          </section> 
        </section> 
    </>
  );
}
