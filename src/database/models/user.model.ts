import { z } from "zod";

export const UserModel = z.object({
    id: z.string(),
    email: z.string(),
    password: z.string(),
});

export type UserModelType = z.infer<typeof UserModel>;

export const UserDTO = z.object({
    id: z.string(),
    email: z.string(),
});

export type UserDTOType = z.infer<typeof UserDTO>;

export const RegisterRequestDTO = z
    .object({
        email: z
            .string({
                required_error: "Email is required",
                invalid_type_error: "Email must be a string",
            })
            .email()
            .trim(),
        password: z.string({
            required_error: "Password is required",
        }),
    })
    .required();

export type RegisterRequestDTOType = z.infer<typeof RegisterRequestDTO>;

export const RegisterResponseDTO = z.object({
    id: z.string(),
    email: z.string(),
});

export type RegisterResponseDTOType = z.infer<typeof RegisterResponseDTO>;

export const LoginRequestDTO = z.object({
    user: z.object({ UserModel }, { required_error: "User data is required" }),
    passwordRequest: z.string({ required_error: "Password is required" }),
});

export type LoginRequestDTOType = z.infer<typeof LoginRequestDTO>;

export const LoginResponseDTO = z.union([
    z.string(),
    z.object({ access_token: z.string() }),
]);

export type LoginResponseDTOType = z.infer<typeof LoginResponseDTO>;
