'use client'

import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Script from 'next/script'
import { useState } from 'react'

type Props = {
  dehydratedState: DehydratedState
  children: React.ReactNode
}

export default ({ dehydratedState, children }: Props) => {
  const [queryClient] = useState(new QueryClient())

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>{children}</Hydrate>
      </QueryClientProvider>
      <Script id='react-query'>
        {`window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)}`}
      </Script>
    </>
  )
}
