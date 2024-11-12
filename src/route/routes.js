import express from 'express';
import { renderReviewPage, renderPhonesPage, renderComparePage,renderHomeLogin, login, renderLoginPage, renderHomePage, renderSignupPage, createAccount } from '../controller/userController.js';

export const route = express.Router();
// route.get('/', getTopPhone);
route.get('/login', renderLoginPage);
route.get('/signup', renderSignupPage);
route.post('/signup', createAccount);
route.post('/login', login);
route.get('/homelogin', renderHomeLogin)
route.get('/compare', renderComparePage);
route.get('/phones', renderPhonesPage);
route.get('/review', renderReviewPage);
route.use('/', renderHomePage);





