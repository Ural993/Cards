import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {CardType, getCards, setGrade} from "../../../bll/reducers/r6-cards/cards-reducer";
import {AppStateType} from "../../../bll/store";
import styles from './learnPage.module.scss'

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

const LearnPage = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const [gradeNumber, setGradeNumber] = useState<number>(0)
    // const [first, setFirst] = useState<boolean>(0);
    const {cards} = useSelector((store: AppStateType) => store.cards);
    const {id} = useParams();

    const [card, setCard] = useState<CardType>({
        _id: 'fake',
        cardsPack_id: '',
        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,
        type: '',
        rating: 0,
        more_id: '',
        created: '',
        updated: '',
        user_id: ''
    });

    const dispatch = useDispatch();
    useEffect(() => {
        console.log('LearnContainer useEffect');

        if (first) {
            if (id) {
                dispatch(getCards(id));
                setFirst(false);
            }
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCard(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, id, cards, first]);

    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            if (id) {
                dispatch(setGrade(card._id, gradeNumber))
                setCard(getCard(cards));
            }
        } else {

        }
    }

    return (
        <div className={styles.learnPage}>
            <div className={styles.container}>
                <h3 className={styles.title}>Learn </h3>
                <div className={styles.question}>Question: <span>{card.question}</span></div>
                <div>
                    {!isChecked && <button onClick={() => setIsChecked(true)}>Check</button>}
                </div>

                {isChecked && (
                    <>
                        <div className={styles.answer}>Answer: <span>{card.answer}</span></div>
                        <div className={styles.rateTitle}>Rate yourself:</div>
                        <div className={styles.grades}>
                            {grades.map((g, i) => (
                                <div className={styles.grade}><input type={'checkbox'} key={'grade-' + i}
                                                                     onChange={() => {
                                                                         setGradeNumber(i + 1)
                                                                     }}/> {g}</div>))}
                        </div>


                        <div>
                            <button onClick={onNext}>Next</button>
                        </div>
                    </>
                )}
            </div>
        </div>

    );
};

export default LearnPage;