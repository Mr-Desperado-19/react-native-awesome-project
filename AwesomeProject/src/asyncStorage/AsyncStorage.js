import AsyncStorage from "@react-native-async-storage/async-storage";

let STORAGE_KEY = "isUserLogIN";

export const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    alert("Data successfully saved");
  }
};

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    alert("Failed to fetch the input from storage readData");
  }
};

export const removeData = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    console.log("Data successfully removed");
  } catch (e) {
    console.log("Failed to remove data from storage");
  }
};
