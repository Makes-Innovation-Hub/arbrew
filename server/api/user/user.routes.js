import express from "express";

import { registerUser } from "./user.controllers.js";

const router = express.Router();
router.route("/").post(registerUser);

export default router;
