import {
  React, Text, useState, useEffect, View, importImages, PhoneInput, StyleSheet, useRef,
  TouchableOpacity, Image, Alert, Fonts, TextInput, commonColors, deviceWidth, Request,
  deviceType, ConstantsText,
  showSimpleAlert, Header, useTheme, QRCodeScanner, RNCamera, CommonActions, StorageService, BallIndicator
} from '../../utils/importLibrary';

export default function QrCodeScreen({ route, navigation }) {

  const { ColorName, colors, icons, setScheme } = useTheme();
  const scanner = useRef(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isreactive, setReactvie] = useState(false);

  /** 
   * Life cycle method 
   */
  useEffect(() => {
  });

  /**
   * Api Intigration
   * @param {*} qrcodeData
   * @param {*} deviceId
   * @param {*} deviceType
   */
  const onSuccess = async (e) => {
    setModalVisible(true)

    let para = {
      qr_code: e.data,
      device_id: await Request.getDeviceToken(),
      device_type: deviceType,
    }
    let response = await Request.post('login.php', para)
    setModalVisible(false)
    setReactvie(false)
    if (response.success === true) {
      await StorageService.saveItem(StorageService.STORAGE_KEYS.USER_DETAILS, response.data)
      Request.setToken(response.data.auth_token)
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: "TabNavigator" }]
      });
      navigation.dispatch(resetAction);
    }
    else {
      if (response) {
        setReactvie(true)
        Alert.alert(
          ConstantsText.appName,
          response.message,
          [
            { text: "OK", onPress: () => { scan() } }
          ],
          { cancelable: false }
        );
      }
    }
  };

  const scan = () => {
    scanner.current.reactivate()
    setModalVisible(false)
  }

  /** 
   * Render Method 
   */
  return (
    <View style={{ backgroundColor: commonColors.White, flex: 1, width: '100%', }}>
      <QRCodeScanner
        onRead={onSuccess}
        showMarker={true}
        reactivateTimeout={90000}
        fadeIn={false}
        reactivate={isreactive}
        ref={scanner}
        markerStyle={{ left: 0 }}
        customMarker={<Image source={importImages.barcode} style={styles.barCodeImageStyle}></Image>}
        topContent={
          <View style={{ flex: 1, width: '100%', }}>
            <Header
              leftBtnOnPress={() => navigation.goBack()}
              leftBtn={<Image source={importImages.blueBackArrowImage}></Image>}
              style={{ backgroundColor: commonColors.White, justifyContent: 'center' }}
              headerTitle={'QR Code'}
              titleStyle={styles.fontStyle}
            />
          </View>}
      ></QRCodeScanner>
      {isModalVisible &&
        <BallIndicator visible={isModalVisible} />
      }
    </View>
  );
}

/**
 * UI of QRCodeScanner Screen
 */
const styles = StyleSheet.create({
  Subcontainer: {
    flex: 0.9,
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

  QrCodeTextStyle: {
    color: commonColors.Blue,
    fontFamily: Fonts.montserratMedium,
    fontSize: 24,
    marginLeft: 25
  },

  container: {
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: commonColors.White,
  },

  barCodeImageStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  fontStyle: {
    alignSelf: 'center',
    fontSize: 27,
    fontFamily: Fonts.montserratBold,
    color: commonColors.Blue,
  },
})