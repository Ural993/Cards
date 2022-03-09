import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CardType, getCards} from "../../../bll/reducers/r6-cards/cards-reducer";
import {AppStateType} from "../../../bll/store";
import {CardsList} from "./CardsList";
import styles from './CardsPage.module.scss'
import {CardsPagination} from "./Pagination/CardsPagination";
import {Preloader} from "../../../common/components/c4-Preloader/Preloader";
import {CardsSelect} from "./Select/Select";
import {AddCardModal} from "./AddCardModal/AddCardModal";


export const CardsPage = () => {
    const dispatch = useDispatch()
    const cards = useSelector<AppStateType, Array<CardType>>((state) => state.cards.cards)
    const page = useSelector<AppStateType, number>((state) => state.cards.page)
    const pageCount = useSelector<AppStateType, number>((state) => state.cards.pageCount)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.app.isAuthorized)
    const isFetching = useSelector<AppStateType, boolean>((state) => state.app.isFetching)
    let userId = useSelector<AppStateType, string>(state => state.app.userDate._id)
    let packUserId = useSelector<AppStateType, any>((state) => state.cards.packUserId)


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
                <div className={styles.searchBlock}>
                    <input className={styles.searchInp} type="text" placeholder={'Search...'}/>
                    <button className={styles.searchBtn}>Search</button>
                </div>
                {userId === packUserId && <button className={styles.addCardBtn} onClick={openModal}>Add new card</button>}
            </div>
            {cards.length !== 0 ? <CardsList cards={cards}/> : <div>Not cards</div>}
            <div className={styles.cardsSelectPagination}>
                <CardsPagination/>
                <div className={styles.selectWrapper}><span>Show</span> <CardsSelect/> Cards per Page</div>
            </div>
        </div>

    )
}