import { Router } from "express";
import { createUser, getContacts, getUser } from "../controllers/user.controllers.js";

const router = Router()

router.post("/", createUser);
router.post("/login", getUser);

router.get("/contacts/:id", getContacts)

export default router
