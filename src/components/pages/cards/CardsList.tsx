import React from "react";
import {Card} from "./Card";
import {CardType} from "../../../bll/reducers/cards/cards-reducer";
import styles from "./CardsList.module.scss";


export const CardsList =(props:any)=>{
    return(
        <div>
            <div className={styles.packsHeader}>
                <div className={styles.question}>Question</div>
                <div className={styles.answer}>Answer</div>
                <div className={styles.updated}>Last Updated</div>
                <div className={styles.grade}>Grade</div>
                <div className={styles.actions}>Actions</div>
            </div>
            {props.cards.map((c:CardType) => {
                return (<Card card ={c}/>)
            })}
        </div>
    )
}