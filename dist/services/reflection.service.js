import ReflectionRepository from "../database/repository/reflection.repository.js";
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
    async getAllReflections() {
        try {
            const reflections = await this._reflectionRepository.getAllReflections();
            return reflections;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getReflectionById(id, userId) {
        try {
            const reflection = await this._reflectionRepository.getReflectionById(id);
            if (!reflection) {
                return undefined;
            }
            if (reflection.UserId !== userId) {
                throw new Error("Unauthorized");
            }
            return reflection;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}
export default ReflectionService;
