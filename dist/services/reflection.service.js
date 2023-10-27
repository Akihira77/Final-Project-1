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
    async deleteReflectionById(id) {
        try {
            const isDeleted = await this._reflectionRepository.deleteReflectionById(id);
            return isDeleted;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}
export default ReflectionService;
