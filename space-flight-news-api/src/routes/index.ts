/* eslint-disable prettier/prettier */
import { Router, Request, Response } from "express";

const routes = Router();

routes.get(
  "/api/space-flight/v1",
  (request: Request, response: Response) => {
    response
      .status(200)
      .json({ message: "Fullstack Challenge 2021 🏅 - Space Flight News" });
  }
);

export default routes;
