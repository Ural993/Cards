import React, {useEffect} from "react";
import styles from "./App.module.scss"
import {HashRouter, Link, Route, Routes} from "react-router-dom";
import {LoginPage} from "./components/pages/p1- loginization/l1-login/login-page";
import {RegistrationPage} from "./components/pages/p1- loginization/l2-registration/registration-page";
import {ProfilePage} from "./components/pages/p2-profile/ProfilePage";
import {CreateNewPassPage} from "./components/pages/p1- loginization/l4-create-new-pass/create-new-pass-page";
import {PassRecoveryPage} from "./components/pages/p1- loginization/l3-pass-recovery/pass-recovery-page";
import {Error404Page} from "./components/pages/p3-error/error404-page";
import {TestPage} from "./components/pages/p4-test/test-page";
import {useDispatch} from "react-redux";
import {authorization, logout} from "./bll/reducers/r4-app/app-reducer";
import {PacksPage} from "./components/pages/p5-packs/PacksPage";
import {CardsPage} from "./components/pages/p6-cards/CardsPage";
import profileImg from "./common/images/Profile.svg";
import packsListImg from "./common/images/Packlists.svg";
import LearnPage from "./components/pages/p7-learn/learnPage";


export const App = () => {
    console.log('App')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(authorization())
    }, [])

    const profile = {
        backgroundImage: `url(${profileImg})`,
    };
    const packsList = {
        backgroundImage: `url(${packsListImg})`,
    };
    const onClickHandler = () => {
        dispatch(logout())
    }
    return (
        <div className={styles.app}>
            <HashRouter>
                <header className={styles.header}>
                        <div className={styles.packsListImg} style={packsList}>
                            <Link to={"packs"}>Packs list</Link>
                        </div>
                        <div className={styles.profileImg} style={profile}>
                            <Link to={"profile"}>Profile</Link></div>

                    <div className={styles.logoutBlock}>
                        <button onClick={onClickHandler}>logout</button>
                    </div>
                </header>
                <div className={styles.contentContainer}>
                    <Routes>
                        <Route path={"/"} element={<ProfilePage/>}/>
                        <Route path={"login"} element={<LoginPage/>}/>
                        <Route path={"registration"} element={<RegistrationPage/>}/>
                        <Route path={"profile"} element={<ProfilePage/>}/>
                        <Route path={"recovery"} element={<PassRecoveryPage/>}/>
                        <Route path={"pass/:token"} element={<CreateNewPassPage/>}/>
                        <Route path={"error"} element={<Error404Page/>}/>
                        <Route path={"test"} element={<TestPage/>}/>
                        <Route path={"packs"} element={<PacksPage/>}/>
                        <Route path={"cards/:id"} element={<CardsPage/>}/>
                        <Route path={"learn/:id"} element={<LearnPage/>}/>
                    </Routes>
                </div>
            </HashRouter>
        </div>
    );
}
