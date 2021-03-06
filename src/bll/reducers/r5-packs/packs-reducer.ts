import {Dispatch} from "redux"
import {packsApi} from "../../../dal/cardsApi";
import {AppActionsType, AppStateType, AppThunk} from "../../store";
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
    packNameForSearch: string
}

const initState = {
    packs: [],
    cardPacksTotalCount: 0,
    pageCount: 8,
    page: 1,
    isMyPacks: false,
    maxCardsCount: 200,
    minCardsCount: 0,
    packNameForSearch: ''
}


export const PacksReducer = (state: initStateType = initState, action: PacksActionsType) => {
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
        case "PACKS/SET-PACK-NAME-FOR-SEARCH":
            return {...state, packNameForSearch: action.packNameForSearch}
        default :
            return state
    }
}

// AC
const setPacksAC = (payload: Array<PackType>, cardPacksTotalCount: number, pageCount: number, page: number) => ({
    type: "PACKS/SET-PACKS",
    payload,
    cardPacksTotalCount, pageCount, page
} as const)
export const setPageAC = (page: number) => ({type: "PACKS/SET-PAGE", page} as const)
export const setPageCountAC = (pageCount: number) => ({type: "PACKS/SET-PAGE-COUNT", pageCount} as const)
export const getMyPacksParameterAC = (parameter: boolean) => ({type: "PACKS/GET-MY-PACKS", parameter} as const)
export const setMaxMinValueAC = (value: any | number[]) => ({type: "PACKS/SET-MIN-MAX-VALUE", value} as const)
export const setPackNameForSearchAC = (packNameForSearch: string) => ({
    type: "PACKS/SET-PACK-NAME-FOR-SEARCH",
    packNameForSearch
} as const)

//Thunks
export const getPacks = (isMyPacks?: boolean) =>
    async (dispatch: Dispatch<AppActionsType>, getState: () => AppStateType) => {
        try {
            dispatch(setIsFetchingAC(true))
            let {page, pageCount, maxCardsCount, minCardsCount, packNameForSearch} = getState().packs
            let user_id
            isMyPacks ? user_id = getState().app.userDate._id : user_id = ''
            let res = await packsApi.getPacks(page, pageCount, user_id, maxCardsCount, minCardsCount, packNameForSearch)
            let {cardPacks, cardPacksTotalCount} = res.data
            dispatch(setPacksAC(cardPacks, cardPacksTotalCount, pageCount, page))
        } catch (err: any) {

        } finally {
            dispatch(setIsFetchingAC(false))
        }
    }
export const addPack = (name: string): AppThunk =>
    async (dispatch, getState: () => AppStateType) => {
        try {
            let isMyPacks = getState().packs.isMyPacks
            let res = await packsApi.addPack(name)
            dispatch(getPacks(isMyPacks))
        } catch (e) {
        }
    }
export const deletePack = (id: string): AppThunk =>
    async (dispatch, getState: () => AppStateType) => {
        try {
            let isMyPacks = getState().packs.isMyPacks
            let res = await packsApi.deletePack(id)
            dispatch(getPacks(isMyPacks))
        } catch (e) {
        }
    }
export const updatePack = (id: string, newName: string): AppThunk =>
    async (dispatch, getState: () => AppStateType) => {
        try {
            let isMyPacks = getState().packs.isMyPacks
            let res = packsApi.updatePack(id, newName)
            dispatch(getPacks(isMyPacks))
        } catch (e) {

        }
    }


type setPacksACType = ReturnType<typeof setPacksAC>
type setPageACType = ReturnType<typeof setPageAC>
type setPageCountACType = ReturnType<typeof setPageCountAC>
type getMyPacksParameterType = ReturnType<typeof getMyPacksParameterAC>
type setMaxMinValueACType = ReturnType<typeof setMaxMinValueAC>
type setPackNameForSearch = ReturnType<typeof setPackNameForSearchAC>
export type PacksActionsType =
    setPacksACType
    | setPageACType
    | setPageCountACType
    | getMyPacksParameterType
    | setMaxMinValueACType
    | setPackNameForSearch