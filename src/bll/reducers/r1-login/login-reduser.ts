import {AxiosError} from "axios";
import {Dispatch} from "redux";
import {authApi} from "../../../dal/cardsApi";
import {authorization, isAuthorizedAC} from "../r4-app/app-reducer";


const initState = {
    error: '',
}
type initStateType = typeof initState

export const loginReducer = (state: initStateType = initState, action: ActionsType) => {
    switch (action.type) {
        case "LOGIN/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}
const setError = (error: string) => ({type: 'LOGIN/SET-ERROR', error} as const)

export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {
    authApi.login(email, password, rememberMe)
        .then((res) => {
            dispatch(authorization())
        })
        .catch((err: AxiosError) => {
            dispatch(setError(err.response?.data.message))
        })
}
type setErrorType = ReturnType<typeof setError>
type ActionsType = setErrorType