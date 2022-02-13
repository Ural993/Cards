import { Dispatch } from "redux"
import {packsApi} from "../../../dal/cardsApi";


export type PackType={
    _id:string
    user_id:string
    name:string
    cardsCount:number
    created:string
    updated:string
}


const initState:Array<PackType> = []

export const PacksReducer = (state:Array<PackType> = initState, action: ActionsType) => {
    switch (action.type) {
        case "PACKS/SET-PACKS":
            return action.payload.map(p=>{
                return p  })
        default :
           return state
    }
}
const setPacksAC =(payload:Array<PackType>)=>({type:"PACKS/SET-PACKS", payload} as const)

export const getPacks =()=>(dispatch:Dispatch)=>{
    packsApi.getPacks()
        .then((res)=>{
            dispatch(setPacksAC(res.data.cardPacks))
        })
        .catch((err)=>{
            debugger
        })
}

type setPacksACType = ReturnType<typeof setPacksAC>
type ActionsType = setPacksACType