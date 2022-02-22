import {useDispatch, useSelector} from "react-redux";
import React, {ChangeEvent, useEffect, useState} from "react";
import {
    addPack,
    getMyPacksParameterAC,
    getPacks,
    PackType,
    setPageCountAC
} from "../../../bll/reducers/packs/packs-reducer";
import {AppStateType} from "../../../bll/store";
import {PacksList} from "./PacksList";
import {PacksPagination} from "./Pagination/PacksPagination";
import {Select} from "./Select/Select";
import styles from './PacksPage.module.scss'


export const PacksPage = () => {
    const dispatch = useDispatch()
    const packs = useSelector<AppStateType, Array<PackType>>(state => state.packs.packs)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.app.isAuthorized)
    const page = useSelector<AppStateType, number>((state) => state.packs.page)
    const statePageCount = useSelector<AppStateType, number>((state) => state.packs.pageCount)
    const parameter = useSelector<AppStateType, boolean>((state) => state.packs.parameter)

    useEffect(() => {
        if (isAuthorized) {
            dispatch(getPacks())
        }
    }, [isAuthorized, page, statePageCount, parameter])

    let [pageCount, setPageCount] = useState(statePageCount)
    let [collapsed, setCollapsed] = useState<boolean>(false)

    const onChange = (pageCount: number) => {
        dispatch(setPageCountAC(pageCount))
        setPageCount(pageCount)
        setCollapsed(false)
    }
    const AddPack=()=>{
        dispatch(addPack('Hello world!'))
    }
    const changeParameter=(e:ChangeEvent<HTMLInputElement>)=>{
        if (e.target.checked === true){
            dispatch(getMyPacksParameterAC(true))
        }
        else {
            dispatch(getMyPacksParameterAC(false))
        }
    }
    return (
        <div className={styles.packsPage}>
            <div className={styles.leftPart}>
                <h2>Show packs cards</h2>
                <input  onChange={changeParameter} type="checkbox"/>
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
                    <Select pageCount={pageCount} onChange={onChange} collapsed={collapsed}
                            onChangeCollapsed={() => setCollapsed(!collapsed)} items={[
                        {pageCount: 10},
                        {pageCount: 20},
                        {pageCount: 30},
                    ]}/>
                </div>

            </div>

        </div>
    )
}