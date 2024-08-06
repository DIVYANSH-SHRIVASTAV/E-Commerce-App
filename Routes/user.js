import express from 'express';
import {login, register, users} from '../Controllers/user.js';

const router=express.Router();
//register User
router.post('/register',register);// api/user/register
//login User
router.post('/login',login);
router.get('/all',users);
export default router;