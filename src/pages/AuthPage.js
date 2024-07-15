import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AuthPage = () => {
    return <>
        <Header/>
        <div className="container">
            <div className="auth-main">
                <div className="title">
                    Вход
                </div>
                <form name="log">
                    <div className="margin-xs">
                        <div className="input-group">
                            <input className="input-log" type="text" name="username" id="username" required/>
                            <label className="label-log" htmlFor="username">Логин</label>
                        </div>
                    </div>
                    <div className="margin-xs">
                        <div className="input-group">
                            <input className="input-log" type="password" name="password" id="password" required/>
                            <label className="label-log" htmlFor="password">Пароль</label>
                        </div>
                    </div>
                    <p className="error" id="log-error"></p>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <button className="button-style">
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <Footer/>
    </>
}

export default AuthPage