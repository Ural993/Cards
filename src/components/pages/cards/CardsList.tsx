import React from "react";
import {Card} from "./Card";
import {CardType} from "../../../bll/reducers/cards/cards-reducer";


export const CardsList =(props:any)=>{
    return(
        <div>
            {props.cards.map((c:CardType) => {
                return (<Card card ={c}/>)
            })}
        </div>
    )
}