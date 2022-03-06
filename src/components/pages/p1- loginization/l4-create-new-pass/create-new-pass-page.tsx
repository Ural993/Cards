import React from "react"
import styles from "./create-new-pass-page.module.scss";
import {Preloader} from "../../../../common/components/c4-Preloader/Preloader";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../bll/store";
import {useFormik} from "formik";
import * as Yup from "yup";
import {createNewPassword} from "../../../../bll/reducers/r3-passwordRecovery/pass-recovery-reducer";

export const CreateNewPassPage = () => {
    const dispatch = useDispatch()
    const isFetching = useSelector<AppStateType, boolean>(state => state.app.isFetching)
    const isNewPasswordCreated = useSelector<AppStateType, boolean>((state) => state.passwordRecovery.isNewPasswordCreated)
    const params = useParams();
    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required("Required"),
        }),
        onSubmit: values => {
            if (params.token) {
                dispatch(createNewPassword(values.password, params.token))
            }
        }
    })
    if (isNewPasswordCreated) {
        return <Navigate to={'./login'}/>
    }

    return (<div className={styles.createPage}>
            {isFetching && <Preloader/>}
            <div className={styles.container}>

                <h3 className={styles.title}>Create new password</h3>

                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <input
                        type={"password"}
                        placeholder={'Password'}
                        {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className={styles.error}>{formik.errors.password}</div>
                    ) : null}
                    <p className={styles.emailText}>Create new password and we will send you further instructions to
                        email</p>
                    <button
                        type={"submit"}
                        disabled={isFetching}
                    >
                        Create new password
                    </button>
                </form>
            </div>
            {/*{passwordRecoveryError && <div>{passwordRecoveryError}</div>}*/}
        </div>
    )
}