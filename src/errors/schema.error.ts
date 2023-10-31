import { StatusCodes } from "../utils/constant.js";

class SchemaError {
    readonly name: string;
    readonly statusCode: number;
    constructor(readonly errors: string[]) {
        this.name = "Schema validation";
        this.statusCode = StatusCodes.BadRequest400;
    }
}

export default SchemaError;
