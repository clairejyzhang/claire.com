import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/notes-script';
import Head from 'next/head';
import Date from '../../components/format-date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>

        <article>
          <div className={`${utilStyles.articleHeader} ${utilStyles.container55}`}>
            <div className={`${utilStyles.title}`}>{postData.title}</div>
            <Date dateString={postData.date} />
          </div>
          <br></br>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
        
      </Layout>
    );
  }

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
      paths,
      fallback: false,
    };
}


export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
      props: {
        postData,
      },
    };
}
  
