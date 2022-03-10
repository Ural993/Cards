import {Dispatch} from "redux";
import {authApi} from "../../../dal/cardsApi";

const initState = {
    userDate: {
        _id: "",
        email: "",
        name: "",
        avatar: "",
        publicCardPacksCount: 0,
    },
    isFetching: false,
    isAuthorized: false,
}

type AppInitStateType = typeof initState


export const appReducer = (state: AppInitStateType = initState, action: AppActionType) => {
    switch (action.type) {
        case "APP/SET-IS-FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "APP/SET-USER-DATES":
            return {...state, userDate: action.payload}
        case "APP/IS-AUTHORIZED":
            return {...state, isAuthorized: action.isAuthorized}
        default:
            return state
    }
}

export const setIsFetchingAC = (isFetching: boolean) => {
    return {type: "APP/SET-IS-FETCHING", isFetching} as const
}
export const setUserDatesAC = (
    _id: string, email: string,
    name: string, avatar: string, publicCardPacksCount: number,
) => ({
    type: "APP/SET-USER-DATES", payload: {
        _id, email,
        name, avatar, publicCardPacksCount
    }
} as const)

export const isAuthorizedAC = (isAuthorized: boolean) => ({type: "APP/IS-AUTHORIZED", isAuthorized} as const)


export const authorization = () => (dispatch: Dispatch<AppActionType>) => {
    authApi.authorization()
        .then((res) => {
            let {
                _id, email,
                name, avatar, publicCardPacksCount
            } = res.data
            dispatch(setUserDatesAC(_id, email,
                name, avatar, publicCardPacksCount))
            dispatch(isAuthorizedAC(true))
        })
}
export const logout = () => (dispatch: Dispatch<AppActionType>) => {
    authApi.logout()
        .then((res) => {
            dispatch(isAuthorizedAC(false))
        })
}


export type SetIsFetchingAT = ReturnType<typeof setIsFetchingAC>
type setUserDatesACType = ReturnType<typeof setUserDatesAC>
type isAuthorizedACType = ReturnType<typeof isAuthorizedAC>
export type AppActionType = SetIsFetchingAT | setUserDatesACType | isAuthorizedACType
