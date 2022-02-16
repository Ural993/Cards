import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../bll/store";
import styles from './PacksPagination.module.scss'
import {setPageAC} from "../../../../bll/reducers/packs/packs-reducer";


export const PacksPagination = () => {
    const dispatch = useDispatch()
    const cardPacksTotalCount = useSelector<AppStateType, number>((state) => state.packs.cardPacksTotalCount)
    const pageCount = useSelector<AppStateType, number>((state) => state.packs.pageCount)
    const page = useSelector<AppStateType, number>((state) => state.packs.page)
    let pageArr = []
    for (let i = 1; i <= cardPacksTotalCount / pageCount; i++) {
        pageArr.push(i)
    }
    const onClickPage = (page:number) => {
        dispatch(setPageAC(page))
    }

    return (
        <div className={styles.pagination}>
            {pageArr.map(p => {
                return (<div onClick={()=>onClickPage(p)}>-{p}-</div>)
            })}
        </div>
    )
}