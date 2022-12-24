import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { ReactComponent as HeaderIcon } from '../assets/icons/HeaderIcon.svg';
import Category from '../models/Category';
import Dropdown from './Dropdown';
import DropdownItem from './DropdownItem';
import { useNavigate } from 'react-router-dom';
import { toURLParams } from '../utils/urlParamsBeautify';

interface HeaderProps {
  categoryList?: Category[];
}

const Header = (props: HeaderProps): JSX.Element => {
  const [currentCategory, setCurrentCategory] = React.useState<Category | undefined>(props.categoryList?.[0]);
  const [showDropdown, setShowDropdown] = React.useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const navigate = useNavigate();

  const handleClickDropdown = (): void => {
    setShowDropdown((prevShowDropdown: boolean): boolean => {
      return !prevShowDropdown;
    });
  };

  const handleClickCategory = (category: Category) => () => {
    setCurrentCategory(category);
    setShowDropdown(false);

    navigate(`category/${toURLParams(category)}`);
  };

  return (
    <header>
      <div className="header--title-container">
        <HeaderIcon className="header--icon" />
        <h2 className="header--title">Poison</h2>
      </div>
      {props.categoryList && (
        <nav className="header--nav">
          {isMobile ? (
            <Dropdown
              title={currentCategory !== undefined ? currentCategory.toUpperCase() : ''}
              show={showDropdown}
              onClick={handleClickDropdown}
            >
              {props.categoryList.map((category) => {
                return (
                  <DropdownItem key={category} title={category.toUpperCase()} onClick={handleClickCategory(category)} />
                );
              })}
            </Dropdown>
          ) : (
            props.categoryList.map((category) => {
              return (
                <button
                  key={category}
                  className={`header--nav-button ${currentCategory === category ? 'header--nav-button--active' : ''}`}
                  onClick={handleClickCategory(category)}
                >
                  {category.toUpperCase()}
                </button>
              );
            })
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
