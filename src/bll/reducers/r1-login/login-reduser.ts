import {AxiosError} from "axios";
import {authApi} from "../../../dal/cardsApi";
import {authorization} from "../r4-app/app-reducer";
import {AppThunk} from "../../store";


const initState = {
    error: '',
}
type initStateType = typeof initState

export const loginReducer = (state: initStateType = initState, action: LoginActionsType) => {
    switch (action.type) {
        case "LOGIN/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}
const setError = (error: string) => ({type: 'LOGIN/SET-ERROR', error} as const)

export const login = (email: string, password: string, rememberMe: boolean): AppThunk =>
    async dispatch => {
        try {
            let res = await authApi.login(email, password, rememberMe)
            dispatch(authorization())
        } catch (err: any) {
            dispatch(setError(err.response?.data.error))
        }
    }

type setErrorType = ReturnType<typeof setError>
export type LoginActionsType = setErrorType