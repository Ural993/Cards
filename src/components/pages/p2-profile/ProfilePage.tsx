import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";
import {Navigate} from "react-router-dom";
import styles from './ProfilePage.module.scss'
import {RangeSlider} from "../p5-packs/Range/Range";
import {PacksList} from "../p5-packs/PacksList";
import {PacksPagination} from "../p5-packs/Pagination/PacksPagination";
import {PacksSelect} from "../p5-packs/Select/Select";
import {AddPackModal} from "../p5-packs/AddPackModal/AddPackModal";
import {Preloader} from "../../../common/components/c4-Preloader/Preloader";
import {getPacks, PackType} from "../../../bll/reducers/r5-packs/packs-reducer";

export const ProfilePage = () => {
    const userName = useSelector<AppStateType, string>(state => state.app.userDate.name)
    const dispatch = useDispatch()
    const packs = useSelector<AppStateType, Array<PackType>>(state => state.packs.packs)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.app.isAuthorized)
    const page = useSelector<AppStateType, number>((state) => state.packs.page)
    const packsPageCount = useSelector<AppStateType, number>((state) => state.packs.pageCount)
    const isFetching = useSelector<AppStateType, boolean>((state) => state.app.isFetching)
    const min = useSelector<AppStateType, number>(state => (state.packs.minCardsCount))
    const max = useSelector<AppStateType, number>(state => (state.packs.maxCardsCount))
    useEffect(() => {
        if (isAuthorized) {
            dispatch(getPacks(true))
        }
    }, [isAuthorized, page, packsPageCount, min, max])

    const [wantToAdd, setWantToAdd] = useState(false)

    const openModal = () => {
        setWantToAdd(true)
    }
    const closeModal = () => {
        setWantToAdd(false)
    }

    if (isFetching) {
        return <Preloader/>
    }
    if (!isAuthorized) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={styles.profilePage}>
            <div className={styles.container}>
                <div className={styles.leftPart}>
                    <div className={styles.profileBlock}>
                        <img className={styles.img} src="" alt=""/>
                        <h2 className={styles.title}>{userName}</h2>
                    </div>
                    <div className={styles.rangeBlock}>
                        <h3 className={styles.rangeTitle}>Number of cards</h3>
                        <RangeSlider/>
                    </div>

                </div>
                <div className={styles.rightPart}>
                    <h2>Packs list</h2>
                    <div className={styles.block}>
                        <div className={styles.searchBlock}>
                            <input className={styles.searchInp} type="text" placeholder={'Search...'}/>
                            <button className={styles.searchBtn}>Search</button>
                        </div>
                        <button className={styles.addPackBtn} onClick={openModal}>Add new pack</button>
                    </div>
                    {packs.length === 0 ?
                        <div className={styles.notPacks}>This while not packs.</div> :
                        <> <PacksList packs={packs}/>
                            <div className={styles.pagSelectBlock}>
                                <PacksPagination/>
                                <div className={styles.selectWrapper}><span>Show</span> <PacksSelect/> Cards per Page
                                </div>
                            </div>
                        </>
                    }
                </div>
                {wantToAdd && <AddPackModal closeModal={closeModal}/>}
            </div>
        </div>

    )
}