import { Icon, React, commonColors, Image } from '../utils/importLibrary';
const Path = "../assets/Images/";
import FlashMessage, { renderFlashMessageIcon } from "react-native-flash-message";

/**
 * Common Images
 */
export const importImages = {

   // Splash Screen Image and App Icon

   splashImg: require(`${Path}SplashIcon.png`),
   appIcon: require(`${Path}App-icon-1024.png`),

   HeaderLogo: require(`${Path}HeaderLogo.png`),
   Slogan: require(`${Path}Slogan.png`),


   // Tab Icons

   homeiconactive: require(`${Path}homeiconactive.png`),
   homeiconinactive: require(`${Path}homeiconinactive.png`),
   cardiconactive: require(`${Path}cardiconactive.png`),
   cardiconinactive: require(`${Path}cardiconinactive.png`),
   scannericonactive: require(`${Path}scan-active.png`),
   scannericoninactive: require(`${Path}scan.png`),
   carticonactive: require(`${Path}cart-active.png`),
   carticoninactive: require(`${Path}cart.png`),
   menuiconactive: require(`${Path}menuiconactive.png`),
   menuiconinactive: require(`${Path}menuiconinactive.png`),

   // SignUp Screen Images

   dateOfbirthImg: require(`${Path}dob-icon.png`),
   emailImg: require(`${Path}email-icon.png`),
   genderImg: require(`${Path}gender-icon.png`),
   mobileNumberImg: require(`${Path}mobile-icon.png`),
   nameImg: require(`${Path}name-icon.png`),
   passwordImg: require(`${Path}password-icon.png`),
   backImg: require(`${Path}blue_back-icon.png`),

   // Tab Screen Images

   whiteBackArrowImage: require(`${Path}white_back-icon.png`),
   blueBackArrowImage: require(`${Path}blue_back-icon.png`),
   cardImage: require(`${Path}card-blue.png`),
   myProfile: require(`${Path}my-profile-icon.png`),
   webProfile: require(`${Path}website-icon.png`),
   facebookImage: require(`${Path}fb-icon.png`),
   instaImage: require(`${Path}ig-icon.png`),
   aboutGigftImage: require(`${Path}info-icon.png`),
   barcode: require(`${Path}barcode-scan.png`),
   crossImage: require(`${Path}cross-icon.png`),

   closeicon: require(`${Path}close-icon.png`) 

}

/**
 * White Theme Images
 */
export const importIconsWhite = {
   BackImage: require(`${Path}white_back-icon.png`),
   // Card: require(`${Path}card-white.png`),
   Card: require(`${Path}card-blue.png`),

}

/**
 * Silver Theme Images
 */
export const importIconsSilver = {
   BackImage: require(`${Path}white_back-icon.png`),
   // Card: require(`${Path}card-grey.png`),
   Card: require(`${Path}card-blue.png`),
}

/**
 * Blue Theme Images
 */
export const importIconsBlue = {
   BackImage: require(`${Path}white_back-icon.png`),
   Card: require(`${Path}card-blue.png`),

}