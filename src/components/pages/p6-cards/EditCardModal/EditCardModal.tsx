import {ModalHOC} from "../../../../common/modal/Modal";
import styles from './EditCardModal.module.scss'
import {updateCard} from "../../../../bll/reducers/r6-cards/cards-reducer";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {ChangeEvent, useState} from "react";

type AddCardModalPropsType = {
    closeModal: () => void
    packId: string
    cardId: string
    question: string
    answer: string
}
export const EditCardModal = ModalHOC(({closeModal,packId,cardId, answer, question}: AddCardModalPropsType) => {
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
        const changeAnswerInp = (e: ChangeEvent<HTMLInputElement>) => {
            setNewAnswer(e.currentTarget.value)
        }
        return (
            <div className={styles.addCardModal}>
                <h3 className={styles.title}>Add new card</h3>
                <div className="inputs">
                    <input
                        type="text"
                        className={styles.inp}
                        placeholder={'Question'}
                        onChange={changeQuestionInp}
                        value={question}
                        autoFocus
                    />
                    <input type="text"
                           className={styles.inp}
                           placeholder={'Answer'}
                           onChange={changeAnswerInp}
                           value={answer}
                    />
                </div>
                <div className="buttons">
                    <button onClick={closeModal}>Cancel</button>
                    <button onClick={addCardBtn}>Save</button>
                </div>
            </div>
        )
    }
)