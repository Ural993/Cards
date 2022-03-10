import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useEffect, useState} from "react";
import {
    getMyPacksParameterAC,
    getPacks,
    PackType, setPackNameForSearchAC,
} from "../../../bll/reducers/r5-packs/packs-reducer";
import {AppStateType} from "../../../bll/store";
import {PacksList} from "./PacksList";
import {PacksPagination} from "./Pagination/PacksPagination";
import {PacksSelect} from "./Select/Select";
import styles from './PacksPage.module.scss'
import {Preloader} from "../../../common/components/c4-Preloader/Preloader";
import {RangeSlider} from "./Range/Range";
import {AddPackModal} from "./AddPackModal/AddPackModal";
import {Navigate} from "react-router-dom";


export const PacksPage = () => {
    const dispatch = useDispatch()
    const packs = useSelector<AppStateType, Array<PackType>>(state => state.packs.packs)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.app.isAuthorized)
    const page = useSelector<AppStateType, number>((state) => state.packs.page)
    const packsPageCount = useSelector<AppStateType, number>((state) => state.packs.pageCount)
    const isMyPacks = useSelector<AppStateType, boolean>((state) => state.packs.isMyPacks)
    const isFetching = useSelector<AppStateType, boolean>((state) => state.app.isFetching)
    const min = useSelector<AppStateType, number>(state => (state.packs.minCardsCount))
    const max = useSelector<AppStateType, number>(state => (state.packs.maxCardsCount))
    const packNameForSearch = useSelector<AppStateType, string>(state => (state.packs.packNameForSearch))
    useEffect(() => {
        if (isAuthorized) {
            dispatch(getPacks(isMyPacks))
        }
    }, [isAuthorized, page, packsPageCount, isMyPacks, min, max, packNameForSearch])

    const [wantToAdd, setWantToAdd] = useState(false)

    const openModal = () => {
        setWantToAdd(true)
    }
    const closeModal = () => {
        setWantToAdd(false)
    }

    const onClickMy = () => {
        dispatch(getMyPacksParameterAC(true))
    }
    const onClickAll = () => {
        dispatch(getMyPacksParameterAC(false))
    }
    let [searchValue, setSearchValue] = useState(packNameForSearch)
    const onChangeSearchInp = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        setSearchValue(value)
    }
    const onClickSearchBtn = () => {
        dispatch(setPackNameForSearchAC(searchValue))
    }
    if (isFetching) {
        return <Preloader/>
    }
    if (!isAuthorized) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={styles.packsPage}>
            <div className={styles.container}>
                <div className={styles.leftPart}>
                    <h2 className={styles.title}>Show packs cards</h2>
                    <div className={styles.checkboxWrapper}>
                        <div
                            className={!isMyPacks ? `${styles.my} ${styles.inactive}` : `${styles.my} ${styles.active}`}
                            onClick={onClickMy}>My
                        </div>
                        <div className={isMyPacks ? `${styles.my} ${styles.inactive}` : `${styles.my} ${styles.active}`}
                             onClick={onClickAll}>All
                        </div>
                    </div>
                    <h3 className={styles.rangeTitle}>Number of cards</h3>
                    <RangeSlider/>
                </div>
                <div className={styles.rightPart}>
                    <h2 className={styles.title}>Packs list</h2>
                    <div className={styles.block}>
                        <div className={styles.searchBlock}>
                            <input className={styles.searchInp} type="text" placeholder={'Search...'}
                                   onChange={onChangeSearchInp} value={searchValue}/>
                            <button className={styles.searchBtn} onClick={onClickSearchBtn}>Search</button>
                        </div>
                        <button className={styles.addPackBtn} onClick={openModal}>Add new pack</button>
                    </div>
                    <PacksList packs={packs}/>
                    <div className={styles.pagSelectBlock}>
                        <PacksPagination/>
                        <div className={styles.selectWrapper}>
                            <span>Show</span> <PacksSelect/> Cards per Page
                        </div>
                    </div>
                </div>
                {wantToAdd && <AddPackModal closeModal={closeModal}/>}
            </div>
        </div>


    )
}