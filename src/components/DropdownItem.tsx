import React from 'react';

interface DropdownItemProps {
  title: string;
  onClick: () => void;
}

const DropdownItem = (props: DropdownItemProps): JSX.Element => {
  return (
    <button className="dropdown-item" onClick={props.onClick}>
      {props.title}
    </button>
  );
};

export default DropdownItem;
