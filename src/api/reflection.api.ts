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
    async (
        req: Request,
        res: Response
        ) => {
        
            const validationResult = isValidData(CreateReflectionRequestDTO, req.body);
            if (!validationResult.success) {
                throw new SchemaError(validationResult.error);
            }
            const { success, low_point, take_away } = req.body;
            const userId = req.user.userId
            
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
            throw error;
        }
    }
);



reflectionApi.get(
    "/getAllreflections",
    async (req: Request, res: Response) => {
        try {
            const userId = req.user.userId

            const reflections = await reflectionService.getAllReflections(userId);

            if (typeof reflections === 'string') {
                res.status(200).json({ message: reflections });
            } else {
                res.status(200).json(reflections);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);



reflectionApi.put(
    "/reflections/:id",
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
        const userId = req.user.userId

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
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);



reflectionApi.delete(
    "/reflections/:id",
    async (req: Request, res: Response) => {
        const { id } = req.params;

        if (!id || isNaN(parseInt(id))) {
            throw new BadRequestError("Invalid ID parameter");
        }

        const userId = req.user.userId

        try {
            const success = await reflectionService.deleteReflectionById(parseInt(id), userId);

            if (!success) {
                throw new NotFoundError("Reflection not found");
            }

            res.status(StatusCodes.Ok200).json({ msg: "Berhasil Di Hapus" });

        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);


export default reflectionApi;
