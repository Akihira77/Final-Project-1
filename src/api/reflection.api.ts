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
        const { success, low_point, take_away, UserId } = req.body;
        
        try {
            const createdReflection = await reflectionService.createReflection(
                {
                    success,
                    low_point,
                    take_away,
                    UserId, 
                },
            );
            res.status(201).json(
                {
                    success: success,
                    low_point: low_point,
                    take_away: take_away,
                    UserId: UserId,
                }
                );
                
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
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

reflectionApi.get(
    "/get/:id",
    authentication,
    async (req: Request, res: Response) => {
        const id = (req.params.id, 10);

        try {
            const userId = req.user.userId;
            const reflection = await reflectionService.getReflectionById(id, userId);

            if (!reflection) {
                res.status(404).json({ message: "Reflection not found" });
                return;
            }

            res.status(200).json(reflection);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
);

// reflectionApi.put(
//     "/update/:id",
//     authentication,
//     async (req: Request, res: Response) => {
//         const id = (req.params.id, 10);

//         try {
//             const userId = req.user.userId;
//             const data = req.body;
//             const updatedReflection = await reflectionService.updateReflection(id, data, userId);

//             if (!updatedReflection) {
//                 res.status(404).json({ message: "Reflection not found" });
//                 return;
//             }

//             res.status(200).json(updatedReflection);
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: "Internal Server Error" });
//         }
//     }
// );

// reflectionApi.delete(
//     "/delete/:id",
//     authentication,
//     async (req: Request, res: Response) => {
//         const id = (req.params.id, 10);

//         try {
//             const userId = req.user.userId;
//             await reflectionService.deleteReflection(id, userId);
//             res.status(204).end();
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ message: "Internal Server Error" });
//         }
//     }
// );

export default reflectionApi;
