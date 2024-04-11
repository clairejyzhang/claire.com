import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import Navbar from './navbar';

const name = 'Claire Zhang';
export const siteTitle = 'Next.js Sample Website';

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
    </div>
  );
}