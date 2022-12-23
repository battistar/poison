import React from "react";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";
import httpStatusCodeErrors from "../utils/httpStatusCodeErrors";

const Error = (): JSX.Element => {
  const error = useRouteError() as Error;
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate("/");
  };

  let errorText;
  if (isRouteErrorResponse(error)) {
    if (error.statusText) {
      errorText = error.statusText;
    } else if (error.data) {
      errorText = error.data as string;
    } else {
      errorText = httpStatusCodeErrors[error.status as keyof typeof httpStatusCodeErrors];
    }
  } else {
    errorText = "Unknown error"
  }

  return (
    <div className="error">
      <h3 className="error--title">Oops!</h3>
      <p className="error--emoticons">¯\_(ツ)_/¯</p>
      <p className="error--description">
        {
          isRouteErrorResponse(error) ? `${error.status} - ${errorText.toUpperCase()}` : errorText.toUpperCase()
        }
      </p>
      <button className="primary" onClick={handleClick}>Home</button>
    </div>
  );
};

export default Error;
