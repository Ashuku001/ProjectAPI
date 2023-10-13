import { makeVar } from "@apollo/client";

export const useMerchantId = makeVar<number[] |  undefined[]>([undefined])
export const useModal = makeVar([false])
export const useShowSearchList = makeVar([false])
export const useIsSelected = makeVar([false])
export const useSelectedTemplate = makeVar([])