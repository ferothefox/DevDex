'use client'

import { PostProps } from 'components/Posts'
export interface Post {
  post: Array<PostProps>
}

// export async function getServerSideProps(context: { params: { id: number } }) {
//   const propPostId = context.params.id
//   const postRes = await fetch(`${baseLink}/api/posts/get/${propPostId}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Cache-Control': 'public, s-maxage=59, stale-while-revalidate=119',
//     },
//   })

//   const postData = await postRes.json()

//   const metaTags = {
//     title: postData.post.title,
//     description: postData.post.content,
//     'theme-color': '#2c74e0',
//     'og:site_name': 'DevDex',
//     'og:type': 'website',
//     'og:title': postData.post.title,
//     'og:description': postData.post.content,
//     'og:url': `https://devdex.me/post/${postData.post.id}`,
//     'og:image': `${postData.post.author.image}`,
//     'twitter:title': postData.post.title,
//     'twitter:url': `https://devdex.me/post/${postData.post.id}`,
//     'twitter:description': postData.post.content,
//     author: `@${postData.post.author.username}`,
//     'twitter:card': 'summary_large_image',
//   }

//   return {
//     props: {
//       postData,
//       metaTags,
//     },
//   }
// }

export default (/*props: { postData: { post: PostProps }; data: Post } */) => {
  // const { user } = useUserStore()

  return (
    <div className='profile-mount flex h-screen w-full flex-grow flex-col overflow-hidden bg-light-main text-light-bright dark:bg-[#06070b] dark:text-dark-bright'>
      <main className='flex h-full flex-row items-center overflow-y-auto'>
        <div className='feed-display flex h-full w-full flex-col items-center gap-4 rounded-tl-lg py-24'>
          {/* <Post
              id={props.postData.post.authorId}
              key={props.postData.post.id}
              post={props.postData.post}
              standalone
            /> */}
          {/* <ReplyComposer postId={props.postData.post.id} /> */}
        </div>
      </main>
    </div>
  )
}
