import {Dispatch} from "redux";
import {packsApi} from "../../../dal/cardsApi";

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    updated: string
}

const initState: Array<CardType> = []

export const CardsReducer = (state = initState, action: ActionsType) => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return action.cards.map(c=>c)
        default:
            return state
    }
}
const setCardsAC = (cards: Array<CardType>) => ({type: "CARDS/SET-CARDS", cards})
export const getCards = (id: string) => (dispatch: Dispatch) => {
    packsApi.getCards(id)
        .then((res) => {
            dispatch(setCardsAC(res.data.cards))
        })
}


type setCardsACType = ReturnType<typeof setCardsAC>
type ActionsType = setCardsACType