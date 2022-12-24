import React from 'react';
import { ReactComponent as ExpandMoreIcon } from '../assets/icons/ExpandMoreIcon.svg';
import { ReactComponent as ExpandLessIcon } from '../assets/icons/ExpandLessIcon.svg';

interface DropdownProps {
  title: string;
  show: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const Dropdown = (props: DropdownProps): JSX.Element => {
  return (
    <div className="dropdown">
      <button className="dropdown--button" onClick={props.onClick}>
        <span>{props.title}</span>
        <div className="dropdown--button-icon-container">
          {props.show ? (
            <ExpandLessIcon className="dropdown--button-icon" />
          ) : (
            <ExpandMoreIcon className="dropdown--button-icon" />
          )}
        </div>
      </button>
      <div className={`dropdown--content ${props.show ? 'show' : 'hide'}`}>{props.children}</div>
    </div>
  );
};

export default Dropdown;
