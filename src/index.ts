import "express-async-errors";
import { PORT } from "./config/env.config.js";
import { startServer } from "./express-app.js";
import * as db from "./database/index.js";

const app = startServer();

await db.migration();

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});
