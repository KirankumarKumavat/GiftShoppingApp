import { DeviceInfo, Platform, Dimensions } from '../utils/importLibrary'

/**
 * exporting deviceHeight, deviceWidth, devicetype and stateusBarHeight
 */
export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
export const deviceType = Platform.OS === "ios" ? 2 : 1;
export const statusbarHeight = Platform.OS === "ios" ? DeviceInfo.hasNotch() ? 44 : 20 : 0;

/**
 * All Common Texts of App
 */
export const ConstantsText = {

   serverErrorMessage:'Server Error',
   noNetworkAlert:'No Internet Connection',
   requestTimeoutMessage:'request Timeout',
   netTitle:'Network',
   networkErrorMessage:'network Error',
   somethingWrongText:'Something went wrong..',
   logOutMessage:'Are you sure you want to logout?',
   appName:'Shine',

   welcome: 'Welcome',
   profile: 'Profile',
   booking: 'Booking',
   cart: 'Cart',
   openGallery: 'Open Gallery',
   openCamera: 'Open Camera',
   Cancel: 'Cancel',
}

export const ConstantsKey = {
   // ADD_TO_CART : 'ADD_TO_CART',

}