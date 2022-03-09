import {ModalHOC} from "../../../../common/modal/Modal";
import styles from './EditPackModal.module.scss'
import {useDispatch} from "react-redux";
import {ChangeEvent, useState} from "react";
import {updatePack} from "../../../../bll/reducers/r5-packs/packs-reducer";
import cross from "../../../../common/images/Cross.svg";

type EditPackModalPropsType = {
    closeModal: () => void,
    id: string,
    packName: string
}
export const EditPackModal = ModalHOC(({closeModal, id, packName}: EditPackModalPropsType) => {
        const dispatch = useDispatch()

        const EditPack = () => {
            dispatch(updatePack(id, newPackName))
            closeModal()
        }
        let [newPackName, setNewPackName] = useState(packName)

        const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
            setNewPackName(e.currentTarget.value)
        }
        return (
            <div className={styles.editPackModal}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Edit pack</h3>
                    <img src={cross} alt="" onClick={closeModal}/>
                </div>

                <div className="inputs">
                    <input
                        type="text"
                        className={styles.inp}
                        placeholder={'Pack name'}
                        onChange={onChangePackName}
                        value={newPackName}
                        autoFocus
                    />
                </div>
                <div className={styles.buttons}>
                    <button className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                    <button className={styles.saveBtn} onClick={EditPack}>Save</button>
                </div>
            </div>
        )
    }
)