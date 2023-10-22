import express from "express";
import "express-async-errors";
import morgan from "morgan";
import errorHandlerMiddleware from "./api/middlewares/error-handler.middleware.js";
import userApi from "./api/user.api.js";

export const startServer = () => {
    const app = express();

    //! Middlewares
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    //! Routes
    app.use("/api/v1/user", userApi);

    //! Error Handler
    app.use(errorHandlerMiddleware);

    return app;
};
