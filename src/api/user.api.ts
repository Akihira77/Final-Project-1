import { Request, Response, Router } from "express";
import UserService from "../services/user.service.js";
import {
    RegisterRequestDTOType,
    RegisterRequestDTO,
    LoginRequestDTOType,
    LoginRequestDTO,
} from "../database/models/user.model.js";
import { StatusCodes } from "../utils/constant.js";
import { isValidData } from "../utils/validateZodSchema.js";
import {
    BadRequestError,
    NotFoundError,
    SchemaError,
    UnauthenticatedError,
} from "../errors/main.error.js";

const userApi = Router();
const userService = new UserService();

userApi.post(
    "/auth/register",
    async (
        req: Request<never, never, RegisterRequestDTOType, never>,
        res: Response
    ) => {
        const validationResult = isValidData(RegisterRequestDTO, req.body);
        if (!validationResult.success) {
            throw new SchemaError(validationResult.error);
        }

        const { email, password } = req.body;
        const registerResponse = await userService.register(email, password);

        if (typeof registerResponse === "string") {
            throw new BadRequestError(registerResponse);
        }

        res.status(StatusCodes.Created201).send({ user: registerResponse });
        return;
    }
);

userApi.post(
    "/auth/login",
    async (
        req: Request<never, never, RegisterRequestDTOType, never>,
        res: Response
    ) => {
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
    }
);

userApi.get("/", async (req: Request, res: Response) => {
    const users = await userService.getAll();
    res.status(StatusCodes.Ok200).send({ users });
    return;
});

userApi.get(
    "/:id",
    async (
        req: Request<{ id: string }, never, never, never>,
        res: Response
    ) => {
        const user = await userService.getById(req.params.id);
        if (!user) {
            throw new NotFoundError("User does not found");
        }

        res.status(StatusCodes.Ok200).send({
            user: {
                id: user.id,
                email: user.email,
            },
        });
        return;
    }
);

userApi.delete(
    "/:id",
    async (
        req: Request<{ id: string }, never, never, never>,
        res: Response
    ) => {
        const result = await userService.remove(req.params.id);

        if (!result) {
            throw new NotFoundError("User does not found");
        }
        res.status(StatusCodes.Ok200).send({ msg: "User deleted succesfully" });
        return;
    }
);

export default userApi;
