import { z } from "zod";

type ValidationResult = {
    success: boolean;
    error: string[];
};

export function isValidData(schema: z.Schema, data: unknown): ValidationResult {
    const validationResult = schema.safeParse(data);

    if (!validationResult.success) {
        return {
            success: false,
            error: validationResult.error.issues.map(
                (issue) => `${issue.path} - ${issue.message}`
            ),
        };
    }

    return { success: true, error: [] };
}
