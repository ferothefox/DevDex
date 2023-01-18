// This SSG page generates the token to prevent generating OG images with random parameters (`id`).
import { GetStaticProps } from 'next'
import { createHmac } from 'node:crypto'
import { ParsedUrlQuery } from 'querystring'

interface IParams extends ParsedUrlQuery {
  id: string
}

interface PageProps {
  id: string
  token: string
}

export const getStaticProps: GetStaticProps = async context => {
  const { id } = context.params as IParams
  const hmac = createHmac('sha256', 'my_secret')
  hmac.update(JSON.stringify({ id: id }))
  const token = hmac.digest('hex')

  return {
    props: {
      id,
      token,
    },
  }
}

export const getStaticPaths = () => ({
  paths: [{ params: { id: 'pupbrained' } }, { params: { id: 'ferodevs' } }],
  fallback: false,
})

export default ({ id, token }: PageProps) => (
  <div>
    <h1>Encrypted Open Graph Image.</h1>
    <p>Only /pupbrained, /ferodevs with correct tokens are accessible:</p>
    <a
      href={`/api/encrypted?id=${id}&token=${token}`}
      target='_blank'
      rel='noreferrer'
    >
      <code>
        /api/encrypted?id={id}&token={token}
      </code>
    </a>
  </div>
)
