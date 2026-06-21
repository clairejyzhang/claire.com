import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/runpassport.module.css';
import { useRouter } from 'next/router';

export default function RunPassport() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/runpassport/conservatory'); // or your starting page
  };

  return (
    <>
      <Head>
        <title>👟 Run Passport</title>
      </Head>
      <div className={styles.pageWrapper} onClick={handleClick} style={{ cursor: 'pointer' }}>
        <div className={styles.cardStack}>
          {/* Extra stacked cards for depth */}
          <div className={styles.backCard4}></div>
          <div className={styles.backCard3}></div>
          <div className={styles.backCard2}></div>
          <div className={styles.backCard1}></div>

          {/* Main Card */}
          <div className={styles.mainCard}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/passport-cover.png"
                alt="Passport Cover"
                fill
                className={styles.coverImage}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
