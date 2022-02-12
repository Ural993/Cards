import React from "react"
import styles from "../l3-pass-recovery/passwordRecovery.module.scss";
import {Preloader} from "../../../../common/components/c4-Preloader/Preloader";
import SuperInputText from "../../../../common/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../common/components/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../bll/store";
import {useFormik} from "formik";
import * as Yup from "yup";
import {login} from "../../../../bll/reducers/r1-login/login-reduser";
import {Navigate} from "react-router-dom";

export const LoginPage = () => {
    const dispatch = useDispatch()
    const isFetching = useSelector<AppStateType, boolean>(state => state.app.isFetching)
    const error = useSelector<AppStateType, string>(state => state.login.error)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.app.isAuthorized)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required("Required"),
        }),
        onSubmit: values => {
            let {email, password, rememberMe} = values
            dispatch(login(email, password, rememberMe))
        }
    })
    if (isAuthorized) {
        return <Navigate to={'/profile'}/>
    }

    return (<div className={styles.loginPage}>
        {isFetching && <Preloader/>}
        <div className={styles.container}>

            <h3 className={styles.title}>Sign In</h3>

            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <SuperInputText
                    type={"email"}
                    {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className={styles.error}>{formik.errors.email}</div>
                ) : null}
                <SuperInputText
                    type={"password"}
                    {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className={styles.error}>{formik.errors.password}</div>
                ) : null}
                <SuperInputText
                    type={"checkbox"}
                    {...formik.getFieldProps("rememberMe")}
                />
                <p className={styles.emailText}>Create new password and we will send you further instructions to
                    email</p>
                <div className={styles.block}>
                    <SuperButton
                        type={"submit"}
                        disabled={isFetching}
                    >
                        Login
                    </SuperButton>
                </div>
            </form>
        </div>
        {error && <div>{error}</div>}
    </div>)
}