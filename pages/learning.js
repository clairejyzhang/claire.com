import Head from 'next/head';
import utilStyles from '../styles/utils.module.css';
import styles from '../styles/learning.module.css';
import { getSortedPostsData } from '../lib/learning-posts';
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
      <Head>
        <title>Learning | Claire Zhang</title>
      </Head>
        <section className={`${utilStyles.container55}`}>
          <Navbar />
          {/* <p>Coming soon!</p> */}
          <section className={`${styles.heading} ${utilStyles.padding1px}`}>
              <div>
              {allPostsData.map(({ id, num, title }) => (
                <div>
                  <div onMouseEnter={() => setSelectedProjectNum(num)} className={styles.projectRow}>
                    <div className={styles.projectRowContent}>
                      <small className={utilStyles.lightText}>
                          <Num int={num} />
                      </small>
                      <Link href={`/learning/${id}`}>{title}</Link>
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
          />
        </section>
        

    </>
      
    );
  }
