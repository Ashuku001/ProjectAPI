'use client'
import { gql, useQuery } from '@apollo/client';
import LoginRegisterForm from './logInRegister'
import { useEffect, useState } from 'react'

interface GuardProps {
  children: React.ReactNode
}

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

function AuthGuard({ children }: GuardProps) {
  const {data} = useQuery(IS_LOGGED_IN)


  return (
    <>
    {data.isLoggedIn ? (
      children
    ) : <LoginRegisterForm/>}
    </>
  )
}

export default AuthGuard