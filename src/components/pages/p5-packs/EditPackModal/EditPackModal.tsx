import {ModalHOC} from "../../../../common/modal/Modal";
import styles from './EditPackModal.module.scss'
import {useDispatch} from "react-redux";
import {ChangeEvent, useState} from "react";
import {updatePack} from "../../../../bll/reducers/r5-packs/packs-reducer";

type EditPackModalPropsType = {
    closeModal: () => void,
    id:string,
    packName:string
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
                <h3 className={styles.title}>Edit pack</h3>
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
                <div className="buttons">
                    <button onClick={closeModal}>Cancel</button>
                    <button onClick={EditPack}>Save</button>
                </div>
            </div>
        )
    }
)