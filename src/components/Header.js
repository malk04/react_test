import React, {useContext} from "react";
import DropdownMenu from "./DropdownMenu";
import {CustomContext} from "../utils/Context";

const Header = () => {
    const {user} = useContext(CustomContext)

    return <header>
        <div className="full-height full-width flex">
            <div className="title-header">StudyMate</div>
            {user.username !== "" && <div className="header-position">
                <DropdownMenu buttonText="Малькова Анастасия Сергеевна"/>
            </div>}
        </div>
    </header>
}

export default Header;