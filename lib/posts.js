import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

//ファイルシステムからデータを取得するための簡単なライブラリを作成
const postsDirectory = path.join(process.cwd(), 'posts') //posts配下を指定

export function getSortedPostsData() {
  // /posts　配下のファイル名を取得する
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // id を取得するためにファイル名から ".md" を削除する
    const id = fileName.replace(/\.md$/, '')

    // マークダウンファイルを文字列として読み取る
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents)

    // データを id と合わせる
    return {
      id,
      ...matterResult.data
    }
  })
  // 投稿を日付でソートする
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

// [id]ごとにページを生成するためIDキーを持ったオブジェクトを作成する
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)
  
    // returnされる配列はオブジェクトの配列でなければなりません。
    // 各オブジェクトには params キーが存在して、id キーを持ったオブジェクトを含んでいなくてはなりません
    //（ファイル名で [id] を使用するため）。そうしなければ、getStaticPaths は失敗します。
    // 以下のような配列を返します:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
      return {
        params: {
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
  }

  //与えられた id を持つ投稿をレンダーするのに必要なデータをフェッチする
  export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // 投稿のメタデータ部分を解析するために gray-matter を使う
    const matterResult = matter(fileContents)

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()
  
    // データを id と組み合わせる
    return {
      id,
      contentHtml,
      ...matterResult.data
    }
  }