'use client'

import AuthenticatedPostComposer from '@/components/Posts/Composer/Authed'
import { UserContext } from 'app/UserProvider'

export default () => (
  <UserContext.Consumer>
    {user =>
      user ? (
        <AuthenticatedPostComposer />
      ) : (
        process.env.NODE_ENV === 'development' && <AuthenticatedPostComposer />
      )
    }
  </UserContext.Consumer>
)
