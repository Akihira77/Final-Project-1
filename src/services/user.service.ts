import {
    LoginRequestDTO,
    LoginRequestDTOType,
    LoginResponseDTO,
    LoginResponseDTOType,
    RegisterResponseDTO,
    RegisterResponseDTOType,
    UserDTO,
    UserDTOType,
    UserModelType,
} from "../database/models/user.model.js";
import UserRepository from "../database/repository/user.repository.js";
class UserService {
    private readonly _userRepository;
    constructor() {
        this._userRepository = new UserRepository();
    }

    async register(
        email: string,
        password: string
    ): Promise<RegisterResponseDTOType | string> {
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
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async login(
        email: string,
        password: string
    ): Promise<LoginResponseDTOType> {
        try {
            const userFromDb = await this._userRepository.getByEmail(email);

            if (!userFromDb) {
                return "Email or password invalid!";
            }

            const loginRequest: LoginRequestDTOType = {
                user: userFromDb,
                passwordRequest: password,
            };
            const loginResponse = await this._userRepository.login(
                loginRequest
            );

            return loginResponse;
        } catch (error) {
            throw error;
        }
    }

    async getAll(): Promise<UserDTOType[]> {
        try {
            const users = await this._userRepository.getAll();

            return users;
        } catch (error) {
            throw error;
        }
    }

    async getByEmail(email: string): Promise<UserModelType | undefined> {
        try {
            const user = await this._userRepository.getByEmail(email);

            return user;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
