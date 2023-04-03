import { Router } from "express";
import medicControllers from "../controllers/medicControllers.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import { medicSchema } from "../schemas/Medic.js";

const medicRoutes = Router();

medicRoutes.post("/signup", validateSchema(medicSchema), medicControllers.create)
medicRoutes.post("/signin", medicControllers.signin)

export default medicRoutes;