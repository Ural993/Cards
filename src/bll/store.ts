import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from 'redux-thunk'
import {AppActionType, appReducer} from "./reducers/r4-app/app-reducer";
import {LoginActionsType, loginReducer} from "./reducers/r1-login/login-reduser";
import {RegistrationActionsType, registrationReducer} from "./reducers/r2-registration/registation-reducer";
import {PassRecoveryActionsType, passwordRecoveryReducer} from "./reducers/r3-passwordRecovery/pass-recovery-reducer";
import {PacksActionsType, PacksReducer} from "./reducers/r5-packs/packs-reducer";
import {CardsActionsType, CardsReducer} from "./reducers/r6-cards/cards-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    registration: registrationReducer,
    passwordRecovery: passwordRecoveryReducer,
    packs: PacksReducer,
    cards: CardsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppStateType = ReturnType<typeof rootReducer>
export type AppActionsType =
    LoginActionsType
    | RegistrationActionsType
    | CardsActionsType
    | PacksActionsType
    | AppActionType
    | PassRecoveryActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    AppStateType,
    unknown,
    AppActionsType>

//@ts-ignore
window.store = store