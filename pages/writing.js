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
        <section className={`${utilStyles.container55}`}>
          <Navbar />
          {/* <h1>Coming soon!</h1> */}
          <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingLg}>Blog</h2>
            <ul className={utilStyles.list}>
              {allPostsData.map(({ id, date, title }) => (
                <li className={utilStyles.listItem} key={id}>
                  <Link href={`/writing/${id}`}>{title}</Link>
                  <br />
                  <small className={utilStyles.lightText}>
                    <Date dateString={date} />
                  </small>
                </li>
              ))}
            </ul>
          </section>
        </section>

    </>
      
    );
  }