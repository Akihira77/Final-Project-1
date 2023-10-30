import { Router } from "express";
import UserService from "../services/user.service.js";
import { RegisterRequestDTO, } from "../database/models/user.model.js";
import { StatusCodes } from "../utils/constant.js";
import { isValidData } from "../utils/validateZodSchema.js";
import { SchemaError, UnauthenticatedError, } from "../errors/main.error.js";
const userApi = Router();
const userService = new UserService();
userApi.post("/auth/register", async (req, res) => {
    const validationResult = isValidData(RegisterRequestDTO, req.body);
    if (!validationResult.success) {
        throw new SchemaError(validationResult.error);
    }
    const { email, password } = req.body;
    const registerResponse = await userService.register(email, password);
    if (typeof registerResponse === "string") {
        res.status(StatusCodes.BadRequest400).send({
            message: registerResponse,
        });
        return;
    }
    res.status(StatusCodes.Created201).send({ ...registerResponse });
    return;
});
userApi.post("/auth/login", async (req, res) => {
    const validationResult = isValidData(RegisterRequestDTO, req.body);
    if (!validationResult.success) {
        throw new SchemaError(validationResult.error);
    }
    const { email, password } = req.body;
    const result = await userService.login(email, password);
    if (typeof result === "string") {
        throw new UnauthenticatedError(result);
    }
    res.status(StatusCodes.Ok200).send({ ...result });
    return;
});
userApi.get("/", async (req, res) => {
    const users = userService.getAll();
    res.status(StatusCodes.Ok200).send({ users });
    return;
});
export default userApi;
