import {ModalHOC} from "../../../../common/modal/Modal";
import styles from './AddPackModal.module.scss'
import {useDispatch} from "react-redux";
import {ChangeEvent, useState} from "react";
import {addPack} from "../../../../bll/reducers/r5-packs/packs-reducer";
import cross from '../../../../common/images/Cross.svg'

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
                <div className={styles.header}>
                    <h3 className={styles.title}>Add new pack</h3>
                    <img src={cross} alt="" onClick={closeModal}/>
                </div>
                <div className="inputs">
                    <input
                        type="text"
                        className={styles.inp}
                        placeholder={'Pack name'}
                        onChange={onChangePackName}
                        value={packName}
                    />
                </div>
                <div className={styles.buttons}>
                    <button className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                    <button className={styles.saveBtn} onClick={AddPack}>Save</button>
                </div>
            </div>
        )
    }
)