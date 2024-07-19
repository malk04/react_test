import React, {useContext, useState} from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa";
import {useForm} from "react-hook-form";
import axios from "../utils/axios";
import {CustomContext} from "../utils/Context";
import {useNavigate} from "react-router-dom";

const AuthPage = () => {
    const [isOpenPassword, setIsOpenPassword] = useState(false)
    const {user, setUser} = useContext(CustomContext)

    const navigate = useNavigate()

    const {
        register,
        formState: {errors},
        handleSubmit,
    } = useForm({
        mode: "onSubmit"
    })

    const handleOnSubmit = (data) => {
        console.log(data);
        let withEmail = {
            email: data.username + "@gmail.com", // в json-server-auth необходимо использование почты
            ...data
        }
        axios.post('/login', withEmail)
            .then(({data}) => {
                setUser({
                    token: data.accessToken,
                    ...data.user
                })
                localStorage.setItem('user', JSON.stringify({
                    token: data.accessToken,
                    ...data.user
                }))
                console.log(data)
                navigate("/lk")
            })
            .catch((err) => console.log(err.message, err.response.data))
    };

    return <>
        <Header/>
        <div className="container">
            {user.username === "" ?
                <div className="auth-main">
                    <div className="title">
                        Вход
                    </div>
                    <form name="log" onSubmit={handleSubmit(handleOnSubmit)}>
                        <div className="margin-xs">
                            <div className="input-group">
                                <input className="input-log"
                                       type="text"
                                       name="username"
                                       required
                                       {...register("username")}
                                />
                                <label className="label-log" htmlFor="username">Логин</label>
                            </div>
                        </div>
                        <div className="margin-xs">
                            <div className="input-group">
                                <input className="input-log"
                                       type={isOpenPassword ? "text" : "password"}
                                       name="password"
                                       required {...register("password")}
                                />
                                <span className="password-eye"
                                      onClick={() => setIsOpenPassword(prev => !prev)}>
                                    {isOpenPassword ? <FaEyeSlash className="icon-table"/> :
                                        <FaEye className="icon-table"/>}
                            </span>
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
                </div> :
                <div>Вы уже вошли</div>}
        </div>
        <Footer/>
    </>
}

export default AuthPage