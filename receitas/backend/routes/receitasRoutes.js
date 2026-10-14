import { Router } from "express";
import { listarReceitas, criarReceita, deletarReceita } from "../controllers/receitasControllers.js";
import validarReceita from "../middlewares/validarReceita.js";

const router = Router();

router.get("/", listarReceitas);
router.post("/", validarReceita, criarReceita);
router.delete("/:id", deletarReceita);

export default router;