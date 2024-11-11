import validator from "validator";
// import { query } from "../configuration/database.js"; // sementara tidak pakai ini dulu
import gsmarena from "gsmarena-api";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { User } from "../model/userModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cacheFilePath = path.join(__dirname, "cache", "topDevices.json");

// Fungsi untuk memuat cache dari file JSON
const loadCache = async () => {
  try {
    const data = await fs.readFile(cacheFilePath, "utf-8");
    const parsedData = JSON.parse(data);

    // Cek apakah cache masih valid (misalnya 24 jam)
    const oneDay = 24 * 60 * 60 * 1000; // dalam milidetik
    if (Date.now() - parsedData.timestamp < oneDay) {
      return parsedData.devices;
    }
  } catch (error) {
    console.log("Cache tidak tersedia atau sudah kadaluarsa.");
  }
  return null; // Jika tidak ada cache atau sudah kadaluarsa
};

const saveCache = async (devices) => {
  const data = {
    timestamp: Date.now(),
    devices,
  };
  await fs.mkdir(path.dirname(cacheFilePath), { recursive: true });
  await fs.writeFile(cacheFilePath, JSON.stringify(data), "utf-8");
};

export const renderLoginPage = (req, res) => {
  res.render("login");
};

export const autentikasiLogin = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  
  // const result = await query(
  //   `SELECT * FROM user WHERE email = '${email}' AND password = '${password}'`
  // );
  // res.send();
  // menggunakan sequelize

  if (result.length == 1) {
    res.redirect("/home");
  } else {
    console.log("gagal login");
    res.redirect("/login");
  }
};

const getDeviceList = async () => {
  let devices = await loadCache();

  if (devices) {
    console.log("Mengambil data dari cache lokal");
    return devices;
  }

  try {
    const results = await gsmarena.top.get();
    const topPhones = results[0]["list"];
    const devicesList = await Promise.all(
      topPhones.map(async ({ id }) => {
        const device = await gsmarena.catalog.getDevice(id);
        return device;
      })
    );

    await saveCache(devicesList);
    return devicesList;
  } catch (error) {
    console.log("nih errornya", error);
    throw error;
  }
};

export const renderHomePage = async (req, res) => {
  try {
    const topPhonesv2 = await getDeviceList();
    // const detail = await gsmarena.catalog.getDevice(topPhonesv2);
    console.log(topPhonesv2);

    res.render("home", { phones: topPhonesv2 });
    // res.render('home', {phones : topPhonesv2});
  } catch (error) {
    console.log(error);
  }
};

export const renderSignupPage = (req, res) => {
  res.render("signup");
};

export const accountValidator = (email, password, passwordConfirmation) => {
  if (!validator.isEmail(email)) {
    return false;
  }

  if (password !== passwordConfirmation) {
    return false
  }

  // if (
  //   validator.isStrongPassword(password, {
  //     minLength: 8,
  //     minLowercase: 1,
  //     minUppercase: 1,
  //     minNumbers: 1,
  //   })
  // ) {
  //   return true;
  // } else {
  //   return false;
  // }

  return true;
};

export const createAccount = async (req, res) => {
  const { email, password, passwordConfirmation } = req.body;
  if (accountValidator(email, password, passwordConfirmation)) {
    try {
        await User.create({ email, password });
        res.redirect("/home");
      } catch (error) {
        res.redirect("/signup");
      }
  } else {
      res.redirect("/signup");

  }
  // const sqlQuery =
  //   "INSERT INTO `user` (`id_user`, `email`, `password`) VALUES (NULL, ?,?)";


  // try {
  //   const result = query(sqlQuery, [email, password]);
  //   res.redirect("/home");
  // } catch (error) {
    //   console.log(error);
    //   res.redirect("/signup");
  // }
};

export const renderHomeLogin = (req, res) => {
  res.render("homelogin");
};

export const renderComparePage = (req, res) => {
  res.render("compare");
};

export const renderPhonesPage = (req, res) => {
  res.render("phones");
};
export const renderReviewPage = (req, res) => {
  res.render("review");
};
