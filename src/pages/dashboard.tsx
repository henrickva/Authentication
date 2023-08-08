import { useSession, signOut, getSession } from "next-auth/react"
import { GetServerSideProps } from 'next'


export default function Dashboard(){
    const { data: session } = useSession()
    return(
        <div>
            <h1>{session?.user?.name}</h1>
            <button onClick={() => signOut()}>Sign out</button>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    const session = await getSession(context)
  
    if(!session) {
      return {
        redirect: {
          destination: '/',
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
