import { authenticationLogin, authenticationSignUp} from "../utils/userValidation.js";
import { getDeviceDetail, getDeviceList } from "../services/services.js";
import { Review } from "../model/reviewModel.js";
import { User } from "../model/userModel.js";

export const renderLoginPage = (req, res) => {
  res.render("login", {message : req.flash('error')});
};

export const renderSignupPage = (req, res) => {
  res.render("signup", {message : req.flash('error')});
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await authenticationLogin(email, password);
    if (result.success) {
      const {id, username} = result.user;
      req.session.user = {id, username};
      res.redirect('/');
    } else {
      req.flash('error', result.message);
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
      const {id, username} = result.user;
      req.session.user = {id, username};
      res.redirect('/');

    } else {
      
      req.flash('error', result.message);
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
    console.log(req.session.user);
    res.render("home", { topPhonesByFansList, topPhonesByInterestList , user : req.session.user});
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
  // console.log(req.params.id);
  const user = req.session.user;
  try {
    const phone = await getDeviceDetail(req.params.id);
    const reviews = await Review.findAll({
      where: {
        id_device: req.params.id
      },
      include: [{
        model: User,
        attributes: ['username']
      }],
      attributes: ['review_text', 'rating', 'review_date']
    })
    
    // console.log(reviews[0].dataValues.User);
    res.render('phone', {phone, user, reviews});
    console.log(phone);    
  } catch (error) {    
    console.log(error);
  }
  

}


export const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
}

export const addPhoneReview  = async (req, res) => {
  console.log('masuk fungsi tambah');
  const {id_user, id_device, review_text, rating} = req.body;
  console.log(id_user, id_device, review_text, rating);
  try {
    const review = await Review.create({id_user, id_device, review_text, rating});
    res.json({
      message : 'success',
      review
    })
    
  } catch (error) {
    console.log(error);
  }
}

// SELECT reviews.review_text, reviews.rating , users.username , reviews.review_date FROM reviews  JOIN users ON reviews.id_user = users.id_user WHERE reviews.id_device = 'samsung_galaxy_a55-12824';