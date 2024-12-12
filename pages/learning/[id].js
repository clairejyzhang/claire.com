import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/learning-script';
import Head from 'next/head';
import Num from '../../components/format-num';
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
  
