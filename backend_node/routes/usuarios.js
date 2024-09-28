import express from "express";
import {
  getUsuarios,
  addUsuario,
  updateUsuario,
  deleteUsuario,
} from "../controllers/usuario.js";

const router = express.Router();

router.get("/", getUsuarios);
router.post("/", addUsuario);
router.put("/:id", updateUsuario);
router.delete("/:id", deleteUsuario); 

export default router;
