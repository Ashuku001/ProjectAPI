'use client'
import { makeVar } from "@apollo/client";

let id: any = typeof window!==undefined ? localStorage.getItem('merchantId') : -100
if(id){
    id = parseInt(id)
}

export const isLoggedInVar = makeVar<boolean>(typeof window!==undefined ? !!localStorage.getItem('jwt') : false)
export const merchantId = makeVar<number>(id)

export const activateModal = makeVar([false])
export const useShowSearchList = makeVar<boolean>(false)
export const useIsSelected = makeVar([false])
export const useSelectedTemplate = makeVar([])
export const reactiveChatId = makeVar<number>(-100)
export const useCustomerId = makeVar<number[]>([-100])