import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useEffect} from "react";
import {
    addPack,
    getMyPacksParameterAC,
    getPacks,
    PackType,
} from "../../../bll/reducers/r5-packs/packs-reducer";
import {AppStateType} from "../../../bll/store";
import {PacksList} from "./PacksList";
import {PacksPagination} from "./Pagination/PacksPagination";
import {PacksSelect} from "./Select/Select";
import styles from './PacksPage.module.scss'
import {Preloader} from "../../../common/components/c4-Preloader/Preloader";


export const PacksPage = () => {
    const dispatch = useDispatch()
    const packs = useSelector<AppStateType, Array<PackType>>(state => state.packs.packs)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.app.isAuthorized)
    const page = useSelector<AppStateType, number>((state) => state.packs.page)
    const packsPageCount = useSelector<AppStateType, number>((state) => state.packs.pageCount)
    const parameter = useSelector<AppStateType, boolean>((state) => state.packs.parameter)
    const isFetching = useSelector<AppStateType, boolean>((state) => state.app.isFetching)
    useEffect(() => {
        if (isAuthorized) {
            dispatch(getPacks())
        }
    }, [isAuthorized, page, packsPageCount, parameter])

    const AddPack = () => {
        dispatch(addPack('Hello world!'))
    }
    const changeParameter = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked === true) {
            dispatch(getMyPacksParameterAC(true))
        } else {
            dispatch(getMyPacksParameterAC(false))
        }
    }
    if (isFetching) {
        return <Preloader/>
    }
    return (
        <div className={styles.packsPage}>
            <div className={styles.leftPart}>
                <h2>Show packs cards</h2>
                <input onChange={changeParameter} type="checkbox"/>
                <h3>Number of cards</h3>

            </div>
            <div className={styles.rightPart}>
                <h2>Packs list</h2>
                <div className={styles.block}>
                    <input type="text"/>
                    <button onClick={AddPack}>Add new pack</button>
                </div>
                <PacksList packs={packs}/>
                <div className={styles.pagSelectBlock}>
                    <PacksPagination/>
                    <div className={styles.selectWrapper}><span>Show</span> <PacksSelect/> Cards per Page</div>
                </div>

            </div>

        </div>
    )
}