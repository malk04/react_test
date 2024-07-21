import React, {useContext, useEffect, useState} from "react";
import './App.less';
import AuthPage from "./pages/AuthPage";
import {Route, Routes, useNavigate} from "react-router-dom";
import TablePage from "./pages/TablePage";
import NotFoundPage from "./pages/NotFoundPage";
import axios from "./utils/axios";
import {CustomContext} from "./utils/Context";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const navigate = useNavigate();
    const {setUser} = useContext(CustomContext)

    function logOut() {
        setUser({
            username: ""
        })
        localStorage.removeItem('user')
        navigate("/")
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('user'))?.accessToken;
                let uid = JSON.stringify(JSON.parse(localStorage.getItem('user'))?.uid);
                console.log(token, uid)
                if (token) {
                    await axios.get('dataStudyMate.json', {
                        params: {
                            orderBy: 'ownerId',
                            equalTo: uid
                        }
                    })
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                    logOut()
                }
            } catch (error) {
                if (error.response.status === 401) {
                    setIsAuthenticated(false)
                    logOut()
                }
            }
        }
        getData()
    }, [isAuthenticated]);

    return (
        <div className="App">
            <Routes>
                <Route path={"/"} element={<AuthPage/>}/>
                <Route path={"/lk"} element={<TablePage/>}/>
                <Route path={"*"} element={<NotFoundPage/>}/>
            </Routes>
        </div>
    );
}

export default App;