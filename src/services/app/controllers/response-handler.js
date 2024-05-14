import { response } from "express";

export const setResponse = (data, response) => {
  response.status(200);
  response.json(data);
};

export const setError = (err, response) => {
  response.status(500);
  response.json({
    error: {
      code: "InternalServerError",
      message: "Error occures while processing the request",
    },
  });
};
