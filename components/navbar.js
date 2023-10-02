import styles from './navbar.module.css';
import Link from 'next/link';

export default function Navbar({ children, home }) {
    return (
        <section className={styles.bar}>
            <div className={styles.left}>
                <Link className={styles.item} href={`/`}>claire zhang.</Link>
            </div>
            <div className={styles.right}>
                <Link className={styles.item} href={`/learning`}>learning</Link>
                <Link className={styles.item} href={`/writing`}>writing</Link>
            </div>
            
        </section>

    );
  }