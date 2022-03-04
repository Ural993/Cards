import React from "react"
import './Preloader.module.css'
import loader from '../../../common/images/loader.svg'
import styles from './Preloader.module.css'

export const Preloader = () => {
    return (
        <img src={loader} alt="#" className={styles.preloader}/>
    )
}