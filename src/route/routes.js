import express from 'express';
import { autentikasiLogin, renderLoginPage, renderHomePage, renderSignupPage } from '../controller/userController.js';

export const route = express.Router();
route.get('/login', renderLoginPage);
route.get('/signup', renderSignupPage);
route.post('/login', autentikasiLogin);
route.use('/', renderHomePage);


