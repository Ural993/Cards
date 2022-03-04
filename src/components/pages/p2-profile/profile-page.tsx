import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";
import {logout} from "../../../bll/reducers/r4-app/app-reducer";
import {Navigate} from "react-router-dom";

export const ProfilePage = () => {
    const dispatch = useDispatch()
    const userName = useSelector<AppStateType, string>(state => state.app.userDate.name)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.app.isAuthorized)
    const onClickHandler =()=>{
        dispatch(logout())
    }
    if(!isAuthorized){
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            <div>
                <button onClick={onClickHandler}>logout</button>
            </div>
            UserName:{userName}
        </div>
    )
}