import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {addCard, CardType, getCards} from "../../../bll/reducers/r6-cards/cards-reducer";
import {AppStateType} from "../../../bll/store";
import {CardsList} from "./CardsList";
import styles from './CardsPage.module.scss'
import {CardsPagination} from "./Pagination/CardsPagination";
import {Preloader} from "../../../common/components/c4-Preloader/Preloader";


export const CardsPage = () => {
    const dispatch = useDispatch()
    const cards = useSelector<AppStateType, Array<CardType>>((state) => state.cards.cards)
    const page = useSelector<AppStateType, number>((state) => state.cards.page)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.app.isAuthorized)
    const isFetching = useSelector<AppStateType, boolean>((state) => state.app.isFetching)

    const {id} = useParams()
    useEffect(() => {
        if (isAuthorized) {
            if (id) {
                dispatch(getCards(id))
            }
        }
    }, [isAuthorized, page])
    const addCardBtn = () => {
        if (id) {
            dispatch(addCard(id))
        }
    }
    if (isFetching) {
        return <Preloader/>
    }
    return (
        <div className={styles.cardsPage}>
            <h2 className={styles.title}>Pack name</h2>
            <div className={styles.block}>
                <input type="text"/>
                <button onClick={addCardBtn}>Add new card</button>
            </div>
            {cards.length !== 0 ? <CardsList cards={cards}/> : <div>Not cards</div>}
            <CardsPagination/>
        </div>

    )
}