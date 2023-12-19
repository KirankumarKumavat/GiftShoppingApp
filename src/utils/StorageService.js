import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Storage Service class for storing values in local device storage
 */

/**Different Storage keys */
const STORAGE_KEYS = {
   TOKENS: 'TOKENS',
   USER_DETAILS: 'USER_DETAILS',
   AUTH_TOKEN: "AUTH_TOKEN",
   DEVICE_TOKEN: 'DEVICE_TOKEN'
};

/**
 * 
 * @param {*} key 
 * @returns get value from local storage
 */
async function getItem(key) {
   try {
      const i = await AsyncStorage.getItem(key);
      return JSON.parse(i);
   } catch (e) {
      return console.log(e.message, e);
   }
}

/**
 * 
 * @returns get multiple value from local storage
 */
async function getItems() {
   const keys = await AsyncStorage.getAllKeys();
   const stores = await AsyncStorage.multiGet(keys);
   var r = stores.map((result, i, store) => {
      return JSON.parse(store[i][1]);
   });
}

/**
 * 
 * @returns clear all values from local storage
 */
function clear() {
   const keys = [STORAGE_KEYS.AUTH_TOKEN, STORAGE_KEYS.USER_DETAILS];
   return AsyncStorage.multiRemove(keys);
}

/**
 * 
 * @param {*} key 
 * @returns delete values from local storage
 */
function deleteItem(key) {
   return AsyncStorage.removeItem(key);
}

/**
 * 
 * @param {*} key 
 * @param {*} item 
 * @returns save values to local storage
 */
async function saveItem(key, item) {
   const value_1 = await AsyncStorage
      .setItem(key, JSON.stringify(item));
   return value_1;
}

export default {
   STORAGE_KEYS,
   getItem,
   getItems,
   clear,
   deleteItem,
   saveItem,
};