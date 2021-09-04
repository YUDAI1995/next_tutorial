import Head from 'next/head'
import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Post({postData}) {
  return (
    <Layout post>
        
        <Head>
          <title>{postData.title}</title>
          <meta />
        </Head>
        {/* <p>{postData.date}</p> */}
        {/* <Date dateString={postData.date} />
        <p>{postData.id}</p>
        <h2>{postData.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} /> */}
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>

    </Layout>
  )
}

// 2. id としてとりうる値のリストを返す
export async function getStaticPaths() {
    // id としてとりうる値のリストを返す
    const paths = getAllPostIds()
    //paths.push({params: {id: 'a'}})
    console.log(paths);
    return {
      paths,
      fallback: false
    }
}

// 3. ID(params.id) に基づいて、ブログの投稿に必要なデータを取得する
export async function getStaticProps({ params }) {
  console.log(params);
    // params.id を使用して、ブログの投稿に必要なデータを取得する
    const postData = await getPostData(params.id)
    console.log(params.id);
    return {
      props: {
        postData
      }
    }
}