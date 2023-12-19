import { React, Text, useState, useRef, useEffect, View, importImages, BallIndicator, PhoneInput, Header, StyleSheet, TouchableOpacity, Image, Keyboard, Alert, Fonts, TextInput, KeyboardAwareScrollView, commonColors, deviceWidth, Request, showSimpleAlert, StorageService, deviceType, Platform, Clipboard, I18nManager } from '../../utils/importLibrary';

export default function LoginScreen({ route, navigation }) {
  /** state */
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [country, setCountry] = useState('962');
  const [email, setEmail] = useState('');
  const { isAuth } = route.params
  //const [number,setNumber] = useState();
  const phoneInput = useRef();

  /** 
   * Life cycle method 
  */
  useEffect(() => {

  });

  /**
   * Validation and API calling 
  */
  const submitButtonValidation = () => {
    const ConfirmValid = validationofField();
    if (ConfirmValid) {
      Keyboard.dismiss()
      SendOTP_API(isAuth)
    }
  }

  /** 
   * Validation of field 
   */
  const validationofField = () => {
    var number = phoneNumber
    var numbernewvalues = number.slice(0, 1)
    if (phoneNumber == '' && isAuth == 1) {
      showSimpleAlert('Please enter phone number')
      return false;
    }
    else if (country === '962' && numbernewvalues != 7 && isAuth == 1) {
      showSimpleAlert('Please enter valid phone number')
      return false;
    }
    else if (country === '962' && phoneNumber.length != 9 && isAuth == 1) {
      showSimpleAlert('Please enter valid phone number')
      return false;
    }
    else if ((phoneNumber.length < 4 || phoneNumber.length > 13) && country != '962' && isAuth == 1) {
      showSimpleAlert('Please enter valid phone number')
      return false;
    }
    else if (email == '' && isAuth == 2) {
      showSimpleAlert('Please enter email')
    }
    else {
      return true;
    }
  }

  /** 
  * Api Intigration
  * @param {*} phoneNumber 
  * @param {*} phoneCode
  * @param {*} deviceType
  * @param {*} deviceId
  * @param {*} email
  */
  const SendOTP_API = async (isAuth) => {

    let params = isAuth == 1 ? {
      phone: phoneNumber,
      phone_code: country,
      device_type: deviceType,
      device_id: await Request.getDeviceToken()
    }
      :
      {
        email: email,
        device_type: deviceType,
        device_id: await Request.getDeviceToken()
      }
    setModalVisible(true)
    let response = await Request.post('send-otp.php', params)
    setModalVisible(false)
    if (response.success == true) {
      Clipboard.setString('')
      let item = { type: isAuth == 1 ? 'phone' : 'email', phone: phoneNumber, phone_code: country, email: email }
      navigation.navigate('VerificationScreen', { value: item })
    }
    else {
      if (response) {
        showSimpleAlert(response.message)

      }
    }
  }

  /**
   * addcountrycode function set country calling code
   * @param {*} values 
   */
  const addcountrycode = (values) => {
    phoneInput.current.setState({ number: '' })
    setCountry(values)
    setPhoneNumber('')
  }

  /** 
   * Render Method 
  */
  return (
    <View style={{ backgroundColor: commonColors.White, flex: 1, justifyContent: 'space-between' }}>
     
      <Header
        leftBtnOnPress={() => navigation.goBack()}
        leftBtn={<Image source={importImages.backImg}></Image>}
        style={{ backgroundColor: commonColors.White }}
      />

      <View style={styles.Subcontainer}>
        <Text style={styles.enterMobileNumberText}>{isAuth == 1 ? 'ENTER YOUR MOBILE NUMBER' : 'ENTER YOUR EMAIL'}</Text>
        <Text style={styles.numberLoginAccountsText}>
          {isAuth == 1 ? 'Enter your mobile number to create an account or log in' : 'Enter your email to create an account or log in'}
        </Text>

        {isAuth == 1 ?
          <View style={styles.inputNumber}>
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNumber}
              defaultCode="JO"
              layout="first"
              autoFocus
              value={phoneNumber}
              placeholder={country === '962' ? '7XXXXXXXX' : 'XXXXXX'}
              textInputProps={{
                keyboardType: 'phone-pad', maxLength: country === '962' ? 9 : 13,
                placeholderTextColor: commonColors.Grey,
                style: {
                  fontSize: 16,
                  fontFamily: Fonts.montserratRegular,
                  color: commonColors.Blue,
                  width: deviceWidth / 2,
                }
              }}
              textContainerStyle={{
                backgroundColor: 'white', fontSize: 16,
                fontFamily: Fonts.montserratRegular,
                color: commonColors.Blue,
              }}
              countryPickerButtonStyle={{ marginStart: -15, marginEnd: -10, }}
              codeTextStyle={{
                marginStart: -12, fontSize: 16,
                fontFamily: Fonts.montserratRegular,
                color: commonColors.Blue,
              }}
              filterProps={{
                fontSize: 16,
                placeholderTextColor: commonColors.Grey,
                fontFamily: Fonts.montserratRegular,
                color: commonColors.Blue,
              }}
              containerStyle={styles.phoneinputStyle}
              onChangeCountry={(country) => addcountrycode(country.callingCode[0])}
              onChangeText={(phoneNumber) => {
                setPhoneNumber(phoneNumber);
              }}
            />
          </View>
          :
          <View style={styles.emailInputStyle}>
            <Text style={styles.emailText} >Email</Text>
            <TextInput
              style={styles.emailIdText}
              // placeholder="info@giftscenter.com"
              // placeholderTextColor={commonColors.Grey}
              keyboardType='email-address'
              value={email}
              autoCapitalize='none'
              onChangeText={(value) => setEmail(value)}
            />
          </View>
        }
        <TouchableOpacity style={styles.ButtonStyle}
          onPress={() => submitButtonValidation()}
        >
          <Text style={styles.continueText}>CONTINUE</Text>
        </TouchableOpacity>
      </View>
      {isModalVisible &&
        <BallIndicator visible={isModalVisible} />
      }
    </View>
  );
}

/**
 * UI of Login Screen
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
    elevation: 8
  },

  container: {
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: commonColors.White
  },

  enterMobileNumberText: {
    marginTop: 40,
    color: commonColors.Blue,
    fontSize: 18,
    marginLeft: 37,
    fontFamily: Fonts.montserratMedium
  },

  numberLoginAccountsText: {
    marginTop: 5,
    color: commonColors.Blue,
    marginHorizontal: 37,
    fontSize: 14,
    fontFamily: Fonts.montserratMedium
  },

  ButtonStyle: {
    height: 50,
    borderWidth: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: commonColors.Blue,
    width: deviceWidth - 70,
    backgroundColor: commonColors.Blue,
    marginTop: 50
  },

  continueText: {
    fontSize: 17,
    fontFamily: Fonts.montserratMedium,
    color: commonColors.White,
  },

  inputNumber: {
    marginTop: 39,
    alignSelf: 'center',
  },

  phoneinputStyle: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: commonColors.Grey,
  },

  emailInputStyle: {
    marginTop: 39,
    alignSelf: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    width: deviceWidth - 100,
    borderColor: commonColors.Grey,
    paddingBottom: 13,
    alignItems: 'center',
  },

  emailText: {
    color: commonColors.Blue,
    fontSize: 17,
    fontFamily: Fonts.montserratRegular,
  },

  emailIdText: {
    marginLeft: 10,
    fontSize: 17,
    width: (deviceWidth + 50) / 2,
    fontSize: 16,
    fontFamily: Fonts.montserratRegular,
    color: commonColors.Blue,
  }
})

