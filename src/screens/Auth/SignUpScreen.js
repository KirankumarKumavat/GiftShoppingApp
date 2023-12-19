
import { React, PhoneInput, useState, deviceType, CommonActions, useEffect, isValidEmail, StorageService, useRef, moment, importImages, DatePicker, KeyboardAwareFlatList, FlatList, Alert, StyleSheet, Text, OTPInputView, TextInput, View, Header, Image, TouchableWithoutFeedback, TouchableOpacity, Fonts, commonColors, deviceHeight, deviceWidth, ConstantsText, importIconsWhite, Modal, ImagePickerView, useTheme, SwitchView, BallIndicator, WebView, Dimensions, ProgressBar, Request, showSimpleAlert, Keyboard } from '../../utils/importLibrary'

export default function SignUpScreen({ route, navigation }) {
  const { ColorName, colors, icons, setScheme } = useTheme();
  const [customerName, setCustomerName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [country, setCountry] = useState('962');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [isModalVisibleGender, setModalVisibleGender] = useState(false)
  const [isModalVisibleDOB, setModalVisibleDOB] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false)
  const [radioButton, setRadioButton] = useState('')
  const [date, setDate] = useState(new Date())
  const params = route.params
  const phoneInput = useRef();

  /** 
   * Life cycle method 
   */
  useEffect(() => {
    if (params.values.phone) {
      setPhoneNumber(params.values.phone)
      setCountry(params.values.phone_code)
    }
    if (params.values.email) {
      setEmail(params.values.email)
    }
  }, []);

  /** 
   * Validation and API calling 
   */
  const submitButtonValidation = () => {
    const ConfirmValid = validationOfField();
    if (ConfirmValid) {
      SignUpOTP_API()
    }
  }

  /** 
   * Validation of field 
   */
  const validationOfField = () => {
    const checkEmail = isValidEmail(email)
    var number = phoneNumber
    var numbernewvalues = number.slice(0, 1)
    if (customerName == '') {
      showSimpleAlert('Please enter customer name')
      return false;
    }
    else if (phoneNumber == '') {
      showSimpleAlert('Please enter mobile number')
      return false;
    }
    else if (country === '962' && numbernewvalues != 7) {
      showSimpleAlert('Please enter valid mobile number')
      return false;
    }
    else if (country === '962' && phoneNumber.length != 9) {
      showSimpleAlert('Please enter valid mobile number')
      return false;
    }
    else if ((phoneNumber.length < 4 || phoneNumber.length > 13) && country != '962') {
      showSimpleAlert('Please enter valid mobile number')
      return false;
    }
    else if (email == '') {
      showSimpleAlert('Please enter email')
      return false;
    }
    else if (!checkEmail) {
      showSimpleAlert('Please enter valid email')
      return false;
    }
    else if (password == '') {
      showSimpleAlert('Please enter password')
      return false;
    }
    else {
      return true;
    }
  }

  /** 
   * Api Intigration 
   */
  const SignUpOTP_API = async () => {
    setModalVisible(true)
    let para = {
      customer_name: customerName,
      phone: phoneNumber,
      email: email,
      password: password,
      gender: gender,
      dob: dateOfBirth,
      phone_code: country,
      device_type: deviceType,
      device_id: await Request.getDeviceToken()
    }
    let response = await Request.post('sign-up.php', para)
    setModalVisible(false)
    if (response.success == true) {
      Request.setToken(response.data.auth_token)
      await StorageService.saveItem(StorageService.STORAGE_KEYS.USER_DETAILS, response.data)
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: "TabNavigator" }]
      });
      navigation.dispatch(resetAction);
    }
    else {
      if (response) {
        showSimpleAlert(response.message)
      }
    }
  }

  /**
   * DOB function set date of birth and close modal
   */
  const DOB = () => {
    setDateOfBirth(date)
    setModalVisibleDOB(false)
  }

  /**
   * actionClick function set gender and close modal
   */
  const actionclick = () => {
    setModalVisibleGender(!isModalVisibleGender)
    setGender('Male' == radioButton ? 'Male' : 'Female')
  }

  /**
   * addcountrycode function set country calling code
   */
  const addcountrycode = (values) => {
    phoneInput.current.setState({ number: '' })
    setCountry(values)
    setPhoneNumber('')
  }

  /**
   * Flatlist remder item
   */
  const signUpList1 = ({ item, index }) => {
    return (
      <View style={styles.listViewStyle}>
        <View style={styles.iconsStyle}>
          <View style={styles.subListViewStyle}>
            <View style={styles.imageView}>
              <Image source={importImages.nameImg} ></Image>
            </View>
            <View style={styles.subListViewStylemain}>
              <View style={styles.subListViewStyle1}>
                <Text style={styles.detailHeadingTextStyle}>{'Customer name'}</Text>
                <Text style={styles.asteriskStyle}>{' *'}</Text>
              </View>
              <TextInput
                onChangeText={(name) => setCustomerName(name)}
                keyboardType={'default'}
                multiline={true}
                autoFocus={true}
                blurOnSubmit={false}
                returnKeyType={"next"}
                autoCapitalize='none'
                style={styles.textInputStyle}
              />
            </View>
          </View>
        </View>
        <View style={[styles.iconsStyle, { marginTop: 25 }]}>
          <View style={styles.subListViewStyle}>
            <View style={styles.imageView}>
              <Image source={importImages.mobileNumberImg} ></Image>
            </View>
            <View style={styles.subListViewStylemain}>
              <View style={styles.subListViewStyle1}>
                <Text style={styles.detailHeadingTextStyle}>{'Mobile number'}</Text>
                <Text style={styles.asteriskStyle}>{' *'}</Text>
              </View>
              {params.values.phone ?
                <TextInput
                  onChangeText={(number) => setPhoneNumber(number)}
                  keyboardType={'phone-pad'}
                  blurOnSubmit={false}
                  returnKeyType={"next"}
                  autoFocus
                  autoCapitalize='none'
                  value={'+' + country + '  ' + phoneNumber}
                  editable={params.values.phone ? false : true}
                  style={styles.textInputStyle}
                />
                :
                <View style={styles.inputNumber}>
                  <PhoneInput
                    ref={phoneInput}
                    defaultValue={phoneNumber}
                    defaultCode="JO"
                    layout="second"
                    placeholder={country === '962' ? '7XXXXXXXX' : 'XXXXXX'}
                    reset={true}
                    value={phoneNumber}
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
                      marginStart: -2, fontSize: 16,
                      fontFamily: Fonts.montserratRegular,
                      color: commonColors.Blue,
                    }}
                    filterProps={{
                      fontSize: 16,
                      placeholderTextColor: commonColors.Grey,
                      fontFamily: Fonts.montserratRegular,
                      color: commonColors.Blue,
                    }}
                    containerStyle={styles.textInputStyle}
                    onChangeCountry={(country) => addcountrycode(country.callingCode[0])}
                    onChangeText={(phoneNumber) => {
                      setPhoneNumber(phoneNumber);
                    }}
                  />
                </View>
              }
            </View>
          </View>
        </View>
        <View style={[styles.iconsStyle, { marginTop: 25 }]}>
          <View style={styles.subListViewStyle}>
            <View style={styles.imageView}>
              <Image source={importImages.emailImg} ></Image>
            </View>
            <View style={styles.subListViewStylemain}>
              <View style={styles.subListViewStyle1}>
                <Text style={styles.detailHeadingTextStyle}>{'Email'}</Text>
                <Text style={styles.asteriskStyle}>{' *'}</Text>
              </View>
              <TextInput
                onChangeText={(email) => setEmail(email)}
                keyboardType={'email-address'}
                blurOnSubmit={false}
                returnKeyType={"next"}
                autoCapitalize='none'
                value={email}
                multiline={true}
                editable={params.values.email ? false : true}
                style={styles.textInputStyle}
              />
            </View>
          </View>
        </View>
        <View style={[styles.iconsStyle, { marginTop: 25 }]}>
          <View style={styles.subListViewStyle}>
            <View style={styles.imageView}>
              <Image source={importImages.passwordImg} ></Image>
            </View>
            <View style={styles.subListViewStylemain}>
              <View style={styles.subListViewStyle1}>
                <Text style={styles.detailHeadingTextStyle}>{'Password'}</Text>
                <Text style={styles.asteriskStyle}>{' *'}</Text>
              </View>
              <TextInput
                onChangeText={(password) => setPassword(password)}
                keyboardType={'default'}
                blurOnSubmit={false}
                returnKeyType={"next"}
                autoCapitalize='none'
                secureTextEntry={true}
                style={styles.textInputStyle}
              />
            </View>
          </View>
        </View>
        <View style={[styles.iconsStyle, { marginTop: 25 }]}>
          <View style={styles.subListViewStyle}>
            <View style={styles.imageView}>
              <Image source={importImages.genderImg} ></Image>
            </View>
            <View style={styles.subListViewStylemain}>
              <View style={styles.subListViewStyle1}>
                <Text style={styles.detailHeadingTextStyle}>{'Gender'}</Text>
              </View>
              <TouchableOpacity onPress={() => modalVisible('Gender')} style={styles.textInputStyle}>
                <Text style={styles.genderDOBTextStyle}>{gender}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.iconsStyle, { marginTop: 25 }]}>
          <View style={styles.subListViewStyle}>
            <View style={styles.imageView}>
              <Image source={importImages.dateOfbirthImg} ></Image>
            </View>
            <View style={styles.subListViewStylemain}>
              <View style={styles.subListViewStyle1}>
                <Text style={styles.detailHeadingTextStyle}>{'Date of birth'}</Text>
              </View>
              <TouchableOpacity onPress={() => modalVisible('Date')} style={styles.textInputStyle}>
                <Text style={styles.genderDOBTextStyle}>{dateOfBirth ? moment(new Date(date)).format('DD-MM-YYYY').toString() : ''}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal
          animationType='slide'
          transparent={true}
          visible={isModalVisibleGender} >
          <TouchableWithoutFeedback onPress={() => setModalVisibleGender(false)}>
            <View style={styles.modalViewStyle}>
              <TouchableWithoutFeedback onPress={null}>
                <View style={styles.modalSubViewStyle}>
                  <View style={{ flexDirection: 'row', marginTop: 12, marginBottom: 10 }}>
                    <Image source={importImages.genderImg}></Image>
                    <Text style={{ color: commonColors.Blue, fontFamily: Fonts.montserratMedium, fontSize: 16, marginStart: 10 }}>{'Your Gender'}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => { setRadioButton('Female') }}>
                    <View style={styles.genderRadioViewStyle}>
                      <View style={styles.genderRadioTouchableStyle}>
                        {'Female' == radioButton ? <View style={styles.genderRadioSubviewStyle}></View> : null}
                      </View>
                      <Text style={styles.genderRadioTextStyle}>{'Female'}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => { setRadioButton('Male') }}>
                    <View style={styles.genderRadioViewStyle}>
                      <View style={styles.genderRadioTouchableStyle}>
                        {'Male' == radioButton ? <View style={styles.genderRadioSubviewStyle}></View> : null}
                      </View>
                      <Text style={styles.genderRadioTextStyle}>{'Male'}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ marginBottom: 12 }}>
                    <TouchableOpacity
                      style={{ backgroundColor: commonColors.Blue, borderRadius: 10, alignSelf: 'flex-end' }}
                      onPress={() => actionclick()}>
                      <Text style={{ color: commonColors.White, marginHorizontal: 10, marginVertical: 5, fontFamily: Fonts.montserratMedium, fontSize: 16 }}>{'Update'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Modal
          animationType='slide'
          transparent={true}
          visible={isModalVisibleDOB}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisibleDOB(false)}>
            <View style={styles.modalViewStyle}>
              <TouchableWithoutFeedback onPress={null}>
                <View style={styles.modalSubViewStyle}>
                  <View style={{ flexDirection: 'row', marginTop: 12 }}>
                    <Image source={importImages.dateOfbirthImg}></Image>
                    <Text style={{ color: commonColors.Blue, fontFamily: Fonts.montserratMedium, fontSize: 16, marginStart: 10 }}>{'Date of birth'}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 35, marginVertical: 20 }}>
                    <TouchableOpacity onPress={() => setOpen(true)}
                      style={{ backgroundColor: commonColors.LightGrey, height: 54.33, width: 54.33, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: commonColors.Blue, fontSize: 14, fontFamily: Fonts.montserratMedium }}>{moment(new Date(date)).format('DD').toString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setOpen(true)}
                      style={{ backgroundColor: commonColors.LightGrey, height: 54.33, width: 54.33, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: commonColors.Blue, fontSize: 14, fontFamily: Fonts.montserratMedium }}>{moment(new Date(date)).format('MM').toString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setOpen(true)}
                      style={{ backgroundColor: commonColors.LightGrey, height: 54.33, width: 54.33, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: commonColors.Blue, fontSize: 14, fontFamily: Fonts.montserratMedium }}>{moment(new Date(date)).format('YYYY').toString()}</Text>
                    </TouchableOpacity>
                  </View>
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    onConfirm={(date) => { setDate(date), setOpen(false) }}
                    onCancel={() => { setOpen(false) }}
                    mode='date'
                    maximumDate={new Date()}
                    textColor={commonColors.Blue}
                    title={null}
                  />
                  <View style={{ marginBottom: 12 }}>
                    <TouchableOpacity
                      style={{ backgroundColor: commonColors.Blue, borderRadius: 10, alignSelf: 'flex-end' }} onPress={() => DOB()} >
                      <Text style={{ color: commonColors.White, marginHorizontal: 10, marginVertical: 5, fontFamily: Fonts.montserratMedium, fontSize: 16 }}>{'Update'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>);
  }

  /**
   * modalVisible function set open modal of gender and date of birth
   * @param {*} values 
   */
  const modalVisible = (values) => {
    if (values == 'Gender') {
      setModalVisibleGender(true)
    }
    else {
      setModalVisibleDOB(true)
    }
  }

  /**
   * continueButton function design of continue button
   */
  const continueButton = () => {
    return (
      <View style={styles.continueButtonViewStyle}>
        <TouchableOpacity
          onPress={() => submitButtonValidation()}
          style={styles.continueButtonStyle}
        >
          <Text
            style={styles.continueTextStyle}
          >{'continue'}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  /**
   * Render Method
   */
  return (
    <View style={{ backgroundColor: commonColors.White, flex: 1 }}>
      <Header
        leftBtnOnPress={() => navigation.goBack()}
        leftBtn={null}
        style={{ backgroundColor: commonColors.White }}
      />
      <Text
        style={styles.signUpTextStyle}
      >{'Sign Up'}</Text>
      <View style={styles.container}>
        <KeyboardAwareFlatList
          data={['1']}
          renderItem={signUpList1}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={continueButton}
        />
      </View>

      {isModalVisible &&
        <BallIndicator visible={isModalVisible} />
      }
    </View>
  );
}

/**
 * UI og Signup Screen
 */
const styles = StyleSheet.create({

  signUpTextStyle: {
    color: commonColors.Blue,
    fontFamily: Fonts.montserratMedium,
    fontSize: 26,
    left: 49,
    marginBottom: 30
  },

  container: {
    flex: 1,
    backgroundColor: commonColors.White,
    shadowColor: commonColors.Black,
    shadowOpacity: 0.4,
    shadowRadius: 5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    elevation: 8
  },

  listViewStyle: {
    marginTop: 20,
    alignItems: 'center'
  },

  imageView: {
    height: 25,
    width: 25,
    alignItems: 'center',
    marginTop: 3,
  },

  subListViewStyle: {
    flexDirection: 'row',
    marginTop: 10,
  },

  subListViewStyle1: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  subListViewStylemain: {
    marginStart: 30
  },

  iconsStyle: {
    width: deviceWidth - 80
  },

  detailHeadingTextStyle: {
    fontSize: 16,
    fontFamily: Fonts.montserratMedium,
    color: commonColors.Blue
  },

  inputNumber: {
    alignSelf: 'center',
  },

  asteriskStyle: {
    color: commonColors.Red,
    marginTop: -10
  },

  phoneinputStyle: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: commonColors.Grey,
  },

  textInputStyle: {
    borderBottomWidth: 0.4,
    width: (deviceWidth + 55) / 2,
    fontSize: 16,
    fontFamily: Fonts.montserratRegular,
    color: commonColors.Blue,
  },

  genderDOBTextStyle: {
    fontSize: 16,
    fontFamily: Fonts.montserratRegular,
    color: commonColors.Blue,
  },

  genderDOBViewStyle: {
    borderBottomWidth: 0.4,
    width: '65%',
    left: 80,
  },

  genderDOBHeadingTextStyle: {
    fontSize: 16,
    fontFamily: Fonts.montserratMedium,
    color: commonColors.Blue,
  },

  continueButtonViewStyle: {
    alignSelf: 'center',
    marginTop: 20
  },

  continueButtonStyle: {
    backgroundColor: commonColors.Blue,
    marginVertical: 20,
    width: deviceWidth - 45,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },

  continueTextStyle: {
    color: commonColors.White,
    fontSize: 20,
    textTransform: 'uppercase',
    fontFamily: Fonts.montserratMedium
  },

  modalViewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: commonColors.Transparent
  },

  modalSubViewStyle: {
    backgroundColor: commonColors.White,
    shadowColor: commonColors.Black,
    shadowOpacity: 1,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 3 },
    borderRadius: 8,
    width: deviceWidth - 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20, paddingBottom: 20
  },

  genderRadioViewStyle: {
    flexDirection: 'row',
    marginStart: 10,
    marginTop: 15
  },

  genderRadioTouchableStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: commonColors.Blue,
    height: 17.39,
    width: 17.39,
    justifyContent: 'center',
    alignItems: 'center'
  },

  genderRadioSubviewStyle: {
    backgroundColor: commonColors.Blue,
    borderRadius: 8,
    height: 10,
    width: 10
  },

  genderRadioTextStyle: {
    color: commonColors.Blue,
    fontFamily: Fonts.montserratMedium,
    fontSize: 16,
    marginStart: 10
  },
})

