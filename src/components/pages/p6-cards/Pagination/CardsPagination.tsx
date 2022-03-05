import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../bll/store";
import Pagination from "@mui/material/Pagination/Pagination";
import {setCardsPageAC} from "../../../../bll/reducers/r6-cards/cards-reducer";


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
        <Pagination count={pages} page={page} onChange={onClickPage}/>
    )
}