import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {addCard, CardType, getCards} from "../../../bll/reducers/r6-cards/cards-reducer";
import {AppStateType} from "../../../bll/store";
import {CardsList} from "./CardsList";
import styles from './CardsPage.module.scss'
import {CardsPagination} from "./Pagination/CardsPagination";
import {Preloader} from "../../../common/components/c4-Preloader/Preloader";
import {CardsSelect} from "./Select/Select";
import {AddCardModal} from "./AddCardModal/AddCardModal";
import {PackType} from "../../../bll/reducers/r5-packs/packs-reducer";


export const CardsPage = () => {
    debugger
    const dispatch = useDispatch()
    const cards = useSelector<AppStateType, Array<CardType>>((state) => state.cards.cards)
    const page = useSelector<AppStateType, number>((state) => state.cards.page)
    const pageCount = useSelector<AppStateType, number>((state) => state.cards.pageCount)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.app.isAuthorized)
    const isFetching = useSelector<AppStateType, boolean>((state) => state.app.isFetching)
    let userId = useSelector<AppStateType, string>(state => state.app.userDate._id)
    let packUserId = useSelector<AppStateType, string>((state) => state.packs.packs[0].user_id)


    const [wantToAdd, setWantToAdd] = useState(false)

    const openModal = () => {
        setWantToAdd(true)
    }
    const closeModal = () => {
        setWantToAdd(false)
    }

    const {id} = useParams()
    useEffect(() => {
        if (isAuthorized) {
            if (id) {
                dispatch(getCards(id))
            }
        }
    }, [isAuthorized, page, pageCount])

    if (isFetching) {
        return <Preloader/>
    }
    return (
        <div className={styles.cardsPage}>
            <h2 className={styles.title}>Pack name</h2>
            {wantToAdd && <AddCardModal closeModal={closeModal}/>}
            <div className={styles.block}>
                <input type="text"/>
                <button>Search</button>
                {userId === packUserId && <button onClick={openModal}>Add new card</button>}
            </div>
            {cards.length !== 0 ? <CardsList cards={cards}/> : <div>Not cards</div>}
            <div className={styles.cardsSelectPagination}>
                <CardsPagination/>
                <div className={styles.selectWrapper}><span>Show</span> <CardsSelect/> Cards per Page</div>
            </div>
        </div>

    )
}