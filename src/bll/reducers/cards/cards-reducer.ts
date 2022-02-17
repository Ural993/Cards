import {Dispatch} from "redux";
import {cardsApi} from "../../../dal/cardsApi";

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    updated: string,
    _id:string
}

const initState: Array<CardType> = []

export const CardsReducer = (state = initState, action: ActionsType) => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return action.cards.map(c => c)
        default:
            return state
    }
}
const setCardsAC = (cards: Array<CardType>) => ({type: "CARDS/SET-CARDS", cards})
export const getCards = (id: string) => (dispatch: Dispatch) => {
    cardsApi.getCards(id)
        .then((res) => {
            dispatch(setCardsAC(res.data.cards))
        })
}
export const addCard =(cardsPack_id:string)=>(dispatch: any)=>{
    cardsApi.addCard(cardsPack_id)
        .then((res)=>{
            dispatch(getCards(cardsPack_id))
        })
}
export const deleteCard =(cardsPack_id:string, card_id:string)=>(dispatch: any)=>{
    cardsApi.deleteCard(card_id)
        .then((res)=>{
            dispatch(getCards(cardsPack_id))
        })
}
export const updateCard =(cardsPack_id:string, card_id:string)=>(dispatch: any)=>{
    cardsApi.updateCard(card_id)
        .then((res)=>{
            dispatch(getCards(cardsPack_id))
        })
}


type setCardsACType = ReturnType<typeof setCardsAC>
type ActionsType = setCardsACType