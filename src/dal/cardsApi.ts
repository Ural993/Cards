import axios from "axios"
import {addPack} from "../bll/reducers/packs/packs-reducer";

const instance = axios.create({
    //baseURL: "http://localhost:7542/2.0/",
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    withCredentials: true,
})

export const authApi = {
    ping() {
        return instance.get("ping")
    },
    authorization() {
        return instance.post('auth/me', {})
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post('auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete('auth/me', {})
    },
    registerUser(email: string, password: string) {
        return instance.post<RegisterRequestType>("auth/register", {email, password})
    },
    passwordRecovery(email: string) {
        const message = `<div style="background-color: lime; padding: 15px">
                        password recovery link: 
                     <a href='http://localhost:3000/#/pass/$token$'>link</a></div>`
        return instance.post("https://neko-back.herokuapp.com/2.0/auth/forgot", {email, message})
    },
    createNewPassword(password: string, resetPasswordToken: string) {
        return instance.post("auth/set-new-password", {password, resetPasswordToken})
    }
}
export const packsApi = {
    getPacks(page: number = 0, pageCount: number = 10, user_id:string='') {
        return instance.get(`cards/pack?&pageCount=${pageCount}&page=${page}&user_id=${user_id}`)
    },
    addPack(name: string) {
        return instance.post('cards/pack', {cardsPack: {name}})
    },
    getCards(id: string) {
        return instance.get(`cards/card?&cardsPack_id=${id}`)
    }
}

type RegisterRequestType = {
    error?: string
}

export type RequestUserDate = {
    _id: string,
    email: string,
    name: string,
    avatar: string,
    publicCardPacksCount: number,
    created: Date,
    updated: Date,
    isAdmin: boolean,
    verified: boolean,
    rememberMe: boolean,
}