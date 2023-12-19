import {
  React, RNQRGenerator, importImages, TouchableOpacity, useState, useEffect, StyleSheet, Text, View,
  Header, Image, commonColors, TouchableWithoutFeedback, Fonts, Colors, deviceHeight,
  deviceWidth, ConstantsText, importIconsWhite, Modal, ImagePickerView, useTheme, SwitchView,
  StorageService,
  BallIndicator,
  TextInput
} from '../../utils/importLibrary'

export default function ScannerScreen({ route, navigation }) {

  const { ColorName, colors, icons, setScheme } = useTheme();
  const [QRCODEImg, setQRImage] = useState();

  /**
   * Life cycle method 
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
      GeneratQRCODE()
    });
  }, []);

  /**
   * GeneratQRCODE function generates qrcode using userdetails
   */
  const GeneratQRCODE = async () => {
    const userdetails = await StorageService.getItem(StorageService.STORAGE_KEYS.USER_DETAILS);
    if (userdetails) {
      RNQRGenerator.generate({
        value: userdetails.customer_id,
        height: 260,
        width: 260,
        color: commonColors.Blue
      })
        .then(response => {
          setQRImage(response.uri)
        })
        .catch(error => console.log('Cannot create QR code', error));
    }
  }

  /**
   * Render Method
   */
  return (
    <View style={{ backgroundColor: colors.homebackground, flex: 1, justifyContent: 'space-between' }}>

      <View style={{ flex: 0.18, justifyContent: 'center' }}>
        <Header
          leftBtnOnPress={null}
          style={{ backgroundColor: colors.homebackground }}
          headerTitle={'QR-CODE'}
          titleStyle={{
            color: colors.homeTextbackground,
            fontSize: 24,
            marginLeft: 40,
            alignSelf: 'flex-start',
            fontFamily: Fonts.montserratMedium,
          }}
        />
      </View>
      <View style={styles.Subcontainer}>
        <View style={styles.barCodeImageStyle}>
          <Image source={importImages.barcode} ></Image>
          <Image source={{ uri: QRCODEImg }} style={{ height: 250, width: 250, position: 'absolute', backgroundColor: 'white' }} ></Image>
        </View>
      </View>
    </View>
  );
}

/**
 * UI of Scanner Screen
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: commonColors.Blue,
    justifyContent: 'flex-end',
    flex: 1,
  },

  Subcontainer: {
    flex: 0.8,
    backgroundColor: commonColors.White,
    shadowColor: commonColors.Black,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },

  qrCodeStyle: {
    color: commonColors.Blue,
    fontSize: 24,
    marginLeft: 40,
    alignSelf: 'flex-start',
    fontFamily: Fonts.montserratMedium,
  },

  barCodeImageStyle: {
    alignItems: 'center',
    justifyContent: 'center'

  },

  barCodeImageStyle1: {
    position: 'absolute'

  },
})