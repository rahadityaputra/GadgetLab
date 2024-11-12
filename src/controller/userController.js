import validator from "validator";
// import { query } from "../configuration/database.js"; // sementara tidak pakai ini dulu
import gsmarena from "gsmarena-api";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { authenticationLogin, authenticationSignUp} from "../utils/userValidation.js";


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
    const topPhonesByInterest = results[0]["list"];
    const topPhonesByFans = results[1]["list"];
    // console.log(results);
    const topPhonesByFansList = await Promise.all(
      topPhonesByFans.map(async ({ id }) => {
        const device = await gsmarena.catalog.getDevice(id);
        return device;
      }));

    const topPhonesByInterestList = await Promise.all(
      topPhonesByInterest.map(async ({ id }) => {
        const device = await gsmarena.catalog.getDevice(id);
        return device;
      }))

      await saveCache({topPhonesByFansList, topPhonesByInterestList});

      return {
        topPhonesByFansList,
        topPhonesByInterestList
      }


  } catch (error) {
    console.log("nih errornya", error);
    throw error;
  }
};

export const renderHomePage = async (req, res) => {
  try {
    const {topPhonesByFansList, topPhonesByInterestList} = await getDeviceList();
    res.render("home", { topPhonesByFansList, topPhonesByInterestList });
  } catch (error) {
    console.log(error);
  }
};

export const renderSignupPage = (req, res) => {
  res.render("signup");
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
