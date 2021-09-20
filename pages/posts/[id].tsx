import Head from "next/head";
import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/Date";
import utilStyles from "../../styles/utils.module.scss";
import { GetStaticPaths, GetStaticProps } from "next";

export default function Post({ postData }) {
  return (
    <Layout post>
      <Head>
        <title>{postData.title}</title>
        <meta />
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

// 2. id としてとりうる値のリストを返す
export const getStaticPaths: GetStaticPaths = async () => {
  // id としてとりうる値のリストを返す
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

// 3. ID(params.id) に基づいて、ブログの投稿に必要なデータを取得する
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // params.id を使用して、ブログの投稿に必要なデータを取得する
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
};
