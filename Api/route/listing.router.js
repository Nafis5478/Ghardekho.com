import express from "express"
import { create, deleteList } from "../controller/listing.controller.js";
import {verifyUser} from '../utils/verifyUser.js'
const router= express.Router();
router.post('/create',verifyUser,create)
router.delete('/delete/:id',verifyUser,deleteList)
export default router;