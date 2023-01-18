'use client'

import FocusTrap from 'focus-trap-react'
import Head from 'next/head'
// import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

export default () => {
  // const router = useRouter()
  // const { user } = useUserStore()
  const [, setUsername] = useState('')
  const [, setBio] = useState('')
  const [, setFlair] = useState('')
  const [bannerColor, setBannerColor] = useState('000')
  const [key, setKey] = useState('')

  const handleCreateProfileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!key) return

    // const color =
    // bannerColor.charAt(0) === '#' ? bannerColor.substring(1) : bannerColor

    // const finishedSetup = true

    // await fetch(`/api/users/patch/${session?.user?.email}`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     finishedSetup,
    //     key,
    //     flair,
    //     username,
    //     bio,
    //     color,
    //   }),
    // })
    //   .then(res => res.json())
    //   .then(async res => {
    //     if (res.success) {
    //       setUser(res.updatedUser)
    //       await router.push('/feed')
    //     }
    //   })
  }

  // const [, setIsSettingUser] = useState(false)

  // useEffect(() => {
  //   setIsSettingUser(true)

  //   fetch(`/api/users/get/email/${session?.user?.email}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       if (res.status < 300) setUser(res.user)
  //       setIsSettingUser(false)
  //     })
  // }, [])

  // if (isSettingUser && status === 'loading') return <Loading />

  // if (!user?.finishedSetup && status !== 'loading')
  return (
    <>
      <Head>
        <title>DevDex</title>
      </Head>
      <div className='flex h-screen w-full justify-center overflow-y-auto bg-dark-main text-dark-bright'>
        <FocusTrap>
          <form onSubmit={handleCreateProfileSubmit}>
            <div className='h-full w-full'>
              <div className='flex max-w-3xl flex-col gap-12 p-8'>
                <div className='create-profile-form-section flex flex-col gap-4 rounded-xl p-4'>
                  <label
                    htmlFor='username'
                    className='text-3xl font-bold'
                  >
                    Choose a username
                  </label>
                  <div className='font-medium leading-7 text-dark-muted'>
                    You can always change it later.
                  </div>
                  <input
                    id='username'
                    maxLength={24}
                    className='flex w-full flex-grow appearance-none rounded-xl border-2 border-dark-main bg-light-main p-4 text-base text-light-muted  duration-200 focus:border-brand focus:text-light-bright dark:bg-[#06070b] dark:text-dark-muted dark:focus:text-dark-bright'
                    onChange={e => setUsername(e.target.value)}
                  ></input>
                </div>

                <div className='create-profile-form-section flex flex-col gap-4 rounded-xl p-4'>
                  <label
                    htmlFor='bio'
                    className='text-3xl font-bold'
                  >
                    Write a bio
                  </label>
                  <div className='font-medium leading-7 text-dark-muted'>
                    Talk about yourself, your interests, include some links, and
                    some pronouns.
                  </div>
                  <textarea
                    id='bio'
                    rows={8}
                    maxLength={255}
                    className='flex w-full flex-grow appearance-none rounded-xl border-2 border-dark-main bg-light-main p-4 text-base text-light-muted  duration-200 focus:border-brand focus:text-light-bright dark:bg-[#06070b] dark:text-dark-muted dark:focus:text-dark-bright'
                    onChange={e => setBio(e.target.value)}
                  ></textarea>
                </div>

                <div className='create-profile-form-section flex flex-col gap-4 rounded-xl p-4'>
                  <label
                    htmlFor='flair'
                    className='text-3xl font-bold'
                  >
                    Now, make a flair
                  </label>
                  <div className='font-medium leading-7 text-dark-muted'>
                    Flairs appear before your username, so keep it simple!
                  </div>
                  <input
                    id='flair'
                    maxLength={6}
                    className='flex w-full flex-grow appearance-none rounded-xl border-2 border-dark-main bg-light-main p-4 text-base text-light-muted  duration-200 focus:border-brand focus:text-light-bright dark:bg-[#06070b] dark:text-dark-muted dark:focus:text-dark-bright'
                    onChange={e => setFlair(e.target.value)}
                  ></input>
                </div>

                <div className='create-profile-form-section flex flex-col gap-4 rounded-xl p-4'>
                  <label
                    htmlFor='color'
                    className='text-3xl font-bold'
                  >
                    Choose a profile color
                  </label>
                  <div className='font-medium leading-7 text-dark-muted'>
                    This color appears in your profile. Pick a color, any color!
                  </div>
                  <div className='banner-color-picker flex w-full'>
                    <HexColorPicker
                      color={bannerColor}
                      onChange={setBannerColor}
                    />
                  </div>
                  <input
                    id='color'
                    maxLength={7}
                    onChange={e => setBannerColor(e.target.value)}
                    value={bannerColor}
                    className='flex w-full flex-grow appearance-none rounded-xl border-0 bg-light-main p-4 text-base text-light-muted  focus:text-light-bright dark:bg-[#06070b] dark:text-dark-muted dark:focus:text-dark-bright'
                  ></input>
                </div>

                <div className='create-profile-form-section flex flex-col gap-4 rounded-xl p-4'>
                  <label
                    htmlFor='key'
                    className='text-3xl font-bold'
                  >
                    Admin API Key
                  </label>
                  <div className='font-medium leading-7 text-dark-muted'>
                    For now, you need an API key to create an account. Have one?
                    Put that shit here
                  </div>
                  <input
                    id='key'
                    className='flex w-full flex-grow appearance-none rounded-xl border-2 border-dark-main bg-light-main p-4 text-base text-light-muted  duration-200 focus:border-brand focus:text-light-bright dark:bg-[#06070b] dark:text-dark-muted dark:focus:text-dark-bright'
                    onChange={e => setKey(e.target.value)}
                  ></input>
                </div>

                <div className='flex flex-col gap-4 rounded-xl p-4'>
                  <button
                    className='ml-auto h-fit w-fit cursor-pointer whitespace-nowrap rounded-lg border-[1px] border-brand bg-brand-muted py-1 px-4 text-center font-normal text-dark-bright  transition-opacity duration-200 focus-within:opacity-40 hover:opacity-40 active:!scale-[0.95] disabled:cursor-default disabled:grayscale disabled:focus-within:opacity-100 disabled:hover:opacity-100 disabled:active:!scale-100'
                    type='submit'
                  >
                    Create your profile
                  </button>
                </div>
              </div>
            </div>
          </form>
        </FocusTrap>
      </div>
    </>
  )
}
