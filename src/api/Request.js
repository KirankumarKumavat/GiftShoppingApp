import { Platform, DeviceInfo, NetInfo, Alert, CommonActions, StorageService, NavigationService, ConstantsText, apiConfigs, showSimpleAlert } from '../utils/importLibrary'

/**
 * Header for Api calls
 */
const getHeaders = async () => ({
   'Accept': '*/*',
   'Content-Type': 'application/json',
   'device-type': Platform.OS === 'android' ? '1' : '2',
   'android-app-version': DeviceInfo.getVersion(),
   'ios-app-version': DeviceInfo.getVersion(),

});

const getHeaders2 = async () => ({
   'Accept': '*/*',
   'Content-Type': 'application/json',
   'Authorization': "Bearer " + await getToken(),
   'device-type': Platform.OS === 'android' ? '1' : '2',
   'android-app-version': DeviceInfo.getVersion(),
   'ios-app-version': DeviceInfo.getVersion(),   
});
const getHeaders3 = async () => ({
   'Accept': '*/*',
   'Content-Type': 'multipart/form-data',
   'Authorization': "Bearer " + await getToken(),
   'device-type': Platform.OS === 'android' ? '1' : '2',
   'android-app-version': DeviceInfo.getVersion(),
   'ios-app-version': DeviceInfo.getVersion(),
});

/**Gets the User Auth token */
export const getToken = async () => {
   const authToken = await StorageService.getItem(StorageService.STORAGE_KEYS.AUTH_TOKEN);
   console.log('authToken -->', authToken);
   if (authToken) {
      return authToken;
   }
   else {
      return 'abc';
      // default_auth_token
   }
}

/**Sets the User Auth token */
const setToken = async (token) => {
   console.log('token-->', token);
   return await StorageService.saveItem(StorageService.STORAGE_KEYS.AUTH_TOKEN, token)
}

/**Set the device token */
const setDeviceToken = async (token) => {
   return await StorageService.saveItem(StorageService.STORAGE_KEYS.DEVICE_TOKEN, token)
}

/**Get the device token */
const getDeviceToken = async () => {
   const deviceToken = await StorageService.getItem(StorageService.STORAGE_KEYS.DEVICE_TOKEN);
   return deviceToken;
}

/**
 * Check Internet Connectivity Status
 */
export const checkNetInfo = async () => {
   const state = await NetInfo.fetch();
   return state.isConnected;
}

/**
 * 
 * @param {*} promise 
 * Time Out method 
 */
const timeOut = (promise) => {
   return new Promise((resolve, reject) => {
      const timerId = setTimeout(() => {
         reject({
            message: 'timeoutMessage',
            status: apiConfigs.TIMEOUT,
            timerId,
         });
      }, 120 * 1000);
      promise.then(resolve, reject);
   });
}

/**action for update user auth token */
const updateAuthToken = async (endpoint, params) => {
   let userID = await StorageService.getItem(StorageService.STORAGE_KEYS.USER_DETAILS)
   let param = { userId: userID.id }
   const result = await Request.post('refresh-token.php', param);

   await setToken(result.data.auth_token);
   return await buildRequest(endpoint, params);
}

/**
 * 
 * @param {*} endpoint 
 * @param {*} params 
 * @param {*} options 
 * Application related  Api request will be perform(Call) from here
 */
const buildRequest = async (endpoint, params = {}, options = undefined) => {
   if (await checkNetInfo() != false) {

      try {
         const headers = endpoint === "send-otp.php" || endpoint === "login.php" ? await getHeaders() : endpoint === "update-profile.php" ? await getHeaders3() : await getHeaders2();
         console.log("headers->", headers);
         console.log("%c REQUEST::", 'background: #222; color: #bada55', { url: `${apiConfigs.SERVER_API_URL}${endpoint}`, ...params })
         const response = await timeOut(fetch(`${apiConfigs.SERVER_API_URL}${endpoint}`, {
            headers,
            ...params,
         }));
         console.log("%c RESPONSE22::", 'background: gray; color: white', response);
         const result = await response.json();
         console.log('result---->', result);
         return checkValidatinoResponse(result, endpoint, params);

      } catch (error) {
         console.log("Error----->", error);
         if (error) {
            if (error.status == apiConfigs.TIMEOUT) {
               showSimpleAlert(ConstantsText.requestTimeoutMessage);
               clearTimeout(error.timerId);
               return false;
            }
            else {
               /**
                * Handle Unexpected errors
                */
               showSimpleAlert(ConstantsText.somethingWrongText);
               return false;
            }
         }
      }
   }
   else {
      showSimpleAlert(ConstantsText.noNetworkAlert)

   }


};

/**
* Fires only when an api caught the lower apllication version.
* @returns {Promise<{status:string,message:null}>}
*/
const handleLowerAppVersion = async (message) => {
   return new Promise((resolve, reject) => {
      Alert.alert(
         ConstantsText.appName,
         message,
         [{
            text: 'Ok',
            onPress: async () => {
               await StorageService.clear();

            },
         }],
         { cancelable: false },
      );
      resolve(false);
   });
};


/**
 * 
 * @param {*} response 
 * check validation of response return values
 */
const checkValidatinoResponse = async (response, endpoint, params) => {
   const result = response

   /**
     * 500 Server Error 
     */
   if (result.status == apiConfigs.SERVERERRORCODE) {
      showSimpleAlert(ConstantsText.serverErrorMessage)
      return false;
   }

   /**
   * 404 Not Found Error
   */
   if (result.status == apiConfigs.NOTFOUNDCODE) {
      if (result.code == 0 && result.message) {
         showSimpleAlert(result.message)
      }
   }

   /**
    * 102 Token Expire Error
    */
   if (result.status === apiConfigs.TOKENEXPIRECODE) {
      return await updateAuthToken(endpoint, params)
   }
   
   /** 
    * 403 Token Invalid Error
    */
   if (result.status === apiConfigs.INVALIDTOKEN  ) {
      return await Logout()
   }

   /**
    * Handle lower app version for Update App.
    */
   if (result.status === apiConfigs.LOWER_APP_VERSION_CODE) {
      return await handleLowerAppVersion(result.message);
   }

   return result;
}

/**
 * 
 * @param {*} endpoint 
 * @param {*} params 
 * @param {*} options 
 * GET method related api calls Start from here
 */
const get = async (endpoint, params) => (buildRequest(
   endpoint,
   {
      method: 'GET',
   },
))

/**
 * 
 * @param {*} endpoint 
 * @param {*} params 
 * @param {*} options 
 * POST method related api calls Start from here
 */
const post = async (endpoint, params) => (
   buildRequest(
      endpoint,
      {
         method: 'POST',
         body: endpoint != "update-profile.php" ? params && JSON.stringify(params) : params,
      }
   )
);

/**
 * 
 * @param {*} endpoint 
 * @param {*} params 
 * @param {*} options 
 * PUT method related api calls Start from here
 */
const put = (endpoint, params, options = undefined) =>
   buildRequest(
      endpoint,
      {
         method: 'PUT',
         body: params && JSON.stringify(params),
      },
      options,
   );

/**
 * 
 * @param {*} endpoint 
 * @param {*} params 
 * @param {*} options 
 * DELETE method related api calls Start from here
 */
const deleteRequest = (endpoint, params = {}, options = undefined) =>
   buildRequest(
      endpoint,
      {
         method: 'DELETE',
         body: params,
      },
      options,
   );
   
/**
 * Logout function clear StorageService and navigate back to Auth screen
 */
const Logout = async () => {
   await StorageService.clear()
   NavigationService.resetAction('AuthSelection')

}
/**
 * api call module
 */
const Request = {
   get,
   post,
   put,
   delete: deleteRequest,
   getToken,
   setToken,
   setDeviceToken,
   getDeviceToken,
};

export { getHeaders, getHeaders2 };

export default Request;