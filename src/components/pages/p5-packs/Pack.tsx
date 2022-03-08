import React, {useState} from "react";
import {deletePack, PackType, updatePack} from "../../../bll/reducers/r5-packs/packs-reducer";
import styles from './Pack.module.scss'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/store";
import {AddPackModal} from "./AddPackModal/AddPackModal";
import {EditPackModal} from "./EditPackModal/EditPackModal";

type PropsType = {
    pack: PackType
}
export const Pack = ({pack, ...props}: PropsType) => {
    let userId = useSelector<AppStateType, string>(state => state.app.userDate._id)

    const dispatch = useDispatch()

    const deletePackBtn = (id: string) => {
        dispatch(deletePack(id))
    }

    const updatePackBtn = (id: string, newName: string = 'New name') => {
        dispatch(updatePack(id, newName))
    }

    const [wantToEdit, setWantToEdit] = useState(false)

    const openModal = () => {
        setWantToEdit(true)
    }
    const closeModal = () => {
        setWantToEdit(false)
    }
    return (
        <div className={styles.pack}>
            <Link to={`/cards/${pack._id}`} className={styles.name}>{pack.name}</Link>
            <div className={styles.cardsCount}>{pack.cardsCount}</div>
            <div className={styles.updated}>{pack.updated.slice(0, 10).split('-').reverse().join('.')}</div>
            <div className={styles.created}>{pack.user_name}</div>
            <div className={styles.buttons}>
                {userId === pack.user_id &&
                <>
                    <div>
                        <button className={styles.dellBtn} onClick={() => deletePackBtn(pack._id)}>Delete</button>
                    </div>
                    <div>
                        <button onClick={openModal}>Edit</button>
                        {/*<button onClick={() => updatePackBtn(pack._id)}>Edit</button>*/}
                    </div>
                </>
                }
                <div className={styles.learnBtnWrapper}>
                    <Link className={styles.learnBtn} to={`/learn/${pack._id}`}>Learn</Link>
                </div>
            </div>
            {wantToEdit && <EditPackModal closeModal={closeModal} id={pack._id}/>}
        </div>
    )
}