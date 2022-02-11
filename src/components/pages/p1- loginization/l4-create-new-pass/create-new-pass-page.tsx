import React from "react"
import styles from "../l3-pass-recovery/passwordRecovery.module.scss";
import {Preloader} from "../../../../common/components/c4-Preloader/Preloader";
import SuperInputText from "../../../../common/components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../common/components/c2-SuperButton/SuperButton";
import {Navigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../../bll/store";
import {useFormik} from "formik";
import * as Yup from "yup";
import {createNewPassword} from "../../../../bll/reducers/r3-passwordRecovery/pass-recovery-reducer";

export const CreateNewPassPage = () => {
    const dispatch = useDispatch()
    const isFetching = useSelector<AppStateType, boolean>(state => state.app.isFetching)
    const isNewPasswordCreated = useSelector<AppStateType, boolean>((state)=>state.passwordRecovery.isNewPasswordCreated)
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
            if(params.token){
                dispatch(createNewPassword(values.password, params.token))
            }
        }
    })
    if (isNewPasswordCreated) {
      return <Navigate to={'./login'}/>
    }

    return (<div className={styles.forgotPage}>
            {isFetching && <Preloader/>}
            <div className={styles.container}>

                <h3 className={styles.title}>Create new password</h3>

                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <SuperInputText
                        type={"password"}
                        {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className={styles.error}>{formik.errors.password}</div>
                    ) : null}
                    <p className={styles.emailText}>Create new password and we will send you further instructions to email</p>
                    <div className={styles.block}>
                        <SuperButton
                            type={"submit"}
                            disabled={isFetching}
                        >
                            Create new password
                        </SuperButton>
                    </div>
                </form>
            </div>
            {/*{passwordRecoveryError && <div>{passwordRecoveryError}</div>}*/}
        </div>
    )
}