import {Dispatch} from "redux";
import {authApi} from "../../../dal/cardsApi";

const initState = {
    error: '',
    isToggleError: false,
    email: '',
    isNewPasswordCreated: false,
}
type InitStateType = typeof initState;


export const passwordRecoveryReducer = (state: InitStateType = initState, action: PassRecoveryActionsType) => {
    switch (action.type) {
        case "PASSWORD-RECOVERY-REDUCER/SET-ERROR":
            return {
                ...state,
                error: action.error
            }
        case "PASSWORD-RECOVERY-REDUCER/IS-TOGGLE-ERROR":
            return {
                ...state,
                isToggleError: action.isToggleError
            }
        case "PASSWORD-RECOVERY-REDUCER/SET-EMAIL":
            return {
                ...state,
                email: action.email
            }
        case "PASSWORD-RECOVERY-REDUCER/IS-NEW-PASSWORD-CREATED":
            return {
                ...state,
                isNewPasswordCreated: action.isNewPasswordCreated
            }
        default:
            return state
    }
}
const setErrorAC = (error: string) => ({type: "PASSWORD-RECOVERY-REDUCER/SET-ERROR", error} as const)
const isToggleErrorAC = (isToggleError: boolean) => ({
    type: "PASSWORD-RECOVERY-REDUCER/IS-TOGGLE-ERROR", isToggleError
} as const)
const setEmailAC = (email: string) => ({type: "PASSWORD-RECOVERY-REDUCER/SET-EMAIL", email} as const)
const isNewPasswordCreatedAC = (isNewPasswordCreated: boolean) => ({
    type: "PASSWORD-RECOVERY-REDUCER/IS-NEW-PASSWORD-CREATED", isNewPasswordCreated
} as const)


export const passwordRecovery = (email: string) => async (dispatch: Dispatch<PassRecoveryActionsType>) => {
    try {
        let res = authApi.passwordRecovery(email)
        dispatch(setEmailAC(email))
        dispatch(isToggleErrorAC(true))
    } catch (err: any) {
        dispatch(isToggleErrorAC(err.response.data.error))
    }
}
export const createNewPassword = (password: string, token: string) => (dispatch: Dispatch<PassRecoveryActionsType>) => {
    authApi.createNewPassword(password, token)
        .then((res) => {
            dispatch(isNewPasswordCreatedAC(true))
        })
}

type setErrorACType = ReturnType<typeof setErrorAC>
type isToggleErrorACType = ReturnType<typeof isToggleErrorAC>
type setEmailACType = ReturnType<typeof setEmailAC>
type isNewPasswordCreatedACType = ReturnType<typeof isNewPasswordCreatedAC>
export type PassRecoveryActionsType = setErrorACType | isToggleErrorACType | setEmailACType | isNewPasswordCreatedACType
