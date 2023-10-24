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
    async updateReflection(id, data, userId) {
        try {
            const reflection = await this._reflectionRepository.getReflectionById(id);
            if (!reflection) {
                return undefined;
            }
            // Pastikan reflection.UserId sama dengan userId dari token otentikasi
            if (reflection.UserId !== userId) {
                throw new Error("Unauthorized");
            }
            const updatedReflection = await this._reflectionRepository.updateReflection(id, data);
            return updatedReflection;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async deleteReflection(id, userId) {
        const reflection = await this._reflectionRepository.getReflectionById(id);
        if (!reflection) {
            throw new Error("Reflection not found");
        }
        // Pastikan reflection.UserId sama dengan userId dari token otentikasi
        if (reflection.UserId !== userId) {
            throw new Error("Unauthorized");
        }
        await this._reflectionRepository.deleteReflection(id);
    }
}
export default ReflectionService;
