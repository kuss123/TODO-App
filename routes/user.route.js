import { Router } from "express";
import { validRegister } from "../middlerware/userValidation.js";

import {
  deleteUser,
  getAll,
  getById,
  login,
  register,
  update,
} from "../controllers/user.controller.js";
import { isUser } from "../middlerware/isUser.js";
const router = Router();

import { multerFunction } from "../middlerware/multer.js";

const upload = multerFunction();

router.post("/register", upload.single("photo"), validRegister, register);
router.post("/login", login);
router.get("/", isUser, getAll);
router.get("/getById/:id", getById);
router.post("/update/:id", isUser, update);
router.delete("/delete/:id", deleteUser);

export default router;
