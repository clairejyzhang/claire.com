import Head from 'next/head';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import styles from './passportpage.module.css';
import { useRouter } from 'next/router';

export async function getServerSideProps({ params }) {
  const { data: run, error } = await supabase
    .from('runs')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (error || !run) return { notFound: true };

  return { props: { run } };
}

export default function RunPassportPage({ run }) {
  const router = useRouter();
  const [date, setDate] = useState(run.date || '');
    const [rating, setRating] = useState(run.rating || 0);

    useEffect(() => {
    setDate(run.date || '');
    setRating(run.rating || 0);
    }, [run.slug]);

  const runOrder = [
    'conservatory', 'roosevelt', 'cheese', 'cositas',
    'smoothies', 'sipco', 'bookstore', 'cookbookstore',
    'eastriver', 'reservoir'
  ];

  const currentIndex = runOrder.indexOf(run.slug);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch('/api/update-run', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: run.slug, date, rating }),
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [date, rating]);

  const handlePageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isLeft = e.clientX < rect.left + rect.width / 2;

    if (isLeft && currentIndex === 0) {
      router.push('/runpassport/');
    } else if (isLeft && currentIndex > 0) {
      router.push(`/runpassport/${runOrder[currentIndex - 1]}`);
    } else if (!isLeft && currentIndex < runOrder.length - 1) {
      router.push(`/runpassport/${runOrder[currentIndex + 1]}`);
    }
  };

  return (
    <>
      <Head>
        <title>👟 {run.run_name}</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.booklet} onClick={handlePageClick}>
          <div className={styles.page}>
            <div
                className={styles.mapContainer}
                dangerouslySetInnerHTML={{
                    __html: `<iframe width="500" height="500" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${run.embed_url}"></iframe>`,
                }}
            />
          </div>

          <div className={styles.spine}></div>

          <div className={styles.page}>
            <div className={styles.pageContent}>
              <div className={styles.runName}>{run.run_name}</div>
              <div className={styles.metaRow}>
                <span className={styles.runMeta}>date:</span>
                <input
                    className={styles.editableInput}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                />
              </div>
              <p className={styles.runMeta} onClick={(e) => e.stopPropagation()}>
                rating:&nbsp;
                {[1, 2, 3, 4, 5].map((num) => (
                    <span
                    key={num}
                    onClick={() => setRating(num)}
                    style={{ cursor: 'pointer', color: num <= rating ? '#facc15' : '#ddd' }}
                    >
                    ★
                    </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
