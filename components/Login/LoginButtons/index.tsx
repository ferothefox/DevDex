'use client'

import { signIn } from 'next-auth/react'

export default () => (
  <>
    <div className='mt-4 flex flex-col gap-4'>
      <button
        type='button'
        className='auth-button flex w-full appearance-none items-center justify-center rounded-lg bg-light-card px-4 py-2  text-light-muted transition-opacity duration-200 hover:opacity-40 dark:bg-[#10131E] dark:text-dark-bright'
        aria-live='polite'
        onClick={() =>
          signIn('github', {
            callbackUrl: `${window.location.origin}`,
          })
        }
      >
        Login with GitHub
      </button>

      <button
        type='button'
        className='auth-button flex w-full appearance-none items-center justify-center rounded-lg bg-light-card px-4 py-2  text-light-muted transition-opacity duration-200 hover:opacity-40 dark:bg-[#10131E] dark:text-dark-bright'
        aria-live='polite'
        onClick={() =>
          signIn('discord', {
            callbackUrl: `${window.location.origin}`,
          })
        }
      >
        Login with Discord
      </button>
    </div>

    <div className='divider-text select-none  font-bold text-light-muted dark:text-dark-muted'>
      <div className='px-[1rem]'>OR</div>
    </div>

    <div className=''>
      <a
        className='max-w-fit cursor-pointer text-center text-light-muted duration-200 hover:text-light-bright dark:text-dark-muted dark:hover:text-dark-bright'
        onClick={() =>
          signIn('auth0', {
            callbackUrl: `${window.location.origin}`,
          })
        }
      >
        Login with email
      </a>
    </div>
  </>
)
