import React, {useContext, useState} from "react";
import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa";
import {useForm} from "react-hook-form";
import axios from "../utils/axios";
import {CustomContext} from "../utils/Context";
import {useNavigate} from "react-router-dom";
import MainTemplate from "../components/MainTemplate";

const AuthPage = () => {
    const [isOpenPassword, setIsOpenPassword] = useState(false)
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
            email: data.username + "@gmail.com", // в json-server-auth необходимо использование почты
            ...data
        }

        // если форма входа
        if (!isRegistrationMode) {
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
                    setError(undefined)
                    navigate("/lk")
                })
                .catch((err) => {
                    console.log(err.message, err.response.data)
                    if (err.response.data === "Cannot find user" || err.response.data === "Incorrect password")
                        setError("Неверный логин или пароль")
                    else
                        setError("Ошибка")
                })
        } else {
            if (!validatePasswordMatch(data)){
                setError("Пароли не совпадают")
                return
            }

            setError(undefined)
            axios.post('/register', withEmail)
                .then(({data}) => {
                    setUser({
                        token: data.accessToken,
                        ...data.user
                    })
                    localStorage.setItem('user', JSON.stringify({
                        token: data.accessToken,
                        ...data.user
                    }))
                    navigate("/lk")
                })
                .catch((err) => {
                    if (err.response.data === "Email already exists")
                        setError("Такой логин уже зарегистрирован")
                    else
                        setError("Ошибка")
                })
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
                                <input className={errors?.password ? "input-log invalid" : "input-log"}
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
                                <input className={errors?.confirmPassword ? "input-log invalid" : "input-log"}
                                       type={isOpenPassword ? "text" : "password"}
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
                                      onClick={() => setIsOpenPassword(prev => !prev)}>
                                    {isOpenPassword ? <FaEyeSlash className="icon-table"/> :
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
                                Войти
                            </button>
                        </div>

                        <div className="link-log"
                             onClick={() => {
                                 setIsRegistrationMode(prev => !prev)
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