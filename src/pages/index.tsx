'use client'
import { Inter } from 'next/font/google'
import github from '@/assets/githun.svg'
import Image from 'next/image'
import {getSession, signIn} from 'next-auth/react'
import { GetServerSideProps } from 'next'
import { FormEventHandler, useState } from 'react'
import { useRouter } from 'next/router'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const {push} = useRouter()

  const [data, setData] = useState({
    email:'',
    password:''
  })

  const inputValue = (e) => setData({
    ...data, [e.target.name]:e.target. value
  })

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const result = await signIn('credentials',{
      ...data,
      redirect: false,
      callbackUrl:'/'
    })

    if(result?.url){
      return push(result?.url)
    }
  }

  return (
    <main
      className={`bg-gray-900 h-screen text-gray-600 ${inter.className} flex justify-center items-center`}
    >
      <section className='container flex flex-col jusitfy-content items-center '>
        <h1 className='text-3xl text-white my-10 font-bold'>Seja Bem-Vindo de volta</h1>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col bg-white rounded-lg p-6'
          method='post'>
          <h1 className='font-bold text-2xl text-center'>Login</h1>
      
          <input 
            className='outline-none border-b-2 mt-4 mb-2'
            type='email' 
            placeholder='Digite seu email'
            onChange={inputValue}  
          />

          <input 
            className='outline-none border-b-2 mt-4 mb-2'
            type='password' 
            placeholder='Digite sua senha'
            onChange={inputValue}
          />

          <button 
            type='submit'
            className='bg-gray-600 text-white p-2 my-2 rounded-lg hover:opacity-80 transition easy-in'
          > Entrar </button>

          <fieldset className='border-t border-gray-600 mt-2'>
            <legend className='mx-auto px-2'>
              ou
            </legend>
            <p className='text-center text-sm mt-2'>Faça Login com:</p>
          </fieldset>

          <button
            onClick={()=>signIn('github')}
            className='flex items-center justify-center bg-gray-600 text-white p-2 my-2 rounded-lg hover:opacity-80 transition easy-in'
          >
              <Image className='mx-2'src={github} width={20} height={20} alt='logo github' />
             Login com GitHub  
          </button>
        </form>
      </section>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
  const session = await getSession(context)

  if(session) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}