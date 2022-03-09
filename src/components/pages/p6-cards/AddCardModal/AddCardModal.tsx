import TextField from "@mui/material/TextField";
import {ModalHOC} from "../../../../common/modal/Modal";
import styles from './AddCardModal.module.scss'
import {addCard} from "../../../../bll/reducers/r6-cards/cards-reducer";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ChangeEvent, useState} from "react";
import cross from "../../../../common/images/Cross.svg";

type AddCardModalPropsType = {
    closeModal: () => void
}
export const AddCardModal = ModalHOC(({closeModal}: AddCardModalPropsType) => {
        const {id} = useParams()
        const dispatch = useDispatch()

        const addCardBtn = () => {
            if (id) {
                dispatch(addCard(id, question, answer))
                closeModal()
            }
        }
        let [question, setQuestion] = useState('')
        let [answer, setAnswer] = useState('')
        const changeQuestionInp = (e: ChangeEvent<HTMLInputElement>) => {
            setQuestion(e.currentTarget.value)
        }
        const changeAnswerInp = (e: ChangeEvent<HTMLTextAreaElement>) => {
            setAnswer(e.currentTarget.value)
        }
        return (
            <div className={styles.addCardModal}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Add new card</h3>
                    <img src={cross} alt="" onClick={closeModal}/>
                </div>
                <div className="inputs">
                    <input
                        type="text"
                        className={styles.inp}
                        placeholder={'Question'}
                        onChange={changeQuestionInp}
                        value={question}
                    />
                    <textarea
                           className={styles.inp}
                           placeholder={'Answer'}
                           onChange={changeAnswerInp}
                           value={answer}
                    />
                </div>
                <div className={styles.buttons}>
                    <button className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                    <button className={styles.saveBtn} onClick={addCardBtn}>Save</button>
                </div>
            </div>
        )
    }
)