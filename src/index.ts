import "express-async-errors";
import { PORT } from "./config/env.config.js";
import { startServer } from "./express-app.js";

const app = startServer();

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});
