import React, {useContext, useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useForm} from "react-hook-form";
import { v4 as uuid } from 'uuid';
import {CustomContext} from "../utils/Context";

const nullData = {
    discipline: "",
    mark5: 0,
    mark4: 0,
    mark3: 0,
    mark2: 0,
    skipped: 0,
}

const Modal = observer(({isOpen, setIsOpen, onSubmit, initialData, setInitialData}) => {
    const {user} = useContext(CustomContext)

    const {
        register,
        formState: {errors},
        reset,
        handleSubmit,
    } = useForm({
        mode: "onChange"
    })

    useEffect(() => {
        initialData ? reset(initialData) : reset(nullData);
    }, [initialData, reset]);

    function checkIsPassed(data) {
        const totalMarks = data.mark5 * 5 + data.mark4 * 4 + data.mark3 * 3 + data.mark2 * 2;
        const totalSubjects = data.mark5 + data.mark4 + data.mark3 + data.mark2;
        const averageMark = totalSubjects > 0 ? totalMarks / totalSubjects : 0;

        const isPassed = averageMark > 4.2 && data.skipped < 8;

        // Обновляем исходный объект
        const updatedData = {
            ...data,
            passed: isPassed
        };

        // Создаем новый объект
        const result = {
            discipline: data.discipline,
            averageRating: averageMark,
            isChecked: isPassed
        };

        // Возвращаем оба объекта
        return {updatedData, result};
    }

    const handleOnSubmit = (data) => {
        if (!data.id) {
            data.id = uuid();
            data.ownerId = user.uid
        }
        let {updatedData, result} = checkIsPassed(data)
        console.log(result);
        onSubmit(updatedData);
        reset(nullData);
        setInitialData(undefined);
        setIsOpen(false);
    };

    function validateNumber(value) {
        if (!/^\d+$/.test(value)) {
            return "Допустим ввод только цифр";
        }
        return true;
    }

    return <div className={isOpen ? "popup open" : "popup"}>
        <div className="popup_body">
            <div className="popup_content">
                <div onClick={() => {
                    reset(nullData);
                    setInitialData(undefined);
                    setIsOpen(false)
                }} className="popup_close">X
                </div>
                <div className="popup_title">Проверка зачета</div>

                <form name="add" onSubmit={handleSubmit(handleOnSubmit)}>
                    <div className="popup_text">
                        <div className="form-item">
                            <label>Предмет:</label>
                            <div>
                                <input className={errors?.discipline && "invalid"}
                                       name="discipline"
                                       {...register("discipline", {
                                           required: "Поле обязательно для заполнения",
                                           minLength: {
                                               value: 3,
                                               message: "Введите минимум 3 символа"
                                           },
                                           maxLength: {
                                               value: 16,
                                               message: "Допустимо не более 16 символов"
                                           }
                                       })}
                                />
                                {errors?.discipline && <p className="error-ad">
                                    {errors?.discipline?.message || "Ошибка"}
                                </p>}
                            </div>
                        </div>


                        <div className="form-item">
                            <label>Количество 5-ок:</label>
                            <div>
                                <input className={errors?.mark5 && "invalid"}
                                       name="mark5"
                                       {...register("mark5", {
                                           required: "Поле обязательно для заполнения",
                                           validate: validateNumber,
                                           valueAsNumber: true
                                       })}
                                />
                                {errors?.mark5 && <p className="error-ad">
                                    {errors?.mark5?.message || "Ошибка"}
                                </p>}
                            </div>
                        </div>

                        <div className="form-item">
                            <label>Количество 4-ок:</label>
                            <div>
                                <input className={errors?.mark4 && "invalid"}
                                       name="mark4"
                                       {...register("mark4", {
                                           required: "Поле обязательно для заполнения",
                                           validate: validateNumber,
                                           valueAsNumber: true
                                       })}
                                />
                                {errors?.mark4 && <p className="error-ad">
                                    {errors?.mark4?.message || "Ошибка"}
                                </p>}
                            </div>
                        </div>

                        <div className="form-item">
                            <label>Количество 3-ек:</label>
                            <div>
                                <input className={errors?.mark3 && "invalid"}
                                       name="mark3"
                                       {...register("mark3", {
                                           required: "Поле обязательно для заполнения",
                                           validate: validateNumber,
                                           valueAsNumber: true
                                       })}
                                />
                                {errors?.mark3 && <p className="error-ad">
                                    {errors?.mark3?.message || "Ошибка"}
                                </p>}
                            </div>
                        </div>

                        <div className="form-item">
                            <label>Количество 2-ек:</label>
                            <div>
                                <input className={errors?.mark2 && "invalid"}
                                       name="mark2"
                                       {...register("mark2", {
                                           required: "Поле обязательно для заполнения",
                                           validate: validateNumber,
                                           valueAsNumber: true
                                       })}
                                />
                                {errors?.mark2 && <p className="error-ad">
                                    {errors?.mark2?.message || "Ошибка"}
                                </p>}
                            </div>
                        </div>

                        <div className="form-item">
                            <label>Пропущенных занятий:</label>
                            <div>
                                <input className={errors?.skipped && "invalid"}
                                       name="skipped"
                                       {...register("skipped", {
                                           required: "Поле обязательно для заполнения",
                                           validate: validateNumber,
                                           valueAsNumber: true
                                       })}
                                />
                                {errors?.skipped && <p className="error-ad">
                                    {errors?.skipped?.message || "Ошибка"}
                                </p>}
                            </div>
                        </div>
                        <button className="button-style" type="submit">Проверить</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
});

export default Modal;