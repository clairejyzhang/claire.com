import styles from './preview.module.css';
import Image from 'next/image';

export default function Preview({ title, roles, year, description, image }) {
    return (
        <section className={styles.background}>
            <section className={styles.container}>
                <div className={styles.textContainer}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.subtitle}>{roles ? roles.join(', ').toUpperCase(): ''} · {year}</div>
                    <div className={styles.blurb}>{description}</div>
                </div>
                
                <div className={styles.thumbnailContainer}>
                    <Image
                        priority
                        src={image}
                        height={400}
                        width={600}
                        style={{objectFit: "contain"}}
                        alt="thumbnail"
                        className={styles.thumbnail}
                    />
                </div>
            </section>
        </section>
    )}