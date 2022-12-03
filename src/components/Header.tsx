import React from "react";
import { ReactComponent as HeaderIcon } from "../assets/icons/HeaderIcon.svg";
import Category from "../models/Category";

interface HeaderProps {
  categoryList: Category[];
}

const Header = (props: HeaderProps): JSX.Element => {
  return (
    <header>
      <div className="header--title-container">
        <HeaderIcon className="header--icon" />
        <h2 className="header--title">Poison</h2>
      </div>
      <div className="header--menu">
        {
          props.categoryList.map((category) => {
            return <button className="header--menu-button">{category.toUpperCase()}</button>;
          })
        }
      </div>
    </header>
  );
};

export default Header;
