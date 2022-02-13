import React from "react";
import {PackType} from "../../../bll/reducers/packs/packs-reducer";
import styles from './Pack.module.scss'
import {Link} from "react-router-dom";

type PropsType={
    pack:PackType
}
export const Pack =({pack,...props }:PropsType)=>{
    return(
        <div className={styles.pack}>
          <Link to={`/cards/${pack._id}`} className={styles.name}>{pack.name}</Link>
          <div className={styles.cardsCount}>{pack.cardsCount}</div>
          <div className={styles.updated}>{pack.updated}</div>
          <div className={styles.created}>{pack.created}</div>
          <div><button>Delete</button></div>
          <div><button>Edit</button></div>
          <div><button>Learn</button></div>
        </div>
    )
}