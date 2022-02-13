import React from "react";
import styles from './Card.module.scss'
import {CardType} from "../../../bll/reducers/cards/cards-reducer";

type PropsType={
    card:CardType
}
export const Card =({card,...props }:PropsType)=>{
    return(
        <div className={styles.card}>
          <div className={styles.question}>{card.question}</div>
          <div className={styles.answer}>{card.answer}</div>
          <div className={styles.updated}>{card.updated}</div>
          <div className={styles.grade}>{card.grade}</div>
        </div>
    )
}