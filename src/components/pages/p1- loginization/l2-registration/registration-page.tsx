import React from "react"
import styles from "./registration.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Link, Navigate} from "react-router-dom";
import {AppStateType} from "../../../../bll/store";
import {registerUser} from "../../../../bll/reducers/r2-registration/registation-reducer";
import {Preloader} from "../../../../common/components/c4-Preloader/Preloader";
import SuperInputText from "../../../../common/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../common/components/c2-SuperButton/SuperButton";

export const RegistrationPage = () => {

    let dispatch = useDispatch()

    const registrationError = useSelector<AppStateType, string>(state => state.registration.error)
    const isRegistered = useSelector<AppStateType, boolean>(state => state.registration.isRegistered)
    const isFetching = useSelector<AppStateType, boolean>(state => state.app.isFetching)

    console.log(isFetching)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            passwordConfirm: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            password: Yup.string()
                .min(8, "Min length 8")
                .required("Required"),
            passwordConfirm: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match"),
        }),
        onSubmit: values => {
            let {email, password} = values
            dispatch(registerUser(email, password))
        }
    })

    if (isRegistered) {
        return <Navigate to={"/login"}/>
    }

    return (
        <div className={styles.regPage}>
            <div className={styles.container}>
                <h2 className={styles.title}>
                    Sing Up
                </h2>

                {isFetching && <Preloader/>}

                {/*Form and form errors*/}
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <input
                        type={"text"}
                        placeholder={'Email'}
                        {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className={styles.error}>{formik.errors.email}</div>
                    ) : null}

                    <input
                        type={"password"}
                        placeholder={'Password'}
                        {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className={styles.error}>{formik.errors.password}</div>
                    ) : null}

                    <input
                        type={"password"}
                        placeholder={'Confirm password'}
                        {...formik.getFieldProps("passwordConfirm")}
                    />
                    {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (
                        <div className={styles.error}>{formik.errors.passwordConfirm}</div>
                    ) : null}

                    <button
                        type={"submit"}
                        disabled={isFetching}
                    >
                        Register
                    </button>
                    <p>You have account?</p>
                    <Link className={styles.loginLink} to={'/login'}>Sign In</Link>
                </form>

                {/*Request Error*/}
                {registrationError && <div>{registrationError}</div>}
            </div>
        </div>

    )
}