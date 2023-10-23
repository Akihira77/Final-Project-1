import UserRepository from "../database/repository/user.repository.js";
class UserService {
    _userRepository;
    constructor() {
        this._userRepository = new UserRepository();
    }
    async register(email, password) {
        try {
            const existedUser = await this._userRepository.getByEmail(email);
            if (existedUser) {
                return "Email already used!";
            }
            const registerResponse = await this._userRepository.register({
                email,
                password,
            });
            return registerResponse;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async login(email, password) {
        try {
            const userFromDb = await this._userRepository.getByEmail(email);
            if (!userFromDb) {
                return "Email or password invalid!";
            }
            const loginRequest = {
                user: { UserModel: userFromDb },
                passwordRequest: password,
            };
            const loginResponse = await this._userRepository.login(loginRequest);
            return loginResponse;
        }
        catch (error) {
            throw error;
        }
    }
    async getAll() {
        try {
            const users = await this._userRepository.getAll();
            return users;
        }
        catch (error) {
            throw error;
        }
    }
    async getByEmail(email) {
        try {
            const user = await this._userRepository.getByEmail(email);
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async getById(id) {
        try {
            const user = await this._userRepository.getById(id);
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            const user = await this._userRepository.getById(id);
            if (!user) {
                return false;
            }
            await this._userRepository.delete(user.id);
            return true;
        }
        catch (error) {
            throw error;
        }
    }
}
export default UserService;
