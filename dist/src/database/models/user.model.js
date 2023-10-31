import { z } from "zod";
export const UserModel = z.object({
    id: z.string(),
    email: z.string(),
    password: z.string(),
});
export const UserDTO = z.object({
    id: z.string(),
    email: z.string(),
});
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
export const RegisterResponseDTO = z.object({
    id: z.string(),
    email: z.string(),
});
export const LoginRequestDTO = z.object({
    user: UserModel,
    passwordRequest: z.string(),
});
export const LoginResponseDTO = z.union([
    z.string(),
    z.object({ access_token: z.string() }),
]);
