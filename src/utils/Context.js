import {createContext, useEffect, useState} from "react";

export const CustomContext = createContext();

export const Context = (props) => {
    const [user, setUser] = useState({
        username: ""
    })

    const value = { user, setUser }

    useEffect(() => {
        if (localStorage.getItem('user') !== null){
            setUser(JSON.parse(localStorage.getItem('user')))
        }
    }, []);

    return <CustomContext.Provider value={value}>
        {props.children}
    </CustomContext.Provider>
}