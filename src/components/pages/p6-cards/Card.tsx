import React from "react";
import styles from './Card.module.scss'
import {CardType, deleteCard, updateCard} from "../../../bll/reducers/r6-cards/cards-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";

type PropsType = {
    card: CardType
}
export const Card = ({card, ...props}: PropsType) => {
    const dispatch = useDispatch()
    let userId = useSelector<AppStateType, string>(state => state.app.userDate._id)


    const deleteCardBtn = (cardsPack_id: string, id: string) => {
        dispatch(deleteCard(cardsPack_id, id))
    }
    const updateCardBtn = (cardsPack_id: string, id: string) => {
        dispatch(updateCard(cardsPack_id, id))
    }
    return (
        <div className={styles.card}>
            <div className={styles.question}>{card.question}</div>
            <div className={styles.answer}>{card.answer}</div>
            <div className={styles.updated}>{card.updated.slice(0, 10).split('-').reverse().join('.')}</div>
            <div className={styles.grade}>{card.grade}</div>
            {userId === card.user_id &&
            <>
                <div>
                    <button onClick={() => deleteCardBtn(card.cardsPack_id, card._id)}>Delete</button>
                </div>
                <div>
                    <button onClick={() => updateCardBtn(card.cardsPack_id, card._id)}>Edit</button>
                </div>
            </>
            }
        </div>
    )
}