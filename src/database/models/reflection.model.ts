import { z } from "zod";

export const ReflectionModel = z.object({
	id: z.number(),
	success: z.string(),
	low_point: z.string(),
	take_away: z.string(),
	UserId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type ReflectionModelType = z.infer<typeof ReflectionModel>;

export const ReflectionDTO = z.object({
	id: z.number(),
	success: z.string(),
	low_point: z.string(),
	take_away: z.string(),
	UserId: z.string(),
});

export type ReflectionDTOType = z.infer<typeof ReflectionDTO>;

export const CreateReflectionRequestDTO = z.object({
	success: z.string({
		required_error: "Success is required",
		invalid_type_error: "Success must be a string",
	}),
	low_point: z.string({
		required_error: "Low Point is required",
		invalid_type_error: "Low Point must be a string",
	}),
	take_away: z.string({
		required_error: "Take Away is required",
		invalid_type_error: "Take Away must be a string",
	}),
	UserId: z.string({}).optional(),
});

export type CreateReflectionRequestDTOType = z.infer<
	typeof CreateReflectionRequestDTO
>;

export const CreateReflectionResponseDTO = z.object({
	id: z.number(),
	success: z.string(),
	low_point: z.string(),
	take_away: z.string(),
	UserId: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type CreateReflectionResponseDTOType = z.infer<
	typeof CreateReflectionResponseDTO
>;
