import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CardType, getCards, setCardAnswerForSearchAC} from "../../../bll/reducers/r6-cards/cards-reducer";
import {AppStateType} from "../../../bll/store";
import {CardsList} from "./CardsList";
import styles from './CardsPage.module.scss'
import {CardsPagination} from "./Pagination/CardsPagination";
import {Preloader} from "../../../common/components/c4-Preloader/Preloader";
import {CardsSelect} from "./Select/Select";
import {AddCardModal} from "./AddCardModal/AddCardModal";
import {setPackNameForSearchAC} from "../../../bll/reducers/r5-packs/packs-reducer";


export const CardsPage = () => {
    const dispatch = useDispatch()
    const cards = useSelector<AppStateType, Array<CardType>>((state) => state.cards.cards)
    const page = useSelector<AppStateType, number>((state) => state.cards.page)
    const pageCount = useSelector<AppStateType, number>((state) => state.cards.pageCount)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.app.isAuthorized)
    const isFetching = useSelector<AppStateType, boolean>((state) => state.app.isFetching)
    let userId = useSelector<AppStateType, string>(state => state.app.userDate._id)
    let packUserId = useSelector<AppStateType, any>((state) => state.cards.packUserId)
    let cardAnswerForSearch = useSelector<AppStateType, string>(state => state.cards.cardAnswerForSearch)

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
    }, [isAuthorized, page, pageCount, cardAnswerForSearch])

    let [searchValue, setSearchValue] = useState(cardAnswerForSearch)
    const onChangeSearchInp = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        setSearchValue(value)
    }
    const onClickSearchBtn = () => {
        dispatch(setCardAnswerForSearchAC(searchValue))
    }
    if (isFetching) {
        return <Preloader/>
    }
    return (
        <div className={styles.cardsPage}>
            <div className={styles.container}>
                <h2 className={styles.title}>Pack name</h2>
                {wantToAdd && <AddCardModal closeModal={closeModal}/>}
                <div className={styles.block}>
                    <div className={styles.searchBlock}>
                        <input className={styles.searchInp} type="text" placeholder={'Search...'}
                               onChange={onChangeSearchInp} value={searchValue}/>
                        <button className={styles.searchBtn} onClick={onClickSearchBtn}>Search</button>
                    </div>
                    {userId === packUserId &&
                    <button className={styles.addCardBtn} onClick={openModal}>Add new card</button>}
                </div>
                {cards.length !== 0 ?
                    <>
                        <CardsList cards={cards}/>
                        <div className={styles.cardsSelectPagination}>
                            <CardsPagination/>
                            <div className={styles.selectWrapper}><span>Show</span> <CardsSelect/> Cards per Page</div>
                        </div>
                    </> :

                    <div className={styles.notCards}>This pack is empty. Click add new card to fill this pack</div>}
            </div>

        </div>

    )
}