import express from "express";
import {deleteUser, test,update,listings} from '../controller/user.controller.js'
import {verifyUser} from '../utils/verifyUser.js'
const router= express.Router();

router.get('/test',test)
router.put('/update/:id',verifyUser,update)
router.delete('/delete/:id',verifyUser,deleteUser)
router.get('/listings/:id',verifyUser,listings)
export default router