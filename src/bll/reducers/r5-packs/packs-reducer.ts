import {Dispatch} from "redux"
import {packsApi} from "../../../dal/cardsApi";
import {AppStateType} from "../../store";
import {setIsFetchingAC} from "../r4-app/app-reducer";


export type PackType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string
    user_name: string
}
type initStateType = {
    packs: Array<PackType>
    cardPacksTotalCount: number
    pageCount: number
    page: number
    isMyPacks: boolean
    maxCardsCount: number,
    minCardsCount: number,
}

const initState = {
    packs: [],
    cardPacksTotalCount: 0,
    pageCount: 8,
    page: 1,
    isMyPacks: false,
    maxCardsCount: 200,
    minCardsCount: 0,
}


export const PacksReducer = (state: initStateType = initState, action: ActionsType) => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
            return {
                ...state,
                packs: action.payload,
                cardPacksTotalCount: action.cardPacksTotalCount,
                pageCount: action.pageCount,
                page: action.page
            }
        case "PACKS/SET-PAGE":
            return {...state, page: action.page}
        case "PACKS/SET-PAGE-COUNT":
            return {...state, pageCount: action.pageCount}
        case "PACKS/GET-MY-PACKS":
            return {...state, isMyPacks: action.parameter}
        case "PACKS/SET-MIN-MAX-VALUE":
            return {...state, minCardsCount: action.value[0], maxCardsCount: action.value[1]}
        default :
            return state
    }
}
const setPacksAC = (payload: Array<PackType>, cardPacksTotalCount: number, pageCount: number, page: number) => ({
    type: "PACKS/SET-PACKS",
    payload,
    cardPacksTotalCount, pageCount, page
} as const)
export const setPageAC = (page: number) => ({type: "PACKS/SET-PAGE", page} as const)
export const setPageCountAC = (pageCount: number) => ({type: "PACKS/SET-PAGE-COUNT", pageCount} as const)
export const getMyPacksParameterAC = (parameter: boolean) => ({type: "PACKS/GET-MY-PACKS", parameter} as const)
export const setMaxMinValueAC = (value: any | number[]) => ({type: "PACKS/SET-MIN-MAX-VALUE", value} as const)

export const getPacks = (isMyPacks?: boolean) => (dispatch: Dispatch, getState: () => AppStateType) => {
    dispatch(setIsFetchingAC(true))
    let {page, pageCount, maxCardsCount, minCardsCount} = getState().packs
    let user_id
    isMyPacks ? user_id = getState().app.userDate._id : user_id = ''
    packsApi.getPacks(page, pageCount, user_id, maxCardsCount, minCardsCount)
        .then((res) => {
            let {cardPacks, cardPacksTotalCount} = res.data
            dispatch(setPacksAC(cardPacks, cardPacksTotalCount, pageCount, page))
        })
        .catch((err) => {
        })
        .finally(() => {
            dispatch(setIsFetchingAC(false))
        })
}
export const addPack = (name: string) => (dispatch: any, getState: () => AppStateType) => {
    let isMyPacks = getState().packs.isMyPacks
    packsApi.addPack(name)
        .then((res) => {
            dispatch(getPacks(isMyPacks))
        })
}
export const deletePack = (id: string) => (dispatch: any, getState: () => AppStateType) => {
    let isMyPacks = getState().packs.isMyPacks
    packsApi.deletePack(id)
        .then((res) => {
            dispatch(getPacks(isMyPacks))
        })
}
export const updatePack = (id: string, newName: string) => (dispatch: any, getState: () => AppStateType) => {
    let isMyPacks = getState().packs.isMyPacks
    packsApi.updatePack(id, newName)
        .then((res) => {
            dispatch(getPacks(isMyPacks))
        })
}


type setPacksACType = ReturnType<typeof setPacksAC>
type setPageACType = ReturnType<typeof setPageAC>
type setPageCountACType = ReturnType<typeof setPageCountAC>
type getMyPacksParameterType = ReturnType<typeof getMyPacksParameterAC>
type setMaxMinValueACType = ReturnType<typeof setMaxMinValueAC>
type ActionsType = setPacksACType | setPageACType | setPageCountACType | getMyPacksParameterType | setMaxMinValueACType