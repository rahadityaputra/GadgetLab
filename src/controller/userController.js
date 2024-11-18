import { authenticationLogin, authenticationSignUp} from "../utils/userValidation.js";
import { getDeviceDetail, getDeviceList } from "../services/services.js";
import { Review } from "../model/reviewModel.js";
import { User } from "../model/userModel.js";
import { Favorite } from "../model/favoritesModel.js";

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

export const renderFavoritesDevice = async (req, res) => {
  const user = req.session.user;

  if(!user){
    res.redirect('/');
    return;
  }
  try {
    const favorites = await Favorite.findAll({
      where: {
        id_user: user.id
      }
    })
    res.render('favorites', {user, favorites});
  } catch (error) {
    console.log(error);
  }
}

export const addFavoriteDevice = async (req, res) => {
  const {id_user, id_device, device_name, device_img} = req.body;

  try {
    const favorite = await Favorite.create({id_user, id_device, device_name, device_img});
    res.json({
      message : 'success',
      favorite
    })
    
  } catch (error) {
    console.log(error);
  }
}

export const deleteFavoriteDevice = async (req, res) => {
  const user = req.session.user;
  const id_device = req.params.id;
  console.log('p');

  console.log(user.id, id_device);
  try {
      const device = await Favorite.destroy({
          where : {
              id_user : user.id,
              id_device
            }
          })
        res.json({
          message : 'success',
          device
        })      
  } catch (error) {
    console.log(error);
  }
}

export const updatePasswordAccount = async (req, res) => {
  const {password, newPassword} = req.body;
  console.log(password, newPassword);
  try {
    const user = await User.findOne({
      where : {
      id_user : req.session.user.id,
      password
      }
    });

    const userUpdated = await User.update(
      {password : newPassword},
      {
        where : {
           id_user : req.session.user.id,
        }
      }
    )

    res.json({
      message : 'success',
      userUpdated
    })

    // res.redirect('/');
  } catch (error) {
    console.log(error);
  }
}

export const renderPasswordPage = (req, res) => {
  const user = req.session.user;
  if(!user) {
    res.redirect('/');
    return;
  }

  res.render('password', {user});
}

export const compareDevices = async (req, res) => {
  const id_phone1 = req.params.id_phone1;
  const id_phone2 = req.params.id_phone2;

  
  console.log(id_phone1, id_phone2);
  try {
    const phone1 = await getDeviceDetail(id_phone1);
    const phone2 = await getDeviceDetail(id_phone2);
  
    res.json({
      message : "success",
      data : {
        phone1,
        phone2
      }
    })
    
  } catch (error) {
    res.json({
      message : error.message,
    })
    
  }
    
  } 