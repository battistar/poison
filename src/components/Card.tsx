import React from "react";
import Drink from "../models/Drink";

interface CardProps {
  drink: Drink
}

const Card = (props: CardProps): JSX.Element => {
  return (
    <div className="card">
      <img className="card--image" src={props.drink.imageURL} alt={props.drink.name} />
      <h4 className="card--title">{props.drink.name}</h4>
    </div>
  );
}

export default Card;