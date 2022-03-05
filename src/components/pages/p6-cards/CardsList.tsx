import React from "react";
import {Card} from "./Card";
import {CardType} from "../../../bll/reducers/r6-cards/cards-reducer";
import styles from "./CardsList.module.scss";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";

type PropsType = {
    cards: Array<CardType>
}
export const CardsList = (props: PropsType) => {
    let userId = useSelector<AppStateType, string>(state => state.app.userDate._id)

    return (
        <div className={styles.cardsList}>
            <div className={styles.cardsHeader}>
                <div className={styles.question}>Question</div>
                <div className={styles.answer}>Answer</div>
                <div className={styles.updated}>Last Updated</div>
                <div className={styles.grade}>Grade</div>
                {userId === props.cards[0].user_id && <div className={styles.actions}>Actions</div>}
            </div>
            {props.cards.map((c: CardType) => {
                return (<Card key={c._id} card={c}/>)
            })}
        </div>
    )
}