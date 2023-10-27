import {
    CreateReflectionRequestDTOType,
    CreateReflectionResponseDTOType,
    ReflectionModelType,
} from "../database/models/reflection.model";
import ReflectionRepository from "../database/repository/reflection.repository.js";

class ReflectionService {
    private readonly _reflectionRepository;

    constructor() {
        this._reflectionRepository = new ReflectionRepository();
    }

    async createReflection(
        {
            success,
            low_point,
            take_away,
            UserId,
        }: CreateReflectionRequestDTOType): Promise<CreateReflectionResponseDTOType | string> {
            try {
                const createdReflection = await this._reflectionRepository.createReflection(
                    {
                        success,
                        low_point,
                        take_away,
                        UserId,
                    },
                );
    
                return createdReflection;
            } catch (error) {
                console.log(error);
                throw error;
            }
    }

    async getAllReflections(): Promise<ReflectionModelType[]> {
        try {
            const reflections = await this._reflectionRepository.getAllReflections();
            return reflections;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateReflectionById(id: number, reflectionData: CreateReflectionRequestDTOType): Promise<CreateReflectionResponseDTOType | undefined> {
        try {
            const updatedReflection = await this._reflectionRepository.updateReflectionById(id, reflectionData);
            return updatedReflection;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async deleteReflectionById(id: number): Promise<boolean> {
        try {
            const isDeleted = await this._reflectionRepository.deleteReflectionById(id);
            return isDeleted;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


}

export default ReflectionService;
