import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../bll/store";
import {setPageAC} from "../../../../bll/reducers/r5-packs/packs-reducer";
import Pagination from "@mui/material/Pagination/Pagination";


export const PacksPagination = () => {
    const dispatch = useDispatch()
    const cardPacksTotalCount = useSelector<AppStateType, number>((state) => state.packs.cardPacksTotalCount)
    const pageCount = useSelector<AppStateType, number>((state) => state.packs.pageCount)
    const page = useSelector<AppStateType, number>((state) => state.packs.page)
    let pages = Math.ceil(cardPacksTotalCount / pageCount)

    const onClickPage = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPageAC(value))
    }

    return (
        <Pagination count={pages} page={page} onChange={onClickPage}/>
    )
}