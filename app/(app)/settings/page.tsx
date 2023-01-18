'use client'

import ProgressIndicator from '@/components/Posts/Composer/ProgressIndicator'
import Flair from '@/components/Profile/Flairs'
import * as Dialog from '@radix-ui/react-dialog'
import * as Toast from '@radix-ui/react-toast'
import { UserContext } from 'app/UserProvider'
import clsx from 'clsx'
import { useThemeStore } from 'lib/themeState'
import Head from 'next/head'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { FormEvent, useContext, useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

const ThemeToggle = () => {
  const switchTheme = useThemeStore(state => state.switchTheme)
  const toggleSystem = useThemeStore(state => state.toggleSystem)
  const system = useThemeStore(state => state.system)
  const theme = useThemeStore(state => state.theme)
  const dark = theme === 'dark'

  return (
    <div className='settings-check-row grid grid-cols-[1fr_min-content] grid-rows-[min-content] items-center gap-2.5 pt-2.5 text-light-bright transition dark:text-dark-bright'>
      <label
        htmlFor='systemTheme'
        className='settings-check-row-label col-start-1 row-span-2 row-start-1 cursor-pointer select-none font-bold'
      >
        Use system theme
      </label>
      <div className='col-start-2 row-span-2'>
        <input
          type='checkbox'
          onChange={toggleSystem}
          checked={system}
          className='settings-check-row-box h-6 w-6 cursor-pointer rounded border-2 border-brand duration-200'
          id='systemTheme'
        ></input>
      </div>
      <label
        htmlFor='darkMode'
        className={clsx(
          'settings-check-row-label col-start-1 row-span-1 cursor-pointer select-none font-bold firefox:duration-200',
          system && 'cursor-default opacity-50'
        )}
      >
        Enable dark mode
      </label>
      <div className='col-start-2 row-span-2'>
        <input
          type='checkbox'
          onChange={() => {
            switchTheme()
          }}
          disabled={system}
          checked={dark}
          className={clsx(
            'settings-check-row-box h-6 w-6 cursor-pointer rounded border-2 border-brand firefox:duration-200',
            system && 'cursor-default opacity-50'
          )}
          id='darkMode'
        ></input>
      </div>
    </div>
  )
}

const ProfileSettings = () => {
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [flair, setFlair] = useState('')
  const [bannerUrl, setBannerUrl] = useState('')
  const [bannerColor, setBannerColor] = useState('#aabbcc')
  const [postInProgress, setPostInProgress] = useState(false)
  const [avatarConfirm, setAvatarConfirm] = useState(false)
  const [image, setImage] = useState('')
  const [, setProgress] = useState(0)
  const user = useContext(UserContext)
  const avatarUploadRef = useRef<HTMLInputElement>(null)
  const bannerUploadRef = useRef<HTMLInputElement>(null)

  const handleAvatarUpload = async () => {
    if (avatarUploadRef) {
      avatarUploadRef?.current?.click()
    }
  }

  const handleBannerUpload = async () => {
    if (bannerUploadRef) {
      bannerUploadRef?.current?.click()
    }
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    for (let i = 0; i < files.length; i++) {
      uploadFile(files[i])
    }
  }

  const uploadFile = (file: string | Blob) => {
    const url = 'https://api.cloudinary.com/v1_1/devdex/upload'
    const xhr = new XMLHttpRequest()
    const fd = new FormData()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

    xhr.upload.addEventListener('progress', e => {
      setProgress(Math.round((e.loaded * 100.0) / e.total))
    })

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4 || xhr.status !== 200) return
      const response = JSON.parse(xhr.responseText)
      setImage(response.secure_url)
    }

    fd.append('upload_preset', 'devdex_user_content')
    fd.append('tags', 'browser_upload')
    fd.append('file', file)
    xhr.send(fd)
  }

  const handleBanner = (files: FileList | null) => {
    if (!files) return
    for (let i = 0; i < files.length; i++) {
      uploadBanner(files[i])
    }
  }

  const uploadBanner = (file: string | Blob) => {
    const url = 'https://api.cloudinary.com/v1_1/devdex/upload'
    const xhr = new XMLHttpRequest()
    const fd = new FormData()
    xhr.open('POST', url, true)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

    xhr.upload.addEventListener('progress', e => {
      setProgress(Math.round((e.loaded * 100.0) / e.total))
    })

    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4 || xhr.status !== 200) return
      const response = JSON.parse(xhr.responseText)
      setBannerUrl(response.secure_url)
    }

    fd.append('upload_preset', 'devdex_user_content')
    fd.append('tags', 'browser_upload')
    fd.append('file', file)
    xhr.send(fd)
  }

  const handleProfileSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setPostInProgress(true)

    await fetch(`/api/users/patch/${user?.email}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'JUd3fnmR2KrqwHp5qUSoVXGyFzoipM94aeJ58CiW7SkLSim7zBhemhwkb7QAD82r8Mubw9kFtGc7LsYH42YNHQ7CvpmLDaFP2KHNa3gxrhCbJCGmnUSAGeZZ8qh5WTxV',
        flair,
        username,
        image: image,
        banner: bannerUrl,
        color: bannerColor,
        bio,
      }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setPostInProgress(false)
        }
      })
  }

  return (
    <Dialog.Root
      onOpenChange={setAvatarConfirm}
      open={avatarConfirm}
    >
      <div>
        {postInProgress && <ProgressIndicator />}
        <div className='profile-settings-split flex flex-col gap-6'>
          <form
            onSubmit={handleProfileSubmit}
            className='flex w-full flex-col gap-4'
          >
            <div className='profile-wrapper flex w-full flex-shrink-0 flex-grow flex-col overflow-y-auto rounded-xl bg-light-main dark:bg-[#06070b]'>
              <div className='profile-info-wrapper mx-auto flex w-full max-w-[42rem] flex-grow flex-col rounded-xl p-8'>
                {/* Banner */}
                <div
                  style={{
                    background: `url('${
                      bannerUrl || user?.banner
                    }') 50% center / cover no-repeat, ${
                      bannerColor || user?.color || '#000000'
                    }`,
                    width: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: '50%',
                    backgroundRepeat: 'no-repeat',
                    boxSizing: 'border-box',
                  }}
                  className='profile-banner flex aspect-[3/1] w-full rounded-t-xl'
                ></div>
                <div>
                  <div className='profile-info-header flex w-full flex-col gap-4 rounded-b-xl bg-light-card p-4 dark:bg-[#10131E]'>
                    <div className='profile-info-header-content-wrapper flex flex-row justify-between'>
                      <div className='bg-muted flex shrink-0 flex-col'>
                        <div className='avatar-upload-wrapper relative z-30 m-2 mt-[-64px] aspect-square h-32 w-32 rounded-full border-8 border-light-card bg-dark-muted object-cover dark:border-dark-card'>
                          <div
                            onClick={() => setAvatarConfirm(true)}
                            className='upload-text absolute top-0 right-0 left-0 bottom-0 flex select-none items-center justify-center text-sm font-bold uppercase text-dark-bright'
                          >
                            Upload
                          </div>
                          <Image
                            alt='Profile Avatar'
                            className='aspect-square rounded-full'
                            src={
                              image || user?.image || '/placeholder-avatar.png'
                            }
                            width={128}
                            height={128}
                          />
                        </div>
                        <div className='profile-info-name mx-auto  font-bold'>
                          <div className='profile-info-name-layout flex flex-row'>
                            <Flair flair={flair || user?.flair || ''} />
                            <div className='profile-info-name-username text-light-bright dark:text-dark-bright'>
                              {username || user?.username}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{ wordBreak: 'break-word' }}
                        className='profile-description ml-8 w-full rounded-md bg-light-main p-4 text-light-bright dark:bg-[#06070b] dark:text-dark-bright'
                      >
                        {bio || user?.bio || 'No bio set'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='flair'
                  className='font-bold text-light-bright dark:text-dark-bright'
                >
                  Flair
                </label>
                <input
                  id='flair'
                  maxLength={8}
                  onChange={e => setFlair(e.target.value)}
                  placeholder={user?.flair}
                  className='flex w-full flex-grow appearance-none rounded-xl border-0 bg-light-main p-4 text-base text-light-muted  focus:text-light-bright dark:bg-[#06070b] dark:text-dark-muted dark:focus:text-dark-bright'
                ></input>
              </div>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='username'
                  className='font-bold text-light-bright dark:text-dark-bright'
                >
                  Username
                </label>
                <input
                  id='username'
                  maxLength={24}
                  placeholder={user?.username}
                  onChange={e => setUsername(e.target.value)}
                  className='flex w-full flex-grow appearance-none rounded-xl border-0 bg-light-main p-4 text-base text-light-muted  focus:text-light-bright dark:bg-[#06070b] dark:text-dark-muted dark:focus:text-dark-bright'
                ></input>
              </div>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='bio'
                  className='font-bold text-light-bright dark:text-dark-bright'
                >
                  Bio
                </label>
                <textarea
                  id='bio'
                  maxLength={255}
                  onChange={e => setBio(e.target.value)}
                  placeholder={user?.bio || 'No bio set'}
                  rows={8}
                  className='flex w-full flex-grow resize-none appearance-none rounded-xl border-0 bg-light-main p-4 text-base text-light-muted  focus:text-light-bright dark:bg-[#06070b] dark:text-dark-muted dark:focus:text-dark-bright'
                ></textarea>
              </div>
              <div className='flex flex-col gap-2'>
                <div className='settings-split flex basis-1/2 flex-row-reverse gap-4'>
                  <div className='banner-color-picker flex w-full'>
                    <HexColorPicker
                      color={bannerColor}
                      onChange={setBannerColor}
                    />
                  </div>
                  <div className='h-full w-full'>
                    <label
                      htmlFor='color'
                      className='font-bold text-light-bright dark:text-dark-bright'
                    >
                      Color
                    </label>
                    <input
                      id='color'
                      maxLength={6}
                      onChange={e => setBannerColor(e.target.value)}
                      placeholder={user?.color || 'Not set'}
                      value={bannerColor}
                      className='flex w-full flex-grow appearance-none rounded-xl border-0 bg-light-main p-4 text-base text-light-muted  focus:text-light-bright dark:bg-[#06070b] dark:text-dark-muted dark:focus:text-dark-bright'
                    ></input>
                    <div className='mt-4 flex rounded-xl'>
                      <div
                        onClick={() => setBannerColor(user?.color || '#000')}
                        className='h-[6.5rem] w-full flex-1 rounded-l-xl'
                        style={{
                          background: user?.color || '#000',
                        }}
                      ></div>
                      <div
                        className='h-[6.5rem] w-full flex-1 rounded-r-xl'
                        style={{ background: bannerColor }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              tabIndex={1}
              className='ml-auto h-fit w-fit cursor-pointer whitespace-nowrap rounded-full bg-brand py-1 px-4 text-center font-normal text-dark-bright  duration-200 focus-within:bg-brand-hover hover:bg-brand-hover active:!scale-[0.95] disabled:cursor-default disabled:grayscale disabled:focus-within:opacity-100 disabled:hover:opacity-100 disabled:active:!scale-100'
              type='submit'
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className='DialogOverlay' />
        <Dialog.Content className='DialogContent'>
          <Dialog.Title className='DialogTitle'>Edit Profile</Dialog.Title>
          <Dialog.Description className='DialogDescription'>
            For avatars, we recommend a square picture (512x512)
          </Dialog.Description>
          <Dialog.Description className='DialogDescription'>
            For banners, we recommend a 3:1 aspect ratio (1500x500)
          </Dialog.Description>
          <div
            onClick={handleBannerUpload}
            className='profile-banner flex aspect-[3/1] w-full rounded-t-xl duration-200 hover:opacity-75 dark:bg-[#10131E]'
          >
            <div
              className='profile-banner-image flex flex-grow rounded-t-xl'
              style={{
                background: `url('${
                  bannerUrl || user?.banner
                }') 50% center / cover no-repeat, ${
                  bannerColor || user?.color || '#000000'
                }`,
                width: '100%',
                backgroundSize: 'cover',
                backgroundPosition: '50%',
                backgroundRepeat: 'no-repeat',
                boxSizing: 'border-box',
              }}
            ></div>
            <input
              ref={bannerUploadRef}
              title='File Upload'
              className='absolute top-0 left-0 h-[1px] w-[1px] opacity-0'
              type='file'
              accept='image/*'
              onChange={e => handleBanner(e.target.files)}
            ></input>
          </div>
          <div
            onClick={handleAvatarUpload}
            className='avatar-upload-wrapper relative z-30 -mt-[64px] ml-4 aspect-square h-32 w-32 rounded-full border-8 border-light-card bg-dark-muted object-cover duration-200 hover:opacity-75 dark:border-dark-card'
          >
            <Image
              alt='Profile Avatar'
              className='aspect-square rounded-full'
              src={image || user?.image || '/placeholder-avatar.png'}
              width={128}
              height={128}
            />
            <input
              ref={avatarUploadRef}
              title='File Upload'
              className='absolute top-0 left-0 h-[1px] w-[1px] opacity-0'
              type='file'
              accept='image/*'
              onChange={e => handleFiles(e.target.files)}
            ></input>
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            <Dialog.Close asChild>
              <button
                type='button'
                className='Button green'
              >
                Upload!
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className='IconButton'
              aria-label='Close'
            >
              <X
                size={16}
                color='currentColor'
                weight='regular'
              />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default () => {
  const [toastOpen, setToastOpen] = useState(false)

  // const { status } = useSession()

  // if (status === 'unauthenticated' && process.env.NODE_ENV === 'production') {
  //   router.replace('/login')
  // }

  return (
    <>
      <Head>
        <title>Settings - DevDex</title>
      </Head>
      <Toast.Provider>
        <div className='flex w-full bg-light-main transition dark:bg-[#06070b]'>
          <div className=''></div>
          <div className='flex h-full w-full flex-col items-center overflow-y-auto'>
            <div className='settings-display flex h-full w-full flex-col items-center overflow-y-auto'>
              <div className='settings-list my-6 flex w-full max-w-[42rem] flex-col gap-8 px-6'>
                <div className='settings-section flex w-full flex-col gap-4 rounded-xl bg-light-card p-8 transition dark:bg-[#10131E]'>
                  <div className=' text-2xl font-bold tracking-wide text-light-bright transition dark:text-dark-bright'>
                    Display Settings
                  </div>
                  <div className='text-root  text-light-bright transition dark:text-dark-bright'>
                    Change how DevDex looks and functions
                  </div>
                  <ThemeToggle />
                </div>
                <div className=' settings-section flex w-full flex-col gap-4 rounded-xl bg-light-card p-8 transition dark:bg-[#10131E]'>
                  <div className=' text-2xl font-bold tracking-wide text-light-bright transition dark:text-dark-bright'>
                    Account Settings
                  </div>
                  <ProfileSettings />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Toast.Root
          className='ToastRoot SuccessToast'
          open={toastOpen}
          onOpenChange={setToastOpen}
        >
          <Toast.Title className='ToastTitle !mb-0'>
            Profile Updated
          </Toast.Title>
        </Toast.Root>
        <Toast.Viewport className='ToastViewport' />
      </Toast.Provider>
    </>
  )
}
