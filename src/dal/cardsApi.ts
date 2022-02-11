import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true,
})

export const authApi = {
    ping() {
        return instance.get("ping")
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

type RegisterRequestType = {
    error?: string
}