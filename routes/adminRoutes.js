import express from "express"
import adminController from "../controller/adminController.js"



import routes from './routes.js';
const { admin } = routes;

const router = express.Router();

router.post(admin.createAdmin, adminController.createAdmin)

router.post(admin.login, adminController.login)


export default router