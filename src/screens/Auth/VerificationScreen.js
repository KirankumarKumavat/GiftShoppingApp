
import { React, CountDown, useState, SmsRetriever, AppState, useEffect, Platform, deviceType, useRef, Keyboard, Alert, showSimpleAlert, importImages, StyleSheet, Text, OTPInputView, TextInput, View, Header, Image, TouchableWithoutFeedback, TouchableOpacity, Fonts, commonColors, deviceHeight, deviceWidth, ConstantsText, importIconsWhite, Modal, ImagePickerView, useTheme, SwitchView, BallIndicator, WebView, Dimensions, Request, CommonActions, StorageService, Clipboard, I18nManager } from '../../utils/importLibrary'

export default function VerificationScreen({ route, navigation }) {
  const { ColorName, colors, icons, setScheme } = useTheme();
  const [otpCode, setOTPCode] = useState('');
  const [seconds, setSeconds] = useState(59);
  const [isModalVisible, setModalVisible] = useState(false);
  const params = route.params
  const [iscallSMS, setiscallSMS] = useState(true);

  /** 
   * Lifecycle method 
   */
  const counter = useRef()
  useEffect(() => {
    if (Platform.OS == 'android' && params.value.type == 'phone') {
      if (iscallSMS) {
        onSmsListenerPressed()
        setiscallSMS(false)
      }
    }
  }, [seconds]);

  /**
   * Autofill otp function
   */
  const onSmsListenerPressed = async () => {
    try {
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener(_onReceiveSms);
      }
    } catch (error) {
    }
  };

  const _onReceiveSms = (event) => {
    if (event.message) {
      const msg = getOTP(event.message)
      setOTPCode(msg)
      verificationApiCalling(msg)
    }
    SmsRetriever.removeSmsListener();
  };

  let getOTP = (str) => {
    let match = str.match(/\b\d{6}\b/)
    return match && match[0]
  }

  /** 
   * Api Intigration 
   */
  const verificationApiCalling = async (code) => {
    setModalVisible(true)
    let para = params.value.type == 'phone' ? {
      otp: code,
      device_id: await Request.getDeviceToken(),
      device_type: deviceType,
      phone: params.value.phone,
      phone_code: params.value.phone_code
    }
      :
      {
        otp: code,
        device_id: await Request.getDeviceToken(),
        device_type: deviceType,
        email: params.value.email,
      }
    let response = await Request.post('login.php', para)
    setModalVisible(false)
    if (response.success === true) {
      Request.setToken(response.data.auth_token)
      if (response.data.is_profile_completed == 0) {
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: "SignUpScreen", params: { values: para } }]
        });
        navigation.dispatch(resetAction);
      }
      else {
        await StorageService.saveItem(StorageService.STORAGE_KEYS.USER_DETAILS, response.data)
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: "TabNavigator" }]
        });
        navigation.dispatch(resetAction);
      }
    }
    else {
      if (response) {
        showSimpleAlert(response.message)
      }
    }
  }

  /**
   * Resend otp api intigration
   */
  const ResendOTP_API = async () => {
    Clipboard.setString('')
    setSeconds(59)
    setModalVisible(true)
    let param = params.value.type == 'phone' ? {
      phone: params.value.phone,
      phone_code: params.value.phone_code,
      device_type: deviceType,
      device_id: await Request.getDeviceToken()
    }
      :
      {
        email: params.value.email,
        device_type: deviceType,
        device_id: await Request.getDeviceToken()
      }
    let response = await Request.post('send-otp.php', param)
    setModalVisible(false)
    counter.current.setState({ until: 59 })
    if (response.success == true) {
    }
    else {
      if (response) {
        showSimpleAlert(response.message)
      }
    }
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
      <View style={styles.container}>
        <Text style={styles.enterCodeTextStyle}>{'enter your code'}</Text>
        {params.value.phone ?
          <Text style={styles.detailTextStyle}>{'You will receive an SMS with a verification code on ' + params.value.phone}
          </Text>
          :
          <Text style={styles.detailTextStyle}>{'You will recieve an email with a verification code.'}</Text>
        }
        <OTPInputView
          style={styles.otpInputViewStyle}
          editable={true}
          pinCount={6}
          code={otpCode}
          onCodeChanged={code => setOTPCode(code)}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={(code => {
            Clipboard.setString('')
            verificationApiCalling(code)
          })}
        />

        <View style={{ alignItems: 'center' }}>
          {params.value.phone ?
            <Text style={styles.detailTextStyle}>{"Didn't receive a code?"}
            </Text>
            :
            <Text style={styles.detailTextStyle}>{"Didn't receive a code?"}</Text>
          }
          <TouchableOpacity
            disabled={seconds > 1 ? true : false}
            onPress={() => ResendOTP_API()}
          >
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.resendBtnStyle}>{'Resend code '}</Text>
              <CountDown
                ref={counter}
                size={16}
                until={59}
                onFinish={() => setSeconds('')}
                digitStyle={{ backgroundColor: '#FFF', width: 'auto', height: 'auto' }}
                digitTxtStyle={[styles.resendBtnStyle, { fontWeight: '500' }]}
                separatorStyle={[styles.resendBtnStyle, { fontWeight: '500' }]}
                timeToShow={seconds != '' ? ['M', 'S'] : []}
                timeLabels={{ m: null, s: null }}
                showSeparator
                running={true}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {isModalVisible &&
        <BallIndicator visible={isModalVisible} />
      }
    </View>

  );
}

/**
 * UI of verification screen
 */
const styles = StyleSheet.create({

  container: {
    flex: 0.9,
    backgroundColor: commonColors.White,
    shadowColor: commonColors.Black,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 8
  },

  enterCodeTextStyle: {
    marginTop: 60,
    marginLeft: 40,
    fontFamily: Fonts.montserratMedium,
    color: commonColors.Blue,
    fontSize: 18,
    textTransform: 'uppercase'
  },

  detailTextStyle: {
    marginTop: 10,
    marginHorizontal: 40,
    fontFamily: Fonts.montserratMedium,
    color: commonColors.Blue,
    fontSize: 14,
  },

  editNumberTextStyle: {
    textTransform: 'capitalize',
    color: commonColors.DarkGrey,
    fontFamily: Fonts.montserratMedium,
  },

  otpInputViewStyle: {
    height: 50,
    width: deviceWidth - 80,
    alignSelf: 'center',
    marginVertical: 40
  },

  underlineStyleBase: {
    width: 45,
    borderWidth: 0,
    borderBottomWidth: 0.4,
    color: commonColors.Blue,
    fontFamily: Fonts.montserratMedium,
    fontSize: 32,
    borderColor: commonColors.Grey,
    height: 60
  },

  underlineStyleHighLighted: {
    borderColor: commonColors.Blue,
  },

  resendBtnStyle: {
    color: commonColors.Blue,
    fontFamily: Fonts.montserratMedium,
    fontSize: 16,
    marginTop: 20
  }
})

