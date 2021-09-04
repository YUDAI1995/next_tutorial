import Head from 'next/head'
import Link from 'next/dist/client/link'
import Layout, { siteTitle } from '../components/layout'
import { name } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import HomeStyles from '../styles/Home.module.css'
import { getSortedPostsData } from '../lib/posts'
import Date from '../components/date'


export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${HomeStyles.content_section}`} >
        <p>Hello, I am {name}</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px} ${HomeStyles.content_section}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section className={HomeStyles.content_section}>
        <h2>about</h2>
        <p>Please read <Link href="/posts/first-post"><a>my first post!</a></Link></p>

      </section>
    </Layout>
  )
}


//データ有りの静的生成
//本質的には、getStaticProps を使うことで Next.js にこう伝えることができるということです。
//「このページにはいくつか外部に依存しているデータがあるよ。だからビルド時にこのページをプリレンダリングするときは、まずその依存関係をしっかり解決してよ！」
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData // getStaticProps 内で関数を呼び出し、結果は props キーの内部で返す
                   // → allPostsData プロパティはHomeコンポーネントに渡される
    }
  }
}

// サーバサイドレンダリング(今回の実装はなし)
// export async function getServerSideProps(context) {
//   return {
//     props: {
//       // コンポーネントに渡すための props
//     }
//   }
// }