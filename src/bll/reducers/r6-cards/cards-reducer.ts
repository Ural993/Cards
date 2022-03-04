import {Dispatch} from "redux";
import {cardsApi} from "../../../dal/cardsApi";
import {AppStateType} from "../../store";
import {setIsFetchingAC} from "../r4-app/app-reducer";

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    updated: string,
    _id: string
}

const initState: initStateType = {
    cards: [],
    cardsTotalCount: 0,
    pageCount: 8,
    page: 1,
}
type initStateType = {
    cards: Array<CardType>,
    cardsTotalCount: number,
    pageCount: number,
    page: number,
}

export const CardsReducer = (state = initState, action: ActionsType) => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return {...state, cards: action.cards.map(c => c), cardsTotalCount: action.cardsTotalCount}
        case "CARDS/SET-CARDS-PAGE":
            return {
                ...state, page: action.page
            }
        default:
            return state
    }
}
//AC
const setCardsAC = (cards: Array<CardType>, cardsTotalCount: number) => ({
    type: "CARDS/SET-CARDS",
    cards,
    cardsTotalCount
} as const)
export const setCardsPageAC = (page: number) => ({type: "CARDS/SET-CARDS-PAGE", page} as const)

//Thunks
export const getCards = (id: string) => (dispatch: Dispatch, getState: () => AppStateType) => {
    dispatch(setIsFetchingAC(true))
    let page = getState().cards.page
    let pageCount = getState().cards.pageCount

    cardsApi.getCards(id, page, pageCount)
        .then((res) => {
            let {cards, cardsTotalCount} = res.data
            dispatch(setCardsAC(cards, cardsTotalCount))
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(() => {
            dispatch(setIsFetchingAC(false))
        })
}
export const addCard = (cardsPack_id: string) => (dispatch: any) => {
    cardsApi.addCard(cardsPack_id)
        .then((res) => {
            dispatch(getCards(cardsPack_id))
        })
}
export const deleteCard = (cardsPack_id: string, card_id: string) => (dispatch: any) => {
    cardsApi.deleteCard(card_id)
        .then((res) => {
            dispatch(getCards(cardsPack_id))
        })
}
export const updateCard = (cardsPack_id: string, card_id: string) => (dispatch: any) => {
    cardsApi.updateCard(card_id)
        .then((res) => {
            dispatch(getCards(cardsPack_id))
        })
}


type setCardsACType = ReturnType<typeof setCardsAC>
type setCardsPageACType = ReturnType<typeof setCardsPageAC>
type ActionsType = setCardsACType | setCardsPageACType