import express from "express";
import {deleteUser, test,update} from '../controller/user.controller.js'
import {verifyUser} from '../utils/verifyUser.js'
const router= express.Router();

router.get('/test',test)
router.put('/update/:id',verifyUser,update)
router.delete('/delete/:id',verifyUser,deleteUser)
export default router