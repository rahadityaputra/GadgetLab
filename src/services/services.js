import gsmarena from "gsmarena-api";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

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

export const getDeviceList = async () => {
  let devices = await loadCache();

  if (devices) {
    console.log("Mengambil data dari cache lokal");
    //   console.log(devices.topPhonesByInterestList);
    return devices;
  }

  try {
    console.log("ambil dari server woy");
    const results = await gsmarena.top.get();
    // console.log(results);

    const topPhonesByInterest = results[0]["list"];
    const topPhonesByFans = results[1]["list"];
    const topPhonesByFansList = await Promise.all(
      topPhonesByFans.map(async ({ id }) => {
        const device = await gsmarena.catalog.getDevice(id);
        device.id = id;
        return device;
      })
    );

    const topPhonesByInterestList = await Promise.all(
      topPhonesByInterest.map(async ({ id }) => {
        const device = await gsmarena.catalog.getDevice(id);
        device.id = id;
        return device;
      })
    );

    await saveCache({ topPhonesByFansList, topPhonesByInterestList });

    return {
      topPhonesByFansList,
      topPhonesByInterestList,
    };
  } catch (error) {
    console.log("nih errornya", error);
    throw error;
  }
};


export const getDeviceDetail = async (id) => {
  try {
    const phone = await gsmarena.catalog.getDevice(id);
    return phone;
  } catch (error) {
    return {
      message : error
    }
  }
  
}