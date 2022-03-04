import styles from './Modal.module.scss'

export const ModalHOC = (Component: any) => {
    const Modal = (props:any) => {
        return (
            <div className={styles.modal}>
                <Component {...props}/>
            </div>
        )
    }
    return Modal
}