import { Router } from "express";
import ReflectionService from "../services/reflection.service.js";
import { CreateReflectionRequestDTO, } from "../database/models/reflection.model.js";
import { StatusCodes } from "../utils/constant.js";
import { isValidData } from "../utils/validateZodSchema.js";
import { BadRequestError, NotFoundError, SchemaError, UnauthenticatedError, } from "../errors/main.error.js";
import authentication from "./middlewares/authentication.middleware.js";
const reflectionApi = Router();
const reflectionService = new ReflectionService();
reflectionApi.post("/reflections", authentication, async (req, res) => {
    const validationResult = isValidData(CreateReflectionRequestDTO, req.body);
    if (!validationResult.success) {
        throw new SchemaError(validationResult.error);
    }
    const { success, low_point, take_away } = req.body;
    const userIdUserType = req.user;
    const userId = userIdUserType;
    // console.log("UserId : ", userId)
    try {
        const createdReflection = await reflectionService.createReflection({
            success,
            low_point,
            take_away,
            UserId: userId,
        });
        res.status(StatusCodes.Created201).send({
            createdReflection
        });
    }
    catch (error) {
        console.error(error);
        res.status(StatusCodes.InternalServerError500).send({ message: "Gagal membuat refleksi" });
    }
});
reflectionApi.get("/getAllreflections", authentication, async (req, res) => {
    try {
        const userIdUserType = req.user;
        const userId = userIdUserType;
        const reflections = await reflectionService.getAllReflections(userId);
        if (typeof reflections === 'string') {
            res.status(200).json({ message: reflections });
        }
        else {
            res.status(200).json(reflections);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
reflectionApi.put("/reflections/:id", authentication, async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        throw new BadRequestError("Invalid ID parameter");
    }
    const validationResult = isValidData(CreateReflectionRequestDTO, req.body);
    if (!validationResult.success) {
        throw new SchemaError(validationResult.error);
    }
    const { success, low_point, take_away } = req.body;
    const userIdUserType = req.user;
    const userId = userIdUserType;
    try {
        const reflection = await reflectionService.getReflectionById(parseInt(id), userId);
        if (!reflection) {
            throw new NotFoundError("Reflection not found or Unauthorization");
        }
        const updatedReflection = await reflectionService.updateReflectionById(parseInt(id), {
            success,
            low_point,
            take_away,
            UserId: userId,
        });
        if (!updatedReflection) {
            throw new NotFoundError("Reflection not Unauthorized");
        }
        res.status(StatusCodes.Ok200).json(updatedReflection);
    }
    catch (error) {
        console.error(error);
        if (error instanceof NotFoundError) {
            res.status(StatusCodes.NotFound404).json({ message: error.message });
        }
        else if (error instanceof UnauthenticatedError) {
            res.status(StatusCodes.Unauthorized401).json({ message: error.message });
        }
        else {
            res.status(StatusCodes.InternalServerError500).json({ message: "Failed to update reflection" });
        }
    }
});
reflectionApi.delete("/reflections/:id", authentication, async (req, res) => {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        throw new BadRequestError("Invalid ID parameter");
    }
    const userIdUserType = req.user;
    const userId = userIdUserType;
    try {
        const success = await reflectionService.deleteReflectionById(parseInt(id), userId);
        if (!success) {
            throw new NotFoundError("Reflection not found");
        }
        res.status(StatusCodes.Ok200).json({ msg: "Berhasil Di Hapus" });
    }
    catch (error) {
        console.error(error);
        if (error instanceof NotFoundError) {
            res.status(StatusCodes.NotFound404).json({ message: error.message });
        }
        else if (error instanceof UnauthenticatedError) {
            res.status(StatusCodes.Unauthorized401).json({ message: error.message });
        }
        else {
            res.status(StatusCodes.InternalServerError500).json({ message: "Failed to delete reflection" });
        }
    }
});
export default reflectionApi;
