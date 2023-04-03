import { Router } from "express";
import userRoutes from "./userRoutes.js";
import medicRoutes from "./medicRoutes.js";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/medics", medicRoutes);

export default routes;