import styles from './preview.module.css';

export default function Preview({ title, roles, year, description }) {
    return (
        <section className={styles.background}>
            <section className={styles.container}>
                <p className={styles.title}>{title}</p>
                <p className={styles.subtitle}>{roles ? roles.join(', ').toUpperCase(): ''} · {year}</p>
                <p className={styles.blurb}>{description}</p>
            </section>
        </section>

    );
  }