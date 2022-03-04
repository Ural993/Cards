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
}
type initStateType = {
    packs: Array<PackType>
    cardPacksTotalCount: number
    pageCount: number
    page: number
    parameter: boolean
}

const initState = {
    packs: [],
    cardPacksTotalCount: 0,
    pageCount: 8,
    page: 1,
    parameter: false,
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
            return {...state, parameter: action.parameter}
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


export const getPacks = () => (dispatch: Dispatch, getState: () => AppStateType) => {
    dispatch(setIsFetchingAC(true))
    let page = getState().packs.page
    let pageCount = getState().packs.pageCount
    let parameter = getState().packs.parameter
    let user_id
    parameter ? user_id = getState().app.userDate._id : user_id = ''
    packsApi.getPacks(page, pageCount, user_id)
        .then((res) => {
            dispatch(setPacksAC(res.data.cardPacks, res.data.cardPacksTotalCount, res.data.pageCount, res.data.page))
        })
        .catch((err) => {
            debugger
        })
        .finally(()=>{
            dispatch(setIsFetchingAC(false))
        })
}
export const addPack = (name: string) => (dispatch: any) => {
    packsApi.addPack(name)
        .then((res) => {
            dispatch(getPacks())
        })
}
export const deletePack = (id: string) => (dispatch: any) => {
    packsApi.deletePack(id)
        .then((res) => {
            dispatch(getPacks())
        })
}
export const updatePack = (id: string, newName:string) => (dispatch: any) => {
    packsApi.updatePack(id, newName)
        .then((res) => {
            dispatch(getPacks())
        })
}


type setPacksACType = ReturnType<typeof setPacksAC>
type setPageACType = ReturnType<typeof setPageAC>
type setPageCountACType = ReturnType<typeof setPageCountAC>
type getMyPacksParameterType = ReturnType<typeof getMyPacksParameterAC>
type ActionsType = setPacksACType | setPageACType | setPageCountACType | getMyPacksParameterType