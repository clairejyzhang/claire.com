import styles from './preview.module.css';

export default function Preview({ children, home }) {
    return (
        <section className={styles.background}>
            <section className={styles.container}>
                <p className={styles.title}>Title</p>
                <p className={styles.subtitle}>ROLES · 2023</p>
                <p className={styles.blurb}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </section>
        </section>

    );
  }