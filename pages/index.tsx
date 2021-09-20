import Head from "next/head";
import Link from "next/dist/client/link";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.scss";
import HomeStyles from "../styles/Home.module.scss";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/Date";
import { PostData } from "../Models/post.model";

const Home = ({ allPostsData }: { allPostsData: PostData[] }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section
        className={`${utilStyles.headingMd} ${utilStyles.centerText} ${HomeStyles.content_section}`}
      >
        <h2>Welcome!</h2>
      </section>
      <section
        className={`${utilStyles.headingMd} ${utilStyles.padding1px} ${HomeStyles.content_section}`}
      >
        <h2 className={utilStyles.headingLg}>Post</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ date, title, id }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date.toLocaleString()} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

//データ有りの静的生成
//本質的には、getStaticProps を使うことで Next.js にこう伝えることができる,
//"このページにはいくつか外部に依存しているデータがある。そのためビルド時にこのページをプリレンダリングするときは、まずその依存関係を解決する処理を行う"
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData, // getStaticProps 内で関数を呼び出し、結果は props キーの内部で返す
      // → allPostsData プロパティはHomeコンポーネントに渡される
    },
  };
}

export default Home;
