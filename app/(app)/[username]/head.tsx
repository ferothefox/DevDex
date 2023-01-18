import { baseLink } from '@/lib/helpers'

async function getUser(username: string) {
  const res = await fetch(`${baseLink}/api/users/get/username/${username}`)
  return res.json()
}

export default async function Head({
  params,
}: {
  params: any
}) {
  const user = await getUser(params.username)

  return (
    <>
      <title>{user.user.username + ' | DevDex'}</title>
      <meta
        property={'description'}
        content={user.user.bio}
      />
      <meta
        property={'twitter:title'}
        content={user.user.username + ' on DevDex'}
      />
      <meta
        property={'og:description'}
        content={user.user.bio}
      />
      <meta
        property={'twitter:description'}
        content={user.user.bio}
      />
      <meta
        property={'og:type'}
        content={'website'}
      />
      <meta
        property={'og:site_name'}
        content={user.user.username + ' on DevDex'}
      />
      <meta
        property={'og:url'}
        content={`https://devdex.me/${user.user.username}`}
      />
      <meta
        property={'twitter:url'}
        content={`https://devdex.me/${user.user.username}`}
      />
      <meta
        property={'og:image'}
        content={user.user.image}
      />
    </>
  )
}
