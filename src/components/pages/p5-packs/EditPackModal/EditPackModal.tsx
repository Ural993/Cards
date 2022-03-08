import {ModalHOC} from "../../../../common/modal/Modal";
import styles from './EditPackModal.module.scss'
import {useDispatch} from "react-redux";
import {ChangeEvent, useState} from "react";
import {updatePack} from "../../../../bll/reducers/r5-packs/packs-reducer";

type EditPackModalPropsType = {
    closeModal: () => void,
    id:string
}
export const EditPackModal = ModalHOC(({closeModal, id}: EditPackModalPropsType) => {
        const dispatch = useDispatch()

        const EditPack = () => {
            dispatch(updatePack(id, packName))
            closeModal()
        }
        let [packName, setPackName] = useState('')

        const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
            setPackName(e.currentTarget.value)
        }
        return (
            <div className={styles.addCardModal}>
                <h3 className={styles.title}>Edit pack</h3>
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
                    <button onClick={EditPack}>Save</button>
                </div>
            </div>
        )
    }
)