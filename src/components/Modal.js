import React, {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";

const nullData = {
    discipline: "",
    mark5: 0,
    mark4: 0,
    mark3: 0,
    mark2: 0,
    skipped: 0,
}

const Modal = observer(({isOpen, setIsOpen, onSubmit, initialData, setInitialData}) => {
    const [formData, setFormData] = useState(nullData);

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

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

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: name === "discipline" ? value : parseInt(value, 10)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        let {updatedData, result} = checkIsPassed(formData)
        console.log(updatedData, result);
        onSubmit(updatedData);
        setFormData(nullData);
        setIsOpen(false);
    };

    return <div className={isOpen ? "popup open" : "popup"}>
        <div className="popup_body">
            <div className="popup_content">
                <div onClick={() => {
                    setFormData(nullData);
                    setInitialData(undefined);
                    setIsOpen(false)
                }} className="popup_close">X
                </div>
                <div className="popup_title">Проверка зачета</div>

                <form id="ad" name="ad" onSubmit={handleSubmit}>
                    <div className="popup_text">
                        <p className="error-ad"></p>
                        <div className="form-item">
                            <label>Предмет:</label>
                            <input type="text" name="discipline" value={formData.discipline} onChange={handleChange}
                                   required/>
                        </div>

                        <div className="form-item">
                            <label>Количество 5-ок:</label>
                            <input type="number" name="mark5" value={formData.mark5} onChange={handleChange} min={0}
                                   step={1} required/>
                        </div>

                        <div className="form-item">
                            <label>Количество 4-ок:</label>
                            <input type="number" name="mark4" value={formData.mark4} onChange={handleChange} min={0}
                                   step={1} required/>
                        </div>

                        <div className="form-item">
                            <label>Количество 3-ек:</label>
                            <input type="number" name="mark3" value={formData.mark3} onChange={handleChange} min={0}
                                   step={1} required/>
                        </div>

                        <div className="form-item">
                            <label>Количество 2-ек:</label>
                            <input type="number" name="mark2" value={formData.mark2} onChange={handleChange} min={0}
                                   step={1} required/>
                        </div>

                        <div className="form-item">
                            <label>Пропущенных занятий:</label>
                            <input type="number" name="skipped" value={formData.skipped}
                                   onChange={handleChange} required/>
                        </div>
                        <button className="button-style" type="submit">Проверить</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
});

export default Modal;