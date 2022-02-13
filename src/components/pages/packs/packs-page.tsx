import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getPacks, PackType} from "../../../bll/reducers/packs/packs-reducer";
import {AppStateType} from "../../../bll/store";
import {PacksList} from "./PacksList";
import {PacksPagination} from "./PacksPagination";


export const PacksPage = () => {
    const dispatch = useDispatch()
    const packs = useSelector<AppStateType, Array<PackType>>(state => state.packs.packs)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.app.isAuthorized)
    const page = useSelector<AppStateType, number>((state) => state.packs.page)

    useEffect(() => {
        if (isAuthorized) {
            dispatch(getPacks())
        }
    }, [isAuthorized, page])

    return (
        <div>
            <PacksList packs={packs}/>
            <PacksPagination/>
        </div>
    )
}