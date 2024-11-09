import validator from "validator";
import { query } from "../configuration/database.js";
import gsmarena from 'gsmarena-api';


export const renderLoginPage = (req, res) => {
  res.render("login");
};

export const autentikasiLogin = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const result = await query(
    `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`
  );
  // res.send();

  if (result.length == 1) {
    res.redirect("/home");
  } else {
    console.log("gagal login");
    res.redirect("/login");
  }
};

export const renderHomePage = async (req, res) => {
  try {
    const topPhones = await gsmarena.top.get();
    console.log(topPhones[0]);

    res.render('home', {data :topPhones[0]});
  } catch (error) {
    console.log(error);
  }
};

export const renderSignupPage = (req, res) => {
  res.render("signup");
};

export const createAccount = (req, res) => {
  const { email, password, passwordConfirmation } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(400).send("email tidak tepat");
  }

  if (password !== passwordConfirmation) {
    return res.status(400).send("password ora cocok bro");
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
  ) {

    return res.status(400).send('password kurang kuat mas');
  }

  
  const sqlQuery =
    "INSERT INTO `user` (`id_user`, `email`, `password`) VALUES (NULL, ?,?)";

  try {
    const result = query(sqlQuery, [email, password]);
    res.redirect("/home");
  } catch (error) {
    console.log(error);
    res.redirect("/signup");
  }
};


export const renderHomeLogin = (req, res) => {
  res.render('homelogin');
}

export const renderComparePage = (req, res) => {
  res.render('compare');
}