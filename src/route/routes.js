import express from 'express';
import { renderPhonesPage, renderComparePage, login, renderLoginPage, renderHomePage, renderSignupPage, createAccount , renderPhoneDetails} from '../controller/userController.js';

export const route = express.Router();

route.get('/login', renderLoginPage);
route.get('/signup', renderSignupPage);
route.post('/signup', createAccount);
route.post('/login', login);
route.get('/compare', renderComparePage);
route.get('/phones', renderPhonesPage);
route.get('/phone/:id', renderPhoneDetails);
route.use('/', renderHomePage);





