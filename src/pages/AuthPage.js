import React, {useContext, useState} from "react";
import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa";
import {useForm} from "react-hook-form";
import axios from "../utils/axios";
import {CustomContext} from "../utils/Context";
import {useNavigate} from "react-router-dom";
import MainTemplate from "../components/MainTemplate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase";

const AuthPage = () => {
    const [isOpenPassword, setIsOpenPassword] = useState(false)
    const [isOpenPassword2, setIsOpenPassword2] = useState(false)
    const [isRegistrationMode, setIsRegistrationMode] = useState(false)
    const [error, setError] = useState(undefined)
    const {user, setUser} = useContext(CustomContext)

    const navigate = useNavigate()

    const {
        register,
        formState: {errors},
        handleSubmit,
        reset
    } = useForm({
        mode: "onSubmit"
    })

    function validatePasswordMatch(data) {
        return data.password === data.confirmPassword;
    }

    const handleOnSubmit = (data) => {
        let withEmail = {
            ...data,
            email: data.username + "@gmail.com", // в firebase необходимо использование почты
            password: data.password + "11", // в firebase необходимо минимум 6 символов, в ТЗ 4 поэтому так добавляем
        }

        // если форма входа
        if (!isRegistrationMode) {
            signInWithEmailAndPassword(auth, withEmail.email, withEmail.password)
                .then((data) => {
                    setUser({
                        ...data.user
                    })
                    localStorage.setItem('user', JSON.stringify({
                        ...data.user
                    }))
                    setError(undefined)
                    navigate("/lk")
                })
                .catch((err) => {
                    console.log(err)
                    setError("Неверный логин или пароль")
                })
        } else {
            if (!validatePasswordMatch(data)){
                setError("Пароли не совпадают")
                return
            }

            setError(undefined)
            createUserWithEmailAndPassword(auth, withEmail.email, withEmail.password)
                .then((data) => {
                    setUser({
                        ...data.user
                    })
                    localStorage.setItem('user', JSON.stringify({
                        ...data.user
                    }))
                    navigate("/lk")
                })
                .catch(() => setError("Такой логин уже зарегистрирован"))
        }
    };

    return <MainTemplate>
        <div className="container">
            {user.username === "" ?
                <div className="auth-main">
                    <div className="title">
                        {isRegistrationMode ? "Регистрация" : "Вход"}
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
                                       required {...register("password",
                                    {
                                        minLength: {
                                            value: isRegistrationMode ? 4 : 0,
                                            message: "Введите минимум 4 символа"
                                        }
                                    })}
                                />
                                <span className="password-eye"
                                      onClick={() => setIsOpenPassword(prev => !prev)}>
                                    {isOpenPassword ? <FaEyeSlash className="icon-table"/> :
                                        <FaEye className="icon-table"/>}
                                </span>
                                <label className="label-log" htmlFor="password">Пароль</label>
                                {errors?.password && <p className="error-ad">
                                    {errors?.password?.message || "Ошибка"}
                                </p>}
                            </div>
                        </div>

                        {isRegistrationMode && <div className="margin-xs">
                            <div className="input-group">
                                <input className="input-log"
                                       type={isOpenPassword2 ? "text" : "password"}
                                       name="confirmPassword"
                                       required {...register("confirmPassword",
                                    {
                                        minLength: {
                                            value: isRegistrationMode ? 4 : 0,
                                            message: "Введите минимум 4 символа"
                                        }
                                    })}
                                />
                                <span className="password-eye"
                                      onClick={() => setIsOpenPassword2(prev => !prev)}>
                                    {isOpenPassword2 ? <FaEyeSlash className="icon-table"/> :
                                        <FaEye className="icon-table"/>}
                                </span>
                                <label className="label-log" htmlFor="password">Повторите пароль</label>
                                {errors?.confirmPassword && <p className="error-ad">
                                    {errors?.confirmPassword?.message || "Ошибка"}
                                </p>}
                            </div>
                        </div>}

                        <div className="error-ad" style={{textAlign: "center"}}>
                            {error}
                        </div>

                        <div style={{display: "flex", justifyContent: "center"}}>
                            <button className="button-style">
                                {isRegistrationMode ? "Зарегистрироваться" : "Войти"}
                            </button>
                        </div>

                        <div className="link-log"
                             onClick={() => {
                                 setIsRegistrationMode(prev => !prev)
                                 setError(undefined)
                                 reset()
                             }}>
                            {!isRegistrationMode ? "Регистрация" : "Вход"}
                        </div>
                    </form>
                </div>
                :
                <div style={{display: "grid", textAlign: "center"}}>
                    <span>Вы уже вошли</span>
                    <button className="button-style" onClick={() => navigate('/lk')}>
                        В кабинет
                    </button>
                </div>}
        </div>
    </MainTemplate>
}

export default AuthPage