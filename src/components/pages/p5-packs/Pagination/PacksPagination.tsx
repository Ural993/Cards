import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../bll/store";
import styles from './PacksPagination.module.scss'
import {setPageAC} from "../../../../bll/reducers/r5-packs/packs-reducer";
import Pagination from "@mui/material/Pagination/Pagination";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack/Stack";


export const PacksPagination = () => {
    const dispatch = useDispatch()
    const cardPacksTotalCount = useSelector<AppStateType, number>((state) => state.packs.cardPacksTotalCount)
    const pageCount = useSelector<AppStateType, number>((state) => state.packs.pageCount)
    const page = useSelector<AppStateType, number>((state) => state.packs.page)
    let pageArr = []
    for (let i = 1; i <= cardPacksTotalCount / pageCount; i++) {
        pageArr.push(i)
    }
    const onClickPage = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPageAC(value))
    }

    return (
        // <div className={styles.pagination}>
        //     {pageArr.map(p => {
        //         return (<div onClick={()=>onClickPage(p)}>-{p}-</div>)
        //     })}
        // </div>

            <Pagination count={pageArr.length} page={page} onChange={onClickPage} />

    )
}