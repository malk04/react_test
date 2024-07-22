import MainTemplate from "../components/MainTemplate";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const NotFoundPage = () => {
    const [isPlay, setIsPlay] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            setIsPlay(false)
        }, 3800);
    }, []);

    return <MainTemplate>
        <div className="container">
            {isPlay ? <div className="pedro">
                    <img src={process.env.PUBLIC_URL + "/gif/pedro.gif"} alt="pedro"/>
                </div>
                :
                <div style={{display: "grid"}}>
                    <div style={{textAlign: "center"}}>
                        Упссс... Ничего не найдено
                    </div>
                    <button className="button-style" onClick={() => navigate('/lk')}>
                        В кабинет
                    </button>
                </div>}
        </div>
    </MainTemplate>
}

export default NotFoundPage