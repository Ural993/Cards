import React from "react";
import {PackType} from "../../../bll/reducers/packs/packs-reducer";
import {Pack} from "./Pack";
import styles from "./PackList.module.scss";


export const PacksList = (props: any) => {
    return (
        <div>
            <div className={styles.packsHeader}>
                <div className={styles.name}>Name</div>
                <div className={styles.cardsCount}>Cards</div>
                <div className={styles.updated}>Last Updated</div>
                <div className={styles.created}>Created by</div>
                <div className={styles.actions}>Actions</div>
            </div>

            {props.packs.map((p: PackType) => {
                return (<Pack pack={p}/>)
            })}
        </div>
    )
}