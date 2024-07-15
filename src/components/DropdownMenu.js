import React, {useEffect, useRef, useState} from 'react';

const DropdownMenu = ({ buttonText, items }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <div onMouseEnter={toggleMenu} className="dropdown-toggle">
                {buttonText}
            </div>
            {isOpen && (
                <ul className="dropdown-menu" onMouseLeave={toggleMenu} >
                    {items.map((item, index) => (
                        <li key={index} className="dropdown-item">
                            {item}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownMenu;