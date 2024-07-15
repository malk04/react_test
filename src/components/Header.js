import React from "react";
import DropdownMenu from "./DropdownMenu";
const Header = ( ) => {
  return <header>
      <div className="full-height full-width flex">
          <div className="title-header">StudyMate</div>
          <div style={{position: "absolute", right: 25}}>
              <DropdownMenu buttonText="Малькова Анастасия Сергеевна" items={["О студенте", "Выход"]} />
              </div>
      </div>
  </header>
}

export default Header;