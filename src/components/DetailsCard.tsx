import React from 'react';
import { useNavigate } from 'react-router-dom';
import DrinkDetails from '../models/DrinkDetails';

interface DetailsCardProps {
  drink: DrinkDetails;
}

const DetailsCard = (props: DetailsCardProps): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="details">
      <div className="details--image-container">
        <img className="details--image" src={props.drink.imageURL} alt={props.drink.name} />
      </div>
      <div className="details--text-container">
        <div className="details--title-container">
          <h3 className="details--name">{props.drink.name}</h3>
          <span className="details--category">{props.drink.category.toUpperCase()}</span>
        </div>
        <div className="details--section">
          <h5 className="details--section-title">Ingredients</h5>
          <ul className="details--ingredients">
            {props.drink.ingredients.map(({ name, measure }) => {
              return (
                <li className="details--ingredient">
                  {name}
                  {measure && ` - ${measure}`}
                </li>
              );
            })}
          </ul>
        </div>
        {props.drink.instructions && (
          <div className="details--section">
            <h5 className="details--section-title">Istructions</h5>
            <p className="details--instructions">{props.drink.instructions}</p>
          </div>
        )}
        <div className="details--button-container">
          <button className="primary" onClick={handleClick}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
