import express from "express";
import "express-async-errors";
import morgan from "morgan";
import errorHandlerMiddleware from "./api/middlewares/error-handler.middleware.js";
import userApi from "./api/user.api.js";
import reflectionApi from "./api/reflection.api.js";
import authentication from "./api/middlewares/authentication.middleware.js";

export const startServer = () => {
    const app = express();

    //! Middlewares
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    //! Routes
    app.use("/api/v1/user", userApi);
    app.use("/api/v1/reflection", authentication, reflectionApi);

    //! Error Handler
    app.use(errorHandlerMiddleware);

    return app;
};
