import { Router } from "express";
import {
  fnLerDados,
  fnAddClientes,
  fnFormulario,
  fnPainel,
  fnEdicao,
  fnAtualizar,
  fnExcluir,
} from "../controllers/clientes.js";
const router = Router();

router.get("/", (req, res) => {
  res.render("home");
});
router.get("/clientes", fnLerDados);
router.post("/cadastros", fnAddClientes);
router.get("/add", fnFormulario);
router.get("/painel", fnPainel);
router.get("/editar/:id", fnEdicao);
router.post("/atualizar/:id", fnAtualizar);
router.post("/excluir/:id", fnExcluir);

export default router;
