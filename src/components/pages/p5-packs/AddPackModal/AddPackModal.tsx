import TextField from "@mui/material/TextField";
import {ModalHOC} from "../../../../common/modal/Modal";
import styles from './AddPackModal.module.scss'
import {addCard} from "../../../../bll/reducers/r6-cards/cards-reducer";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ChangeEvent, useState} from "react";
import {addPack} from "../../../../bll/reducers/r5-packs/packs-reducer";

type AddPackModalPropsType = {
    closeModal: () => void
}
export const AddPackModal = ModalHOC(({closeModal}: AddPackModalPropsType) => {
        const dispatch = useDispatch()

        const AddPack = () => {
            dispatch(addPack(packName))
            closeModal()
        }
        let [packName, setPackName] = useState('')

        const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
            setPackName(e.currentTarget.value)
        }
        return (
            <div className={styles.addCardModal}>
                <h3 className={styles.title}>Add new pack</h3>
                <div className="inputs">
                    <input
                        type="text"
                        className={styles.inp}
                        placeholder={'Pack name'}
                        onChange={onChangePackName}
                        value={packName}
                    />
                </div>
                <div className="buttons">
                    <button onClick={closeModal}>Cancel</button>
                    <button onClick={AddPack}>Save</button>
                </div>
            </div>
        )
    }
)