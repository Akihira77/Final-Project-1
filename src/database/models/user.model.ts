export interface UserModel {
    id: string;
    email: string;
    password: string;
}

export interface UserDTO {
    id: string;
    email: string;
}

export interface RegisterRequestDTO {
    email: string;
    password: string;
}

export interface RegisterResponseDTO {
    id: string;
    email: string;
}

export interface LoginRequestDTO {
    email: string;
    password: string;
}

export type LoginResponse = string | { access_token: string } | null;
