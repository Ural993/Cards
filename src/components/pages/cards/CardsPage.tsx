import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {addCard, CardType, getCards} from "../../../bll/reducers/cards/cards-reducer";
import {AppStateType} from "../../../bll/store";
import {CardsList} from "./CardsList";
import styles from './CardsPage.module.scss'


export const CardsPage = () => {
    const dispatch = useDispatch()
    const cards = useSelector<AppStateType, Array<CardType>>((state) => state.cards)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.app.isAuthorized)
    const {id} = useParams()
    useEffect(() => {
        if (isAuthorized) {
            if (id) {
                dispatch(getCards(id))
            }
        }
    }, [isAuthorized])
    const addCardBtn = () => {
        if (id) {
            dispatch(addCard(id))
        }
    }

    return (
        <div className={styles.cardsPage}>
            <h2>Pack name</h2>
            <div className={styles.block}>
                <input type="text"/>
                <button onClick={addCardBtn}>Add new card</button>
            </div>
            {cards.length !== 0 ? <CardsList cards={cards}/> : <div>Not cards</div>}
        </div>
    )
}