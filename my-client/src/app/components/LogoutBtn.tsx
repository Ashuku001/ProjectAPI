'use client'
import { Dispatch, SetStateAction } from "react"
import { getClient } from "@/lib/graphql/ApolloClient"
import {withApollo} from '@apollo/client/react/hoc'
import { LoginFormProps } from "../../../types"


function LogoutBtn() {
    const logout = () => {
        localStorage.removeItem('jwt')
        getClient().stop()
        getClient().resetStore();
    }
  return (
    <button className="" onClick={logout}>logout</button>
  )
}

export default LogoutBtn