import LoginButtons from '@/components/Login/LoginButtons'
import 'styles/Auth.module.scss'

export default () => (
  <div className='flex h-screen w-full flex-1 flex-row overflow-x-hidden overflow-y-hidden bg-[#ffffff] dark:bg-[#06070b]'>
    <div className='flex w-full flex-row flex-nowrap place-content-stretch'>
      <div className='flex h-full grow basis-8/12 flex-row place-content-stretch items-center overflow-y-auto'>
        <div className='login-wrapper my-auto mx-auto flex w-full max-w-lg flex-col gap-4 overflow-y-auto rounded-2xl p-8 text-center drop-shadow-xl'>
          <div className='new-logo-wrapper mx-auto flex h-8 w-8 items-center gap-2 text-[#4E4AFCff]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='64'
              height='64'
              viewBox='0 0 64 64'
              fill='none'
            >
              <path
                d='M10 35.7377L26.25 20L36 29.4426L23.1354 41.9016L36 54.6229L26.9929 64L10 47.541V35.7377Z'
                fill='currentColor'
              />
              <path
                d='M36.7308 9.46926L46.2628 0L55 8.68349L49.0685 15.2993V48.6898L54.1359 53.7249L44.8012 63L36 54.2549L36.7308 9.46926Z'
                fill='currentColor'
              />
            </svg>
          </div>

          <h1 className='mx-auto w-fit whitespace-nowrap  text-6xl text-[clamp(16px,3vw,24px)] font-bold tracking-wide text-light-bright dark:text-dark-bright'>
            Log in to DevDex
          </h1>

          <LoginButtons />
        </div>
      </div>
    </div>
  </div>
)
