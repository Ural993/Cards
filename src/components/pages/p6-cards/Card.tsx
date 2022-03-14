import React, {useState} from "react";
import styles from './Card.module.scss'
import {CardType, deleteCard} from "../../../bll/reducers/r6-cards/cards-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";
import {EditCardModal} from "./EditCardModal/EditCardModal";
import fullStar from '../../../common/images/FullStar.svg'
import emptyStar from '../../../common/images/EmptyStar.svg'

type PropsType = {
    card: CardType
}
export const Card = ({card, ...props}: PropsType) => {
    const dispatch = useDispatch()
    let userId = useSelector<AppStateType, string>(state => state.app.userDate._id)


    const deleteCardBtn = (cardsPack_id: string, id: string) => {
        dispatch(deleteCard(cardsPack_id, id))
    }
    const [wantToEdit, setWantToEdit] = useState(false)

    const openModal = () => {
        setWantToEdit(true)
    }
    const closeModal = () => {
        setWantToEdit(false)
    }
    return (
        <div className={styles.card}>
            <div className={styles.question}>{card.question}</div>
            <div className={styles.answer}>{card.answer}</div>
            <div className={styles.updated}>{card.updated.slice(0, 10).split('-').reverse().join('.')}</div>
            <div className={styles.grade}><Grades grade={card.grade}/></div>
            {userId === card.user_id &&
            <div className={styles.buttons}>
                <div>
                    <button className={styles.dellBtn}
                            onClick={() => deleteCardBtn(card.cardsPack_id, card._id)}>Delete
                    </button>
                </div>
                <div>
                    <button onClick={openModal}>Edit</button>
                </div>
            </div>
            }
            {wantToEdit && <EditCardModal closeModal={closeModal} packId={card.cardsPack_id}
                                          cardId={card._id} question={card.question} answer={card.answer}/>}
        </div>
    )
}

const Grades = (props: any) => {
    return (
        <div>
            <div className={styles.star}>
                <img src={props.grade > 1 ? fullStar : emptyStar} alt=""/>
                <img src={props.grade > 2 ? fullStar : emptyStar} alt=""/>
                <img src={props.grade > 3 ? fullStar : emptyStar} alt=""/>
                <img src={props.grade > 4 ? fullStar : emptyStar} alt=""/>
                <img src={props.grade > 5 ? fullStar : emptyStar} alt=""/>
            </div>
        </div>
    )
}