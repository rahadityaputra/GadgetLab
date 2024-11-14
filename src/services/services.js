import gsmarena from "gsmarena-api";
console.log(gsmarena);
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const findDevice = (devices = [], id) => {
  if (devices) {
    for (let i = 0; i < devices.length; i++) {
      if (devices[i].id == id) {
        return devices[i];
      }
    }
    return null;
  }

  return null;
}

// Fungsi untuk memuat cache dari file JSON
const loadCache = async () => {
  const cacheFilePath = path.join(__dirname, "cache", "topDevices.json");
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

// Fungsi untuk memuat cache dari file JSON
const loadCacheDevices = async () => {
  const cacheFilePath = path.join(__dirname, "cache", "devices.json");
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

const saveCacheTopPhones = async (devices) => {
  const cacheFilePath = path.join(__dirname, "cache", `topDevices.json`);
  const data = {
    timestamp: Date.now(),
    devices,
  };
  await fs.mkdir(path.dirname(cacheFilePath), { recursive: true });
  await fs.writeFile(cacheFilePath, JSON.stringify(data), "utf-8");
};

const saveCacheDevice = async (device) => {
  const cacheFilePath = path.join(__dirname, "cache", `devices.json`);
  const devices = await loadCacheDevices() || []; 
  devices.push(device);
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

    await saveCacheTopPhones({ topPhonesByFansList, topPhonesByInterestList });

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
  // sebelum request ke api maka cari dulu di devices.json 
  const devices = await loadCacheDevices();
  const device = findDevice(devices, id);
  if (device) {
    return device;
  } else {
    try {
      const device = await gsmarena.catalog.getDevice(id);
      // jika sudah req ke api maka tambah ke cache nya
      device.id = id;
      await saveCacheDevice(device);
      return device;
    } catch (error) {
      return {
        message : error
      }
    }
  }

  
}


export const searchDevice = async (req, res) => {
  const name = req.params.name;
  console.log(name);
  try {
    const device = await gsmarena.search.search(name);
    res.json({
      message : 'success', 
      device
    })
  } catch (error) {
    console.log(error);
    res.json({
      message : error.message
    })
  }
}


