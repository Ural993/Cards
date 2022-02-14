import {Dispatch} from "redux"
import {packsApi} from "../../../dal/cardsApi";
import {AppStateType} from "../../store";


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
}

const initState = {
    packs: [],
    cardPacksTotalCount: 0,
    pageCount: 0,
    page: 0
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

export const getPacks = () => (dispatch: Dispatch, getState: () => AppStateType) => {
    let page = getState().packs.page
    let pageCount = getState().packs.pageCount
    packsApi.getPacks(page, pageCount)
        .then((res) => {
            dispatch(setPacksAC(res.data.cardPacks, res.data.cardPacksTotalCount, res.data.pageCount, res.data.page))
        })
        .catch((err) => {
            debugger
        })
}

type setPacksACType = ReturnType<typeof setPacksAC>
type setPageACType = ReturnType<typeof setPageAC>
type setPageCountACType = ReturnType<typeof setPageCountAC>
type ActionsType = setPacksACType | setPageACType | setPageCountACType