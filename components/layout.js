import Head from 'next/head';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Navbar from './navbar';
import { Analytics } from '@vercel/analytics/react';


const name = 'Claire Zhang';
export const siteTitle = 'A website';

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <meta
          name="Claire's portfolio"
        />
      </Head>

      <Navbar></Navbar>

      <main>{children}</main>
      {!home && (
        <div className={`${utilStyles.container55} ${styles.backToHome}`}>
          {/* <Link href="/">← Back to home</Link> */}
        </div>
      )}
      <Analytics />
    </div>
  );
}