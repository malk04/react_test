import React, {useContext, useEffect, useRef, useState} from 'react';
import {CustomContext} from "../utils/Context";
import {useNavigate} from "react-router-dom";

const DropdownMenu = ({ buttonText }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const {setUser} = useContext(CustomContext)
    const navigate = useNavigate()

    function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    }

    function logOut() {
        setUser({
            username: ""
        })
        localStorage.removeItem('user')
        navigate("/")
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div onMouseEnter={() => setIsOpen(true)} className="dropdown-toggle">
                {buttonText}
            </div>
            {isOpen && (
                <ul className="dropdown-menu" onMouseLeave={() => setIsOpen(false)}>
                    <li key={0} className="dropdown-item" onClick={() => navigate("/about")}>
                        О студенте
                    </li>
                    <li key={1} className="dropdown-item" onClick={logOut}>
                        Выйти
                    </li>
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;