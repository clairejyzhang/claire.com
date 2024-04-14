import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/writing-posts';
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

export default function Writing({ allPostsData }) {
    return (
    <>
      <Head>
        <title>Writing | Claire Zhang</title>
      </Head>
        <Navbar />
        <section className={`${utilStyles.container55}`}>
          {/* <h1>Coming soon!</h1> */}
          <section className={`${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingLg}>Writing</h2>
            <div className={utilStyles.list}>
              {allPostsData.map(({ id, date, title }) => (
                <div className={utilStyles.listItem} key={id}>
                  <div className={`${utilStyles.blogLineContainer}`}>
                    <Link className={`${utilStyles.headingMd}`} href={`/writing/${id}`}><b>{title}</b></Link>
                    <Date dateString={date} />
                  </div>
                  
                </div>
              ))}
            </div>
          </section>
        </section>

    </>
      
    );
  }