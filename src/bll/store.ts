import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from 'redux-thunk'
import { appReducer } from "./reducers/app/app-reducer";
import { loginReducer } from "./reducers/r1-login/login-reduser";
import { registrationReducer } from "./reducers/r2-registration/registation-reducer";
import { passwordRecoveryReducer } from "./reducers/r3-passwordRecovery/pass-recovery-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    registration: registrationReducer,
    passwordRecovery: passwordRecoveryReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store