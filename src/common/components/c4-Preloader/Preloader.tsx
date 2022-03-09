import React from "react"
import './Preloader.module.scss'
import loader from '../../../common/images/loader.svg'
import styles from './Preloader.module.scss'

export const Preloader = () => {
    return (
        <div className={styles.container}>
            <img src={loader} alt="#" className={styles.preloader}/>
        </div>
    )
}