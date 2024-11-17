import express from 'express';
import { renderFavoritesDevice, renderPhonesPage, renderComparePage, login, renderLoginPage, renderHomePage, renderSignupPage, createAccount , renderPhoneDetails, logout, addPhoneReview, addFavoriteDevice, updatePasswordAccount, deleteFavoriteDevice, renderPasswordPage} from '../controller/userController.js';
import {  } from '../utils/userValidation.js';
import { searchDevice } from '../services/services.js';

export const route = express.Router();

route.get('/login', renderLoginPage); 
route.get('/signup', renderSignupPage);
route.get('/password', renderPasswordPage);
route.put('/password', updatePasswordAccount);
route.post('/signup', createAccount);
route.delete('/favorites/delete/:id', deleteFavoriteDevice);
route.post('/login', login);
route.post('/favorites', addFavoriteDevice);
route.post('/review', addPhoneReview);
route.get('/compare', renderComparePage);
route.get('/phones', renderPhonesPage);
route.get('/phone/:id', renderPhoneDetails);
route.get('/logout', logout);
route.get('/search/:name', searchDevice);
route.get('/favorites', renderFavoritesDevice);
route.use('/', renderHomePage);





