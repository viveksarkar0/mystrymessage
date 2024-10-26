'use client'
import { signOut, useSession,signIn } from "next-auth/react";


export default function Sign_In() {
    const {data:session} =useSession()
    if(session){
        return(
            <>
            Singned in as {session.user.email}<br/>
            <button onClick={()=>signOut()}>Sign out</button>
            </>
        )
    }
    return (

    <>
    Not singed in <br/>
    <button className="bg-orange-500 px-3 py-2 m-4 rounded" onClick={()=> signIn()}>Sign in </button>
    
    </>
    );
  }
  