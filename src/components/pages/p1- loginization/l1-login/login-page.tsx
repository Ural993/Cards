import React from "react"
import {Preloader} from "../../../../common/components/c4-Preloader/Preloader";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../bll/store";
import {useFormik} from "formik";
import * as Yup from "yup";
import {login} from "../../../../bll/reducers/r1-login/login-reduser";
import {Link, Navigate} from "react-router-dom";
import styles from './login-page.module.scss'

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
            email: Yup.string()
                .required("Required"),
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

    return (
        <div className={styles.loginPage}>
            {isFetching && <Preloader/>}
            <div className={styles.container}>

                <h3 className={styles.title}>Sign In</h3>

                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <input
                        type={"email"}
                        className={styles.inp}
                        placeholder={'Email'}
                        {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className={styles.error}>{formik.errors.email}</div>
                    ) : null}
                    <input
                        type={"password"}
                        className={styles.inp}
                        placeholder={'Password'}
                        {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className={styles.error}>{formik.errors.password}</div>
                    ) : null}
                    <div className={styles.checkboxBlock}>
                        <input
                            type={"checkbox"}
                            {...formik.getFieldProps("rememberMe")}
                        />
                        <span>remember me</span>
                    </div>
                    <Link className={styles.recoveryLink} to={'/recovery'}>Forgot password</Link>
                    <button
                        type={"submit"}
                        disabled={isFetching}
                    >
                        Login
                    </button>
                    <p>Don’t have an account?</p>
                    <Link className={styles.registrationLink} to={'/registration'}>Sign Up</Link>
                </form>


            </div>
            {error && <div>{error}</div>}
        </div>)
}