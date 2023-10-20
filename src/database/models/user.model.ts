export type UserModel = {
    id: string;
    email: string;
    password: string;
};

export type UserDTO = {
    id: string;
    email: string;
};

export type RegisterRequestDTO = {
    email: string;
    password: string;
};

export type RegisterResponseDTO = {
    id: string;
    email: string;
};

export type LoginRequestDTO = {
    email: string;
    password: string;
};

export type LoginResponse = string | { access_token: string } | null;
