import { top } from '../services/services.js';


export const renderLoginPage = (req, res) => {
    res.render('login');
}

export const autentikasiLogin = (req, res) => {
    console.log(req.body);
    const [email, password] = req.body;   
    res.send('halo');
}

export const renderHomePage = (req, res) => {
    res.render('home');
    console.log(top);
}

export const renderSignupPage = (req, res) => {
    res.render('signup');
}