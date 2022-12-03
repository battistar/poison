import React from "react";
import { ReactComponent as HeaderIcon } from "../assets/icons/HeaderIcon.svg";
import Category from "../models/Category";

interface HeaderProps {
  categoryList: Category[];
  onCategoryClick: (category: Category) => void;
}

const Header = (props: HeaderProps): JSX.Element => {
  const [currentCategory, setCurrentCategory] = React.useState<Category | undefined>(props.categoryList[0]);

  const handleClick = (category: Category) => () => {
    setCurrentCategory(category);

    props.onCategoryClick(category);
  };

  return (
    <header>
      <div className="header--title-container">
        <HeaderIcon className="header--icon" />
        <h2 className="header--title">Poison</h2>
      </div>
      <div className="header--menu">
        {props.categoryList.map((category) => {
          return (
            <button 
              className={`header--menu-button ${currentCategory === category ? 'header--menu-button--active' : ''}`}
              onClick={handleClick(category)}
            >
              {category.toUpperCase()}
            </button>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
