import { React, importImages, TouchableOpacity, useState, useEffect, StyleSheet, Text, StorageService, View, Header, Image, commonColors, TouchableWithoutFeedback, Fonts, Colors, deviceHeight, deviceWidth, ConstantsText, importIconsWhite, Modal, ImagePickerView, useTheme, SwitchView, BallIndicator, WebView } from '../../utils/importLibrary'
export default function CartScreen({ route, navigation }) {
  const { ColorName, colors, icons, setScheme } = useTheme();
  const [userData, setUserDate] = useState('')

  /** 
   * Life cycle method 
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      getUserDatils()
    });
  }, []);

  /**
   * getUserDetails function get details form storageStorage and set data 
   */
  const getUserDatils = async () => {
    const userdetails = await StorageService.getItem(StorageService.STORAGE_KEYS.USER_DETAILS);
    setUserDate(userdetails)
  }

  /**
  * Render Method
  */
  return (
    <View style={{ backgroundColor: colors.homebackground, flex: 1, justifyContent: 'space-between' }}>

      <WebView source={{ uri: 'https://www.giftscenter.com' }}></WebView>

    </View>
  );
}

/**
 * UI of card screen
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: commonColors.Blue,
    justifyContent: 'flex-end',
    flex: 1,
  },

  Subcontainer: {
    flex: 0.9,
    backgroundColor: commonColors.White,
    shadowColor: commonColors.Black,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 8,
    paddingTop: 40,
  },

  backButtonImage: {
    marginLeft: 30,
  },

  cardImageStyle: {
    marginTop: 50,
    width: deviceWidth - 115,
  },

  addToWalletStyle: {
    height: 28,
    marginTop: 50,
    borderWidth: 0.67,
    borderColor: commonColors.Blue,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 3
  },

  addToWalletText: {
    fontSize: 14,
    marginStart: 16,
    marginEnd: 16,
    color: commonColors.Blue,
    alignSelf: 'center',
    fontFamily: Fonts.montserratRegular
  },

  activeTextColor: {
    fontFamily: Fonts.montserratSemiBold,
    fontSize: 12,
    width: (deviceWidth - 20) / 2,
  },

  InactiveTextColor: {
    fontFamily: Fonts.montserratMedium,
    fontSize: 12,
  },

})