import { Platform } from '../utils/importLibrary'

/**
 * Error code found in app
 */
const errorCodes = {
   TIMEOUT: "111",
   INVALIDTOKEN: 403,
   NOTFOUNDCODE: 404,
   SERVERERRORCODE: 501,
   TOKENEXPIRECODE: 401,
   LOWER_APP_VERSION_CODE: '1.0.0'

}

/**
 * all url used in app
 */
const apiUrl = {
   SERVER_API_URL: "https://ikasco.com/Loyalty-App/api/", ////Live url
   // SERVER_API_URL: "http://192.168.1.124/giftclub/api/",
}

/**
 * web pages urls in app
 */
const webPageUrls = {
   refresh_token: "",
   privacyPolicyUrl: "https://getterms.io/view/zs7hx/privacy/en-us",
   termsAndConditionUrl: "https://getterms.io/view/zs7hx/tos/en-us",
}


const apiConfigs = {
   ...errorCodes,
   ...apiUrl,
   ...webPageUrls,
}

export default apiConfigs;