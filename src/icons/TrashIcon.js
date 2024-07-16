import React from "react";

const TrashIcon = ({onClick, style}) => {
    return <svg style={style} className="icon-table" width="20" height="20" viewBox="0 0 512 512" fill="#000000"
                xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
        <path
            d="M60.856,170.112V512h390.288V170.112H60.856z M140.896,471.979h-30V210.156h30V471.979z M205.948,471.979h-30V210.156h30 V471.979z M271,471.979h-30V210.156h30V471.979z M336.052,471.979h-30V210.156h30V471.979z M401.104,471.979h-30V210.156h30 V471.979z"/>
        <path
            d="M331.048,60.048V0H180.952v60.048H60.856v80.064h390.288V60.048H331.048z M301.048,60.048h-90.096V30h90.096V60.048z"/>
    </svg>
}

export default TrashIcon