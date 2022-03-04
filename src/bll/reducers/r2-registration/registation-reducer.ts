import {Dispatch} from "redux";
import { authApi } from "../../../dal/cardsApi";
import {setIsFetchingAC, SetIsFetchingAT} from "../r4-app/app-reducer";


const initState = {
    error: "",
    isRegistered: false,
}

type InitStateType = typeof initState

type RegistrationActionType = SetErrorAT | SetIsRegisteredAT

export const registrationReducer = (state: InitStateType = initState, action: RegistrationActionType) => {
    switch (action.type) {
        case "REGISTRATION-REDUCER/SET-ERROR":
            return {
                ...state,
                error: action.error
            }
        case "REGISTRATION-REDUCER/IS-REGISTERED":
            return {
                ...state,
                isRegistered: action.isRegistered
            }
        default:
            return state
    }
}

type SetErrorAT = ReturnType<typeof setErrorAC>
export const setErrorAC = (error: string) => {
    return{
        type: "REGISTRATION-REDUCER/SET-ERROR",
        error
    } as const
}

type SetIsRegisteredAT = ReturnType<typeof setIsRegisteredAC>
export const setIsRegisteredAC = (isRegistered: boolean) => {
    return{
        type: "REGISTRATION-REDUCER/IS-REGISTERED",
        isRegistered
    } as const
}


//THUNK

type RegistrationDispatchType = RegistrationActionType | SetIsFetchingAT

export const testPing = () => (dispatch: Dispatch<RegistrationDispatchType>) => {
    authApi.ping()
        .then(res => {
            console.log(res)
        })
}

export const registerUser = (email: string, password: string) => async (dispatch: Dispatch<RegistrationDispatchType>) => {
    dispatch(setErrorAC(""))
    dispatch(setIsFetchingAC(true))
    try{
        let res = await authApi.registerUser(email, password)
        console.log(res)

        dispatch(setIsRegisteredAC(true))
    }
    catch (err: any){
        console.log(err.response.data.error)
        dispatch(setErrorAC(err.response.data.error))
    }
    finally {
        dispatch(setIsFetchingAC(false))
    }
}