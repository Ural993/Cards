import styles from './Select.module.scss'

type ItemType = {
    pageCount: number
}

export type SelectPropsType = {
    pageCount: number
    onChange: (pageCount: number) => void
    items: ItemType[]
    collapsed: boolean
    onChangeCollapsed: () => void

}





export function Select(props: SelectPropsType) {
    return (
        <div className={styles.select}>
            <div className={styles.title} onClick={props.onChangeCollapsed}>{props.pageCount}</div>
            {props.collapsed && props.items.map(i => {
                return <div className={styles.items} onClick={() => props.onChange(i.pageCount)}>{i.pageCount}</div>
            })}
        </div>
    )
}