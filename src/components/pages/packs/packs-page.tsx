import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getPacks, PackType, setPageCountAC} from "../../../bll/reducers/packs/packs-reducer";
import {AppStateType} from "../../../bll/store";
import {PacksList} from "./PacksList";
import {PacksPagination} from "./Pagination/PacksPagination";
import { Select } from "./Select/Select";


export const PacksPage = () => {
    const dispatch = useDispatch()
    const packs = useSelector<AppStateType, Array<PackType>>(state => state.packs.packs)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.app.isAuthorized)
    const page = useSelector<AppStateType, number>((state) => state.packs.page)
    const statePageCount = useSelector<AppStateType, number>((state) => state.packs.pageCount)

    useEffect(() => {
        if (isAuthorized) {
            dispatch(getPacks())
        }
    }, [isAuthorized, page, statePageCount])
    let [pageCount, setPageCount] = useState(statePageCount)
    let [collapsed, setCollapsed] = useState<boolean>(false)
    const onChange = (pageCount: number) => {
        dispatch(setPageCountAC(pageCount))
        setPageCount(pageCount)
        setCollapsed(false)
    }
    return (
        <div>
            <PacksList packs={packs}/>
            <PacksPagination/>
            <Select pageCount={pageCount} onChange={onChange} collapsed={collapsed}
                    onChangeCollapsed={() => setCollapsed(!collapsed)} items={[
                { pageCount: 10 },
                { pageCount: 20 },
                { pageCount: 30 },
            ]} />
        </div>
    )
}