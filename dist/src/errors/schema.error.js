import { StatusCodes } from "../utils/constant.js";
class SchemaError {
    errors;
    name;
    statusCode;
    constructor(errors) {
        this.errors = errors;
        this.name = "Schema validation";
        this.statusCode = StatusCodes.BadRequest400;
    }
}
export default SchemaError;
