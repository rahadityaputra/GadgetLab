import { authenticationLogin, authenticationSignUp} from "../utils/userValidation.js";
import { getDeviceDetail, getDeviceList } from "../services/services.js";

export const renderLoginPage = (req, res) => {
  res.render("login");
};

export const renderSignupPage = (req, res) => {
  res.render("signup");
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await authenticationLogin(email, password);
    if (result.success) {
      res.redirect('/');
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.log(error);
  }
  
};

export const createAccount = async (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;
  try {
    const result = await authenticationSignUp(username, email, password, passwordConfirmation);
    if (result.success) {
      res.redirect('/');
    } else {
      res.redirect('/signup');
    }
  } catch (error) {
    // tampilkan error
    console.log(error);

  }

};

export const renderHomePage = async (req, res) => {
  try {
    const {topPhonesByFansList, topPhonesByInterestList} = await getDeviceList();
    // console.log(topPhonesByInterestList);
    res.render("home", { topPhonesByFansList, topPhonesByInterestList });
  } catch (error) {
    console.log(error);
  }
};


export const renderComparePage = (req, res) => {
  res.render("compare");
};

export const renderPhonesPage = (req, res) => {
  res.render("phones");
};

export const renderPhoneDetails =async (req, res) => {
  console.log(req.params.id);
  const phone = await getDeviceDetail(req.params.id);
  console.log(phone);
  res.render('phone', {phone});
  
}