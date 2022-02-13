import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {CardType, getCards} from "../../../bll/reducers/cards/cards-reducer";
import {AppStateType} from "../../../bll/store";
import {CardsList} from "./CardsList";


export const CardsPage = () => {
    const dispatch = useDispatch()
    const cards = useSelector<AppStateType, Array<CardType>>((state)=>state.cards)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.app.isAuthorized)
    const {id} = useParams()
    useEffect(() => {
        if(isAuthorized){
            if (id) {
                dispatch(getCards(id))
            }
        }
    }, [isAuthorized])
    return (
        <div>
            {cards.length !==0? <CardsList cards={cards}/>: <div>Not cards</div> }
        </div>
    )
}