import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getPacks, PackType} from "../../../bll/reducers/packs/packs-reducer";
import {AppStateType} from "../../../bll/store";
import {PacksList} from "./PacksList";


export const PacksPage = () => {
    const dispatch = useDispatch()
    const packs = useSelector<AppStateType, Array<PackType>>(state => state.packsList)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.app.isAuthorized)
    useEffect(() => {
        if (isAuthorized) {
            dispatch(getPacks())
        }
    }, [isAuthorized])

    return (
        <div>
         <PacksList packs={packs}/>
        </div>
    )
}