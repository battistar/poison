import React from "react";
import DrinkDetails from "../models/DrinkDetails";
import * as httpClient from "../http/client";
import { mapDrinkDetailsList } from "../utils/mapper";

const DetailsCard = (): JSX.Element => {
  const [data, setData] = React.useState<DrinkDetails | undefined>(undefined);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await httpClient.getRandom();

      if (result.status >= 200 && result.status < 300) {
        const drinkDetails = mapDrinkDetailsList(result.data)[0];

        setData(drinkDetails); 
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {
        data &&
        <div className="details">
          <div className="details--image-container">
            <img className="details--image" src={data?.imageURL} alt={data?.name} />
          </div>
          <div className="details--text-container">
            <div className="details--title-container">
              <h3 className="details--name">{data.name}</h3>
              <span className="details--category">{data.category.toUpperCase()}</span>
            </div>
            <div className="details--section">
              <h5 className="details--section-title">Ingredients</h5>
              <ul className="details--ingredients">
                {
                  data.ingredients.map(({ name, measure }) => {
                    return (
                      <li className="details--ingredient">{name} - {measure}</li>
                    )
                  })
                }
              </ul>            
            </div>
            <div className="details--section">
              <h5 className="details--section-title">Istructions</h5>
              <p className="details--instructions">{data.instructions}</p>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default DetailsCard;