import React from "react";
import {deletePack, PackType, updatePack} from "../../../bll/reducers/r5-packs/packs-reducer";
import styles from './Pack.module.scss'
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";

type PropsType = {
    pack: PackType
}
export const Pack = ({pack, ...props}: PropsType) => {

    const dispatch = useDispatch()

    const deletePackBtn = (id: string) => {
        dispatch(deletePack(id))
    }

    const updatePackBtn = (id: string, newName:string='New name') => {
        dispatch(updatePack(id, newName))
    }
    return (
        <div className={styles.pack}>
            <Link to={`/cards/${pack._id}`} className={styles.name}>{pack.name}</Link>
            <div className={styles.cardsCount}>{pack.cardsCount}</div>
            <div className={styles.updated}>{pack.updated.slice(0, 10).split('-').reverse().join('.')}</div>
            <div className={styles.created}>{pack.created.slice(0, 10).split('-').reverse().join('.')}</div>
            <div>
                <button onClick={() => deletePackBtn(pack._id)}>Delete</button>
            </div>
            <div>
                <button onClick={() => updatePackBtn(pack._id)}>Edit</button>
            </div>
            <div>
                <button>Learn</button>
            </div>
        </div>
    )
}