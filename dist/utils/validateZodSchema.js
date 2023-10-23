export function isValidData(schema, data) {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
        return {
            success: false,
            error: validationResult.error.issues.map((issue) => `${issue.path} - ${issue.message}`),
        };
    }
    return { success: true, error: [] };
}
