import { Hono } from "hono";
import user from "./routes/userRoutes";
import blog from "./routes/blogRoutes";
import {cors} from "hono/cors"

const app = new Hono();

app.use('/api/*',cors());
app.route("/api/v1/user",user);
app.route("/api/v1/blog",blog)

export default app;