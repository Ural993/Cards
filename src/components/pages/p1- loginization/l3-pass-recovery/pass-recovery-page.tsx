import React from "react"
import {useFormik} from "formik";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styles from "./passwordRecovery.module.scss"
import * as Yup from "yup";
import mailImg from "../../../../common/images/mail.png"
import { AppStateType } from "../../../../bll/store";
import { passwordRecovery } from "../../../../bll/reducers/r3-passwordRecovery/pass-recovery-reducer";
import { Preloader } from "../../../../common/components/c4-Preloader/Preloader";
import SuperInputText from "../../../../common/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../common/components/c2-SuperButton/SuperButton";

export const PassRecoveryPage = () => {
    const dispatch = useDispatch()
    const isToggleError = useSelector<AppStateType, boolean>((state) => state.passwordRecovery.isToggleError)
    const isFetching = useSelector<AppStateType, boolean>(state => state.app.isFetching)
    const passwordRecoveryError = useSelector<AppStateType, string>((state) => state.passwordRecovery.error)
    const email = useSelector<AppStateType, string>((state) => state.passwordRecovery.email)
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
        }),
        onSubmit: values => {
            dispatch(passwordRecovery(values.email))
        }
    })
    const mail = {
        backgroundImage: `url(${mailImg})`,
    };
    if (isToggleError) {
        return (<div className={styles.forgotPage}>
            <div className={styles.container}>
                <div className={styles.img} style={mail}> </div>
                <h3 className={styles.title}>Check Email</h3>
                <p className={styles.text}>We’ve sent an Email with instructions to {email}</p>
            </div>
        </div>)
    }

    return (
        <div className={styles.forgotPage}>
            {isFetching && <Preloader/>}
            <div className={styles.container}>

                <h3 className={styles.title}>Forgot your password?</h3>

                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <SuperInputText
                        type={"text"}
                        {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className={styles.error}>{formik.errors.email}</div>
                    ) : null}
                    <p className={styles.emailText}>Enter your email address and we will send you further
                        instructions </p>
                    <div className={styles.block}>
                        <SuperButton
                            type={"submit"}
                            disabled={isFetching}
                        >
                            Send Instructions
                        </SuperButton>
                        <p className={styles.text}>Did you remember your password?</p>
                        <Link className={styles.link} to="/login">Try logging in</Link>
                    </div>

                </form>
            </div>
            {passwordRecoveryError && <div>{passwordRecoveryError}</div>}
        </div>
    )
}