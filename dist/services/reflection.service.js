import ReflectionRepository from "../database/repository/reflection.repository.js";
import { NotFoundError } from "../errors/main.error.js";
class ReflectionService {
    _reflectionRepository;
    constructor() {
        this._reflectionRepository = new ReflectionRepository();
    }
    async createReflection({ success, low_point, take_away, UserId, }) {
        try {
            const createdReflection = await this._reflectionRepository.createReflection({
                success,
                low_point,
                take_away,
                UserId,
            });
            return createdReflection;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getAllReflections(userId) {
        try {
            const reflections = await this._reflectionRepository.getAllReflections(userId);
            if (reflections.length === 0) {
                return "Empty Data";
            }
            return reflections;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getReflectionById(id, userId) {
        try {
            const reflection = await this._reflectionRepository.getReflectionById(id, userId);
            return reflection;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async updateReflectionById(id, reflectionData) {
        try {
            const updatedReflection = await this._reflectionRepository.updateReflectionById(id, reflectionData);
            return updatedReflection;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async deleteReflectionById(id, userId) {
        try {
            const reflection = await this._reflectionRepository.getReflectionById(id, userId);
            if (!reflection) {
                throw new NotFoundError("Reflection not found Or Unauthorized");
            }
            const success = await this._reflectionRepository.deleteReflectionById(id);
            return success;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}
export default ReflectionService;
