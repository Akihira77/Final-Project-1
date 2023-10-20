import express from "express";
import morgan from "morgan";
import errorHandlerMiddleware from "./api/middlewares/error-handler.middleware.js";

export const startServer = () => {
    const app = express();

    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(errorHandlerMiddleware);

    return app;
};
