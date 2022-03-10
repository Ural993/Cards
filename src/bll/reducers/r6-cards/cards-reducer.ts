import {Dispatch} from "redux";
import {cardsApi} from "../../../dal/cardsApi";
import {AppActionsType, AppStateType, AppThunk} from "../../store";
import {setIsFetchingAC} from "../r4-app/app-reducer";

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    updated: string,
    _id: string,
    user_id: string
    shots: number,
    type: string,
    rating: number,
    more_id: string,
    created: string
}

const initState: initStateType = {
    cards: [],
    cardsTotalCount: 0,
    pageCount: 8,
    page: 1,
    packUserId: '',
    cardAnswerForSearch: ''
}
type initStateType = {
    cards: Array<CardType>,
    cardsTotalCount: number,
    pageCount: number,
    page: number,
    packUserId: string,
    cardAnswerForSearch: string
}

export const CardsReducer = (state = initState, action: CardsActionsType) => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return {
                ...state,
                cards: action.cards.map(c => c),
                cardsTotalCount: action.cardsTotalCount,
                packUserId: action.packUserId
            }
        case "CARDS/SET-CARDS-PAGE":
            return {
                ...state, page: action.page
            }
        case "CARDS/SET-CARDS-PAGE-COUNT":
            return {...state, pageCount: action.pageCount}
        case "CARDS/SET-CARD-ANSWER-FOR-SEARCH":
            return {...state, cardAnswerForSearch: action.cardAnswerForSearch}
        default:
            return state
    }
}
//AC
const setCardsAC = (cards: Array<CardType>, cardsTotalCount: number, packUserId: string) => ({
    type: "CARDS/SET-CARDS",
    cards,
    cardsTotalCount, packUserId
} as const)
export const setCardsPageAC = (page: number) => ({type: "CARDS/SET-CARDS-PAGE", page} as const)
export const setCardsPageCountAC = (pageCount: number) => ({type: "CARDS/SET-CARDS-PAGE-COUNT", pageCount} as const)
export const setCardAnswerForSearchAC = (cardAnswerForSearch: string) => ({
    type: "CARDS/SET-CARD-ANSWER-FOR-SEARCH",
    cardAnswerForSearch
} as const)
//Thunks
export const getCards = (id: string, pageCount?: number) => async (dispatch: Dispatch<AppActionsType>, getState: () => AppStateType) => {

    try {
        dispatch(setIsFetchingAC(true))
        let {page, cardAnswerForSearch} = getState().cards
        if (!pageCount) {
            pageCount = getState().cards.pageCount
        }

        let res = await cardsApi.getCards(id, page, pageCount, cardAnswerForSearch)
        let {cards, cardsTotalCount, packUserId} = res.data
        dispatch(setCardsAC(cards, cardsTotalCount, packUserId))
    } catch (err) {
        console.log(err)
    } finally {
        dispatch(setIsFetchingAC(false))
    }
}
export const addCard = (cardsPack_id: string, question: string, answer: string): AppThunk =>
    async dispatch => {
        try {
            let res = await cardsApi.addCard(cardsPack_id, question, answer)
            dispatch(getCards(cardsPack_id))
        } catch (err: any) {

        }
    }
export const deleteCard = (cardsPack_id: string, card_id: string): AppThunk => async dispatch => {
    try {
        let res = await cardsApi.deleteCard(card_id)
        dispatch(getCards(cardsPack_id))
    } catch (err: any) {
    }

}
export const updateCard = (cardsPack_id: string, card_id: string, question: string, answer: string): AppThunk =>
    async dispatch => {
        try {
            let res = await cardsApi.updateCard(card_id, question, answer)
            dispatch(getCards(cardsPack_id))
        } catch (e) {

        }
    }
export const setGrade = (cardsPack_id: string, card_id: string, grade: number): AppThunk => async dispatch => {
    try {
        dispatch(setIsFetchingAC(true))
        let res = await cardsApi.setGrade(card_id, grade)
        dispatch(getCards(cardsPack_id, 1000))
    } finally {
    }

}


type setCardsACType = ReturnType<typeof setCardsAC>
type setCardsPageACType = ReturnType<typeof setCardsPageAC>
type setCardsPageCountACType = ReturnType<typeof setCardsPageCountAC>
type setCardAnswerForSearchACType = ReturnType<typeof setCardAnswerForSearchAC>
export type CardsActionsType =
    setCardsACType
    | setCardsPageACType
    | setCardsPageCountACType
    | setCardAnswerForSearchACType