import { Request, Response, Router } from "express";
import ReflectionService from "../services/reflection.service.js";
import {
    CreateReflectionRequestDTOType,
    CreateReflectionRequestDTO,
} from "../database/models/reflection.model.js";
import { StatusCodes } from "../utils/constant.js";
import { isValidData } from "../utils/validateZodSchema.js";
import {
    BadRequestError,
    NotFoundError,
    SchemaError,
    UnauthenticatedError,
} from "../errors/main.error.js";
import jwt from 'jsonwebtoken';
import authentication from "./middlewares/authentication.middleware.js"; 
import { string } from "zod";


const reflectionApi = Router();
const reflectionService = new ReflectionService();

reflectionApi.post(
    "/reflections",
    authentication,
    async (
        req: Request,
        res: Response
        ) => {
        
            const validationResult = isValidData(CreateReflectionRequestDTO, req.body);
            if (!validationResult.success) {
                throw new SchemaError(validationResult.error);
            }
            const { success, low_point, take_away } = req.body;
            const userIdUserType = req.user as unknown
            const userId = userIdUserType as string
            // console.log("UserId : ", userId)
            
            try {
                const createdReflection = await reflectionService.createReflection({
                    success,
                    low_point,
                    take_away,
                    UserId : userId,
            });
            
            res.status(StatusCodes.Created201).send({ 
                success,
                low_point,
                take_away,
                userId
             });
        } catch (error) {
            console.error(error);
            res.status(StatusCodes.InternalServerError500).send({ message: "Gagal membuat refleksi" });
        }
    }
);



reflectionApi.get(
    "/getAllreflections",
    async (req: Request, res: Response) => {
        try {
            const reflections = await reflectionService.getAllReflections();
            res.status(200).json(reflections);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
);

reflectionApi.put(
    "/reflections/:id",
    authentication,
    async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            throw new BadRequestError("Invalid ID parameter");
        }

        const validationResult = isValidData(CreateReflectionRequestDTO, req.body);
        if (!validationResult.success) {
            throw new SchemaError(validationResult.error);
        }

        const { success, low_point, take_away } = req.body;
        const userIdUserType = req.user as unknown;
        const userId = userIdUserType as string;

        try {
            const updatedReflection = await reflectionService.updateReflectionById(parseInt(id), {
                success,
                low_point,
                take_away,
                UserId: userId,
            });

            if (!updatedReflection) {
                throw new NotFoundError("Reflection not found");
            }

            res.status(StatusCodes.Ok200).json(updatedReflection);
        } catch (error) {
            console.error(error);

            if (error instanceof NotFoundError) {
                res.status(StatusCodes.NotFound404).json({ message: error.message });
            } else {
                res.status(StatusCodes.InternalServerError500).json({ message: "Failed to update reflection" });
            }
        }
    }
);

reflectionApi.delete(
    "/reflections/:id",
    authentication,
    async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            throw new BadRequestError("Invalid ID parameter");
        }

        try {
            const success = await reflectionService.deleteReflectionById(parseInt(id));

            if (!success) {
                throw new NotFoundError("Reflection not found");
            }

            res.status(StatusCodes.Ok200).json({msg: "Berhasil Di Hapus"});

        } catch (error) {
            console.error(error);

            if (error instanceof NotFoundError) {
                res.status(StatusCodes.NotFound404).json({ message: error.message });
            } else {
                res.status(StatusCodes.InternalServerError500).json({ message: "Failed to delete reflection" });
            }
        }
    }
);

export default reflectionApi;
