import express from 'express';
import { renderFavoritesDevice, renderPhonesPage, renderComparePage, login, renderLoginPage, renderHomePage, renderSignupPage, createAccount , renderPhoneDetails, logout, addPhoneReview} from '../controller/userController.js';
import {  } from '../utils/userValidation.js';
import { searchDevice } from '../services/services.js';

export const route = express.Router();

route.get('/login', renderLoginPage);
route.get('/signup', renderSignupPage);
route.post('/signup', createAccount);
route.post('/login', login);
route.post('/review', addPhoneReview);
route.get('/compare', renderComparePage);
route.get('/phones', renderPhonesPage);
route.get('/phone/:id', renderPhoneDetails);
route.get('/logout', logout);
route.get('/search/:name', searchDevice);
route.get('/favorite/:id', renderFavoritesDevice);
route.use('/', renderHomePage);





