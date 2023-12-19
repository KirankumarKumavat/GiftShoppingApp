import { React, Text, useState, useEffect, View, importImages, PhoneInput, StyleSheet, Header, TouchableOpacity, Image, Alert, Fonts, TextInput, commonColors, deviceWidth, Request, showSimpleAlert } from '../../utils/importLibrary';

function AuthSelection({ route, navigation }) {

  /** 
   * Life cycle method 
  */
  useEffect(() => {
  });

  /**
   * Navigate to next screen basis of value
   */
  const callingNevigation = (value) => {
    navigation.navigate('LoginScreen', { isAuth: value })
  }

  /**
   * Render Method
   */
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.18, justifyContent: 'center' }}>
        <Header
          leftBtnOnPress={null}
          style={{ backgroundColor: commonColors.Blue, justifyContent: 'center' }}
          HeaderLogoImage={importImages.HeaderLogo}
        // headerTitle={'Shine'}
        // titleStyle={styles.fontStyle}
        />
      </View>

      <View style={styles.Subcontainer}>
        <View style={{alignSelf:'flex-start',marginStart:23}} >
          <Image source={importImages.Slogan} style={{}} ></Image>
        </View>
        <View style={{ }} >
          <View style={styles.textView}>
            <Text style={styles.fontLogin}>{'LOGIN'}</Text>
          </View>
          <TouchableOpacity
            style={styles.mobileStyle}
            onPress={() => callingNevigation(1)}
          >
            <Text style={styles.fontMobile}>{'MOBILE NUMBER'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.emailStyle}
            onPress={() => callingNevigation(2)}
          >
            <Text style={styles.fontEmail}>{'EMAIL'}</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
          style={styles.emailStyle}
          onPress={() => navigation.navigate('QrCodeScreen')}
        >
          <Text style={styles.fontEmail}>{'QR-CODE'}</Text>
        </TouchableOpacity> */}

          {/* <TouchableOpacity
          style={styles.linkStyle}
          onPress={() => navigation.navigate('AboutScreen', { value: "https://www.giftscenter.com", name: 'GIFTS CENTER' })}>
          <Text style={styles.Linktext}>{"WWW.GIFTSCENTER.COM"}</Text>
        </TouchableOpacity> */}
        </View>
        </View>
    </View>
  );
}

/**
 * UI of Auth screen
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
    // justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    justifyContent:'space-evenly'
  },
  container: {
    backgroundColor: commonColors.Blue,
    justifyContent: 'space-between',
    flex: 1,
  },

  fontStyle: {
    alignSelf: 'center',
    fontSize: 27,
    fontFamily: Fonts.montserratBold,
    color: commonColors.Blue,
  },

  mobileStyle: {
    height: 50,
    width: deviceWidth - 46,
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonColors.Blue,
  },

  fontMobile: {
    color: commonColors.White,
    fontSize: 14,
    fontFamily: Fonts.montserratMedium
  },

  fontLogin: {
    color: commonColors.Blue,
    fontSize: 18,
    fontFamily: Fonts.montserratBold,
  },

  textView: {
    borderColor: commonColors.Grey,
    // borderBottomWidth: 1,
    marginVertical: 20,
    alignSelf:'center'
  },

  emailStyle: {
    height: 50,
    borderWidth: 1,
    marginTop: 15,
    borderRadius: 5,
    borderColor: commonColors.Blue,
    width: deviceWidth - 46,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fontEmail: {
    fontFamily: Fonts.montserratMedium,
    color: commonColors.Blue,
    fontSize: 14,
  },

  linkStyle: {
    position: 'absolute',
    bottom: 30
  },

  Linktext: {
    fontSize: 14,
    fontFamily: Fonts.montserratMedium,
    color: commonColors.Blue,
  },
})

export default AuthSelection


