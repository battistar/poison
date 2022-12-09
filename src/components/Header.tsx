import React from "react";
import { useMediaQuery } from "react-responsive";
import { ReactComponent as HeaderIcon } from "../assets/icons/HeaderIcon.svg";
import Category from "../models/Category";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";

interface HeaderProps {
  categoryList: Category[];
  onCategoryClick: (category: Category) => void;
}

const Header = (props: HeaderProps): JSX.Element => {
  const [currentCategory, setCurrentCategory] = React.useState<Category | undefined>(undefined);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  React.useEffect(() => {
    setCurrentCategory(props.categoryList[0]);
  }, [props.categoryList]);

  const handleClickDropdown = () => {
    setShowDropdown((prevShowDropdown: boolean): boolean => {
      return !prevShowDropdown;
    });
  };

  const handleClickCategory = (category: Category) => () => {
    setCurrentCategory(category);
    setShowDropdown(false);

    props.onCategoryClick(category);
  };

  return (
    <header>
      <div className="header--title-container">
        <HeaderIcon className="header--icon" />
        <h2 className="header--title">Poison</h2>
      </div>
      <div className="header--menu">
        {
          isMobile ?
          <Dropdown 
            title={currentCategory !== undefined ? currentCategory.toUpperCase() : ""}
            show={showDropdown}
            onClick={handleClickDropdown}
          >
            {
              props.categoryList.map((category) => {
                return (
                  <DropdownItem
                    key={category}
                    title={category.toUpperCase()}
                    onClick={handleClickCategory(category)}
                  />
                );
              })
            }
          </Dropdown>
          :
          props.categoryList.map((category) => {
            return (
              <button
                key={category}
                className={`header--menu-button ${currentCategory === category ? 'header--menu-button--active' : ''}`}
                onClick={handleClickCategory(category)}
              >
                {category.toUpperCase()}
              </button>
            );
          })
        }
      </div>
    </header>
  );
};

export default Header;
