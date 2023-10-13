'use client'
import LoginRegisterForm from './logInRegister'
import { useEffect, useState } from 'react'
import { useMerchantId } from '../globalStore'
interface GuardProps {
  children: React.ReactNode
}

function AuthGuard({ children }: GuardProps) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false) // check if we have a jwt in local storate

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('jwt'))
  }, [])
  

  return (
    <>
    {loggedIn ? (
      children
    ) : <LoginRegisterForm changeLoginState={setLoggedIn}/>}
    </>
  )
}

export default AuthGuard