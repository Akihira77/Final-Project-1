import dotenv from "dotenv";
if (process.env.NODE_ENV !== "prod") {
    dotenv.config({ path: `./.env.${process.env.NODE_ENV}` });
}
else {
    dotenv.config();
}
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;
const POSTGRESS = process.env.POSTGRESS;
export { JWT_SECRET, PORT, POSTGRESS };
