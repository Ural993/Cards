import axios from "axios"

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
    getPacks(page: number = 0, pageCount: number = 10, user_id: string = '', max: number, min: number) {
        return instance.get(`cards/pack`, {params: {page, pageCount, user_id, max, min}})
    },
    addPack(name: string) {
        return instance.post('cards/pack', {cardsPack: {name}})
    },
    deletePack(id: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },
    updatePack(_id: string, name: string) {
        return instance.put('cards/pack', {cardsPack: {_id, name}})
    },
}

export const cardsApi = {
    getCards(cardsPack_id: string, page: number, pageCount: number) {
        return instance.get(`cards/card`, {params: {cardsPack_id, page, pageCount}})
    },
    addCard(cardsPack_id: string, question: string, answer: string) {
        return instance.post('cards/card', {card: {cardsPack_id, question, answer}})
    },
    deleteCard(id: string) {
        return instance.delete(`cards/card?id=${id}`)
    },
    updateCard(_id: string) {
        return instance.put('cards/card', {card: {_id}})
    },
    setGrade(card_id: string, grade: number) {
        return instance.put('cards/grade', {grade, card_id})
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