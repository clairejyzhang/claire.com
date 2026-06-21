import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import styles from '../styles/notes.module.css';
import { getSortedPostsData } from '../lib/notes-script';
import Link from 'next/link';
import Date from '../components/format-date';
import Navbar from '../components/navbar';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
      props: {
        allPostsData,
      },
    };
  }

export default function Notes({ allPostsData }) {
    return (
    <>
      <Head>
        <title>Notes | Claire Zhang</title>
        <meta name="description" content="Poems, life updates, and someday essays" />
      </Head>
        <Navbar />
        <section className={`${utilStyles.container55}`}>
          <div className={`${utilStyles.title}`}>Notes</div>
            <br></br>
            <div className={`${styles.columnProjectRows}`}>
              {allPostsData.map(({ id, date, title, category }) => (
                <div key={id}>
                  <div className={styles.projectRowContent}>
                    <div className={styles.category}>
                      <small className={utilStyles.lightText}>{category}</small>
                    </div>
                    <div className={styles.title}>
                      <Link className={utilStyles.projectLink} href={`/notes/${id}`}>
                        {title}
                      </Link>
                    </div>
                    <div className={styles.date}>
                      <small className={utilStyles.lightText}>
                        <Date dateString={date} />
                      </small>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>


        </section>


 



    </>
      
    );
  }