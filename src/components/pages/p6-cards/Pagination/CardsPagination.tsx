import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../bll/store";
import styles from './CardsPagination.module.scss'
import {setPageAC} from "../../../../bll/reducers/r5-packs/packs-reducer";
import Pagination from "@mui/material/Pagination/Pagination";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack/Stack";
import { setCardsPageAC } from "../../../../bll/reducers/r6-cards/cards-reducer";


export const CardsPagination = () => {
    const dispatch = useDispatch()
    const cardsTotalCount = useSelector<AppStateType, number>((state) => state.cards.cardsTotalCount)
    const pageCount = useSelector<AppStateType, number>((state) => state.cards.pageCount)
    const page = useSelector<AppStateType, number>((state) => state.cards.page)
    let pages = Math.ceil(cardsTotalCount / pageCount)
    const onClickPage = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setCardsPageAC(value))
    }

    return (
        // <div className={styles.pagination}>
        //     {pageArr.map(p => {
        //         return (<div onClick={()=>onClickPage(p)}>-{p}-</div>)
        //     })}
        // </div>

            <Pagination count={pages} page={page} onChange={onClickPage} />

    )
}