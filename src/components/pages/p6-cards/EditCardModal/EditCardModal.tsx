import {ModalHOC} from "../../../../common/modal/Modal";
import styles from './EditCardModal.module.scss'
import {updateCard} from "../../../../bll/reducers/r6-cards/cards-reducer";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ChangeEvent, useState} from "react";
import cross from "../../../../common/images/Cross.svg";

type AddCardModalPropsType = {
    closeModal: () => void
    packId: string
    cardId: string
    question: string
    answer: string
}
export const EditCardModal = ModalHOC(({closeModal, packId, cardId, answer, question}: AddCardModalPropsType) => {
        const {id} = useParams()
        const dispatch = useDispatch()

        const addCardBtn = () => {
            if (id) {
                dispatch(updateCard(packId, cardId, newQuestion, newAnswer))
                closeModal()
            }
        }
        let [newQuestion, setNewQuestion] = useState(question)
        let [newAnswer, setNewAnswer] = useState(answer)
        const changeQuestionInp = (e: ChangeEvent<HTMLInputElement>) => {
            setNewQuestion(e.currentTarget.value)
        }
        const changeAnswerInp = (e: ChangeEvent<HTMLTextAreaElement>) => {
            setNewAnswer(e.currentTarget.value)
        }
        return (
            <div className={styles.addCardModal}>
                <div className={styles.header}>
                    <h3 className={styles.title}>Edit card</h3>
                    <img src={cross} alt="" onClick={closeModal}/>
                </div>
                <div className="inputs">
                    <input
                        type="text"
                        className={styles.inp}
                        placeholder={'Question'}
                        onChange={changeQuestionInp}
                        value={question}
                        autoFocus
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