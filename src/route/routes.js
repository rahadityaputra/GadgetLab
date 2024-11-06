import express from 'express';
import { autentikasiLogin, renderLoginPage, renderHomePage, renderSignupPage, renderPhonesPage, renderComparePage, renderReviewPage, createAccount } from '../controller/userController.js';

export const route = express.Router();
route.get('/login', renderLoginPage);
route.get('/signup', renderSignupPage);
route.get('/phones', renderPhonesPage);
route.get('/compare', renderComparePage);
route.get('/review', renderReviewPage);
route.post('/signup', createAccount);
route.post('/login', autentikasiLogin);
route.use('/', renderHomePage);


