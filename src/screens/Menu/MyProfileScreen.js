
import { React, PhoneInput, apiConfigs, useState, deviceType, CommonActions, useEffect, isValidEmail, StorageService, useRef, moment, importImages, DatePicker, KeyboardAwareFlatList, FlatList, Alert, StyleSheet, Text, OTPInputView, TextInput, View, Header, Image, TouchableWithoutFeedback, TouchableOpacity, Fonts, commonColors, deviceHeight, deviceWidth, ConstantsText, importIconsWhite, Modal, ImagePickerView, useTheme, SwitchView, BallIndicator, WebView, Dimensions, ProgressBar, Request, showSimpleAlert, Keyboard } from '../../utils/importLibrary'
import countrys from '../../utils/country.json'
export default function MyProfileScreen({ route, navigation }) {
  const { ColorName, colors, icons, setScheme } = useTheme();
  const [customerName, setCustomerName] = useState('')
  const [TempValues, setTempValues] = useState('')
  const [TempValuesCountry, setTempValuesCountry] = useState('962')
  const [TempValuesCountryCall, setTempValuesCountryCall] = useState('JO')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [country, setCountry] = useState('962');
  const [email, setEmail] = useState('')
  const [emailSet, setEmailSet] = useState(false)
  const [password, setPassword] = useState('')
  const [phoneNumberSet, setPhoneNumberSet] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [gender, setGender] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [isModalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false)
  const [radioButton, setRadioButton] = useState('')
  const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [modalvalues, modalVisible] = useState('');
  const [organizationList, setOrganizationList] = useState()
  const [organizationEnable, setOrganizationEnable] = useState(false)
  const [organizationFound, setOrganizationFound] = useState('')
  const [organizationText, setorganizationText] = useState('')
  const [organizationID, setorganizationID] = useState('')
  const [organizationObj, setorganizationObj] = useState('')
  const [organizationIMG, setOrganizationIMG] = useState('')
  const [userdetails, setuserdetails] = useState()
  const [organizationIMGUpdate, setorganizationIMGUpdate] = useState('')
  const [isImagePickerVisible, setImagePickerVisible] = useState(false);
  const [listArray, setListArray] = useState([]);
  const phoneInput = useRef();

  /**
   * Life cycle method 
   */
  useEffect(() => {
    getUserDatils()
    organization_Api()
    
  }, []);

  /** 
   * Api Intigration and set response data
   */
  const getUserDatils = async () => {
    setModalVisible(true)
    // const userdetails = await StorageService.getItem(StorageService.STORAGE_KEYS.USER_DETAILS);
    let response = await Request.post('user.php')
    setModalVisible(false)
    const data = response.data
    setuserdetails(response.data)
    const genderdata = data.gender != '' ? data.gender.charAt(0).toUpperCase() + data.gender.slice(1) : ''
    setCustomerName(data.customer_name)
    setOrganizationEnable(data.organization_approved === '0' ? true : false)
    setPhoneNumber(data.phone)
    setEmail(data.email)
    setGender(genderdata)
    setDateOfBirth(data.dob != '0000-00-00' ? data.dob : dateOfBirth)
    setDate(data.dob != '0000-00-00' ? data.dob : date)
    setCountry(data.phone_code)
    setTempValuesCountry(data.phone_code)
    setorganizationID(data.organization_approved === '0' ? data.orgn : data.organization)
    setOrganizationFound(data.organization_approved === '0' ? data.orgn : data.organization)
    setorganizationText(data.organization_name)
    setOrganizationIMG(data.organization_image)
    setorganizationIMGUpdate(data.organization_image)
    if (genderdata != '') {
      setRadioButton(genderdata == 'Female' ? 'Female' : 'Male')
    }
    setListArray([data])
    Object.entries(countrys).map(item => {
      if (item[1].callingCode[0] == data.phone_code) {
        setTempValuesCountryCall(item[0])
      }
    })
  }

  /** 
   * Validation and API calling 
   */
  const submitButtonValidation = () => {
    const ConfirmValid = validationOfField();
    if (ConfirmValid) {
      UpdateProfile_API()
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
    else {
      if (organizationObj != '') {
        if (organizationID == '') {
          showSimpleAlert('Please select organization')
          return false;
        }
        else if (organizationIMG == '' && organizationIMGUpdate == '') {
          showSimpleAlert('Please select image for organization')
          return false;
        }
        else {
          return true;
        }
      }
      else {
        return true
      }
    }
  }

  /** 
   * Api Integration for organization
   */
  const organization_Api = async () => {
    let response = await Request.post('get-organization.php')
    setOrganizationList(response.data)
  }

  /** 
   * Api Integration for update data
   */
  const UpdateProfile_API = async () => {
    setModalVisible(true)
    let formData = new FormData()
    let objImg = {
      name: 'image.jpg',
      type: 'image/jpeg',
      uri: organizationIMG,
    }
    formData.append('customer_name', customerName)
    formData.append('email', email)
    formData.append('phone', phoneNumber)
    formData.append('phone_code', country)
    formData.append('gender', gender)
    formData.append('dob', dateOfBirth)
    if (organizationObj != '') {
      formData.append('organization', organizationIMGUpdate != '' ? '' : organizationID)
      formData.append('organization_image', organizationIMGUpdate != '' ? '' : objImg)
    }
    let response = await Request.post('update-profile.php', formData)
    setModalVisible(false)
    if (response.success == true) {
      await StorageService.saveItem(StorageService.STORAGE_KEYS.USER_DETAILS, response.data)
      navigation.goBack()
      showSimpleAlert(response.message)
    }
    else {
      if (response) {
        showSimpleAlert(response.message)
      }
    }
  }

  /** 
   * Api Integration for update password
   */
  const UpdatePassword_API = async () => {
    if (password == '') {
      showSimpleAlert('Please enter current password')
    }
    else if (newPassword == '') {
      showSimpleAlert('Please enter new password')
    }
    else if (confirmPassword == '') {
      showSimpleAlert('Please enter confirm password')
    }
    else if (newPassword != confirmPassword) {
      showSimpleAlert('New password and confirm new password does not match')
    }
    else {
      let params = {
        current_password: password,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }
      setModalVisible(true)
      let response = await Request.post('update-password.php', params)
      setModalVisible(false)
      if (response.success == true) {
        modalVisible('')
        showSimpleAlert(response.message)
      }
      else {
        if (response) {
          showSimpleAlert(response.message)

        }
      }
    }
  }

  /**
   * onGetURI function close imagepicker and set image
   * @param {*} image 
   */
  const onGetURI = (image) => {
    setorganizationIMGUpdate('')
    setImagePickerVisible(false)
    setOrganizationIMG(image.path)
  };

  /**
   * actionclick function set gender, date of birth and close modal
   * @param {*} type 
   */
  const actionclick = (type) => {
    if (type == 'Gender') {
      setGender('Male' == radioButton ? 'Male' : 'Female')

    }
    else if (type == 'Date') {
      setDateOfBirth(moment(date).format('YYYY-MM-DD'))
    }
    modalVisible('')
  }

  /**
   * onPressOrganization function set organization data
   */
  const onPressOrganization = (item) => {
    setorganizationObj(item)
  }

  /**
   * onupdateName function set customer name and close modal
   */
  const onupdateName = () => {
    setCustomerName(TempValues)
    modalVisible('')
    setTempValues('')
  }

  /**
   * onupdatePhone function set phonenumber and close modal
   */
  const onupdatePhone = () => {
    setPhoneNumber(TempValues)
    setPhoneNumberSet(true)
    setCountry(TempValuesCountry)
    modalVisible('')
    setTempValues('')
  }

  /**
   * onupdateEamil function set email and close modal
   */
  const onupdateEamil = () => {
    setEmail(TempValues)
    setEmailSet(true)
    modalVisible('')
    setTempValues('')
  }

  /**
   * onupdatephonenoclick function set country code and open phonenumber modal
   */
  const onupdatephonenoclick = () => {
    setCountry(country)
    setTempValues(phoneNumber)
    modalVisible('mobileno')
  }

  /**
   * addcountrycode function set phonenumber, countrycode and close modal
   */
  const addcountrycode = (values) => {
    phoneInput.current.setState({ number: '' })
    setTempValuesCountry(values.callingCode[0])
    setPhoneNumber('')
    setTempValues('')
    setTempValuesCountryCall(values.cca2)
  }

  /**
   * onPressUpdateOrganization function set organization and close modal
   */
  const onPressUpdateOrganization = () => {
    setorganizationIMGUpdate(userdetails.organization == organizationObj.id ? userdetails.organization_image : '')
    setOrganizationIMG(userdetails.organization == organizationObj.id ? userdetails.organization_image : '')
    setorganizationText(organizationObj.title)
    setorganizationID(organizationObj.id)
    modalVisible('')
  }

  /**
   * outClickModalDisable function close modal
   */
  const outClickModalDisable = () => {
    modalVisible('')
    setorganizationObj('')
  }
  const closeIconFunction = () => {
    modalVisible('')
  }

  /**
   * Flatlist render item of organization list
   * @param {*} item 
   */
  const organizationTitleList = ({ item }) => {
    return (
      <View>
        <TouchableOpacity onPress={() => onPressOrganization(item)} style={styles.renderView}>
          <Text style={{ color: commonColors.Blue, fontFamily: organizationObj.id == item.id ? Fonts.montserratBold : Fonts.montserratRegular, fontSize: 16, }}>{item.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  /**
   * Flatlist item separator of organization list
   */
  const itemSeparator = () => {
    return (
      <View style={{ borderBottomWidth: 0.4, borderBottomColor: commonColors.Grey }}></View>
    )
  }

  /**
   * Flatlist render item
   * @param {*} item 
   * @param {*} index 
   */
  const signUpList1 = ({ item, index }) => {
    var file_Name = organizationIMG != '' ? organizationIMG.substring(organizationIMG.lastIndexOf("/") + 1) : ''
    var type = file_Name.substring(file_Name.lastIndexOf(".") + 1);
    var changeName = organizationIMG != '' ? file_Name.replace(file_Name, 'organization') + "." + type : ''
    return (
      <View style={styles.listViewStyle}>

        <View style={[styles.iconsStyle]}>
          <View style={styles.subListViewStyle}>
            <View style={styles.imageView}>
              <Image source={importImages.nameImg}></Image>
            </View>
            <View style={styles.subListViewStylemain}>
              <TouchableOpacity onPress={() => { modalVisible('CustomerName'), setTempValues(customerName) }}>
                <View style={styles.subListViewStyle1}>
                  <Text style={styles.detailHeadingTextStyle}>{'Customer name'}</Text>
                </View>
                <Text style={styles.genderDOBTextStyle}>{customerName}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.iconsStyle, { marginTop: 20 }]}>
          <View style={styles.subListViewStyle}>
            <View style={styles.imageView}>
              <Image source={importImages.mobileNumberImg} ></Image>
            </View>
            <View style={styles.subListViewStylemain}>
              <TouchableOpacity onPress={() => onupdatephonenoclick()} >
                <View style={styles.subListViewStyle1}>
                  <Text style={styles.detailHeadingTextStyle}>{'Mobile number'}</Text>
                </View>
                <Text style={styles.genderDOBTextStyle}>{'+' + country + '  ' + phoneNumber}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.iconsStyle, { marginTop: 20 }]}>
          <View style={styles.subListViewStyle}>
            <View style={styles.imageView}>
              <Image source={importImages.emailImg} ></Image>
            </View>
            <View style={styles.subListViewStylemain}>
              <TouchableOpacity onPress={() => { modalVisible('Email'), setTempValues(email) }} >
                <View style={styles.subListViewStyle1}>
                  <Text style={styles.detailHeadingTextStyle}>{'Email'}</Text>
                </View>
                <Text style={styles.genderDOBTextStyle}>{email}</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
        <View style={[styles.iconsStyle, { marginTop: 20 }]}>
          <View style={styles.subListViewStyle}>
            <View style={styles.imageView}>
              <Image source={importImages.passwordImg} ></Image>
            </View>
            <View style={styles.subListViewStylemain}>
              <TouchableOpacity onPress={() => modalVisible('Changepassword')} >
                <View style={styles.subListViewStyle1}>
                  <Text style={styles.detailHeadingTextStyle}>{'Change password'}</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.genderDOBTextStyle}>{ }</Text>
            </View>
          </View>
        </View>


        <View style={[styles.iconsStyle, { marginTop: 10 }]}>
          <View style={styles.subListViewStyle}>
            <View style={styles.imageView}>
              <Image source={importImages.genderImg} ></Image>
            </View>
            <View style={styles.subListViewStylemain}>
              <TouchableOpacity onPress={() => modalVisible('Gender')} >
                <View style={styles.subListViewStyle1}>
                  <Text style={styles.detailHeadingTextStyle}>{'Gender'}</Text>
                </View>
                <Text style={styles.genderDOBTextStyle}>{gender != '' ? gender : 'Not added'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={[styles.iconsStyle, { marginTop: 20 }]}>
          <View style={styles.subListViewStyle}>
            <View style={styles.imageView}>
              <Image source={importImages.dateOfbirthImg} ></Image>
            </View>
            <View style={styles.subListViewStylemain}>
              <TouchableOpacity onPress={() => modalVisible('Date')} >

                <View style={styles.subListViewStyle1}>
                  <Text style={styles.detailHeadingTextStyle}>{'Date of birth'}</Text>
                </View>
                <Text style={styles.genderDOBTextStyle}>{dateOfBirth ? moment(dateOfBirth, 'YYYY-MM-DD').format('DD-MM-YYYY').toString() : 'Not added'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[styles.iconsStyle, { marginTop: 20 }]}>
          <View style={styles.subListViewStyle}>
            <View style={styles.imageView}>
              <Image source={importImages.nameImg} ></Image>
            </View>
            <View style={styles.subListViewStylemain}>
              <TouchableOpacity disabled={organizationFound != '' ? organizationEnable : false} onPress={() => modalVisible('Organization')} >
                <View style={styles.subListViewStyle1}>
                  <Text style={styles.detailHeadingTextStyle}>{'Organization'}</Text>
                </View>
                <Text style={styles.genderDOBTextStyle}>{organizationText != '' ? organizationText : 'Not added'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={[styles.iconsStyle, { marginTop: 20 }]}>
          <View style={styles.subListViewStyle}>
            <View style={styles.imageView}>
              <Image source={importImages.nameImg} ></Image>
            </View>
            <View style={styles.subListViewStylemain}>
              <TouchableOpacity disabled={organizationFound != '' ? organizationEnable : false} onPress={() => setImagePickerVisible(true)} >
                <View style={styles.subListViewStyle1}>
                  <Text style={styles.detailHeadingTextStyle}>{'Upload Organization ID'}</Text>
                </View>
                <Text style={styles.genderDOBTextStyle}>{changeName != '' ? changeName : 'Add now'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ImagePickerView
          visible={isImagePickerVisible}
          transparent={true}
          CloseModal={() => setImagePickerVisible(false)}
          onGetURI={onGetURI}
        />
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalvalues != '' ? true : false} >
          <TouchableWithoutFeedback onPress={() => { outClickModalDisable() }}>

            <View style={styles.modalViewStyle}>
              <TouchableWithoutFeedback onPress={null}>
                <View style={[styles.modalSubViewStyle, modalvalues == 'Organization' ? { paddingTop: 50, paddingBottom: 20, marginTop: 30, marginBottom: 30 } : {}]}>
                  {
                    modalvalues == 'CustomerName' ?
                      <View >
                        <View style={{ flexDirection: 'row', marginTop: 12, alignItems: 'center' }}>
                          <Image source={importImages.nameImg}></Image>
                          <Text style={{ color: commonColors.Blue, fontFamily: Fonts.montserratMedium, fontSize: 16, marginStart: 10 }}>{'Upadate name'}</Text>
                        </View>
                        <TextInput
                          style={styles.popUpTextInputStyle}
                          value={TempValues}
                          placeholder={'Customer name'}
                          placeholderTextColor={commonColors.Grey}
                          onChangeText={(value) => { setTempValues(value) }}
                        ></TextInput>

                        <TouchableOpacity
                          style={{ backgroundColor: commonColors.Blue, borderRadius: 10, alignSelf: 'flex-end', marginTop: 10, marginBottom: 12 }}
                          onPress={() => onupdateName()}>
                          <Text style={{ color: commonColors.White, marginHorizontal: 10, marginVertical: 5, fontFamily: Fonts.montserratMedium, fontSize: 16 }}>{'Update'}</Text>
                        </TouchableOpacity>
                      </View>
                      :
                      modalvalues == 'Email' ?
                        <View >
                          <View style={{ flexDirection: 'row', marginTop: 12, alignItems: 'center' }}>
                            <Image source={importImages.emailImg}></Image>
                            <Text style={{ color: commonColors.Blue, fontFamily: Fonts.montserratMedium, fontSize: 16, marginStart: 10 }}>{'Upadate email'}</Text>
                          </View>
                          <TextInput
                            style={styles.popUpTextInputStyle}
                            value={TempValues}
                            placeholder={'email'}
                            autoCapitalize='none'
                            keyboardType={'email-address'}

                            placeholderTextColor={commonColors.Grey}
                            onChangeText={(value) => { setTempValues(value) }}
                          ></TextInput>

                          <TouchableOpacity
                            style={{ backgroundColor: commonColors.Blue, borderRadius: 10, alignSelf: 'flex-end', marginTop: 10, marginBottom: 12 }}
                            onPress={() => onupdateEamil()}>
                            <Text style={{ color: commonColors.White, marginHorizontal: 10, marginVertical: 5, fontFamily: Fonts.montserratMedium, fontSize: 16 }}>{'Update'}</Text>
                          </TouchableOpacity>
                        </View>
                        :
                        modalvalues == 'mobileno' ?
                          <View >
                            <View>
                              <View style={{ flexDirection: 'row', marginTop: 12 }}>
                                <Image source={importImages.mobileNumberImg}></Image>
                                <Text style={{ color: commonColors.Blue, fontFamily: Fonts.montserratMedium, fontSize: 16, marginStart: 10 }}>{'Update mobile number'}</Text>
                              </View>
                              <View style={styles.inputNumber}>
                                <PhoneInput
                                  ref={phoneInput}
                                  defaultValue={phoneNumber}
                                  defaultCode={TempValuesCountryCall}
                                  layout="second"
                                  placeholder={TempValuesCountry === '962' ? '7XXXXXXXX' : 'XXXXXX'}
                                  reset={true}
                                  value={phoneNumber}
                                  textInputProps={{
                                    keyboardType: 'phone-pad', maxLength: TempValuesCountry != '' ? TempValuesCountry === '962' ? 9 : 13 : country === '962' ? 9 : 13,
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
                                  containerStyle={styles.phoneinputStyle}
                                  onChangeCountry={(country) =>
                                    addcountrycode(country)
                                  }
                                  onChangeText={(phoneNumber) => {
                                    setTempValues(phoneNumber);
                                  }}
                                />
                              </View>
                            </View>
                            <TouchableOpacity
                              style={{ backgroundColor: commonColors.Blue, borderRadius: 10, alignSelf: 'flex-end', marginTop: 10, marginBottom: 12 }}
                              onPress={() => onupdatePhone()}>
                              <Text style={{ color: commonColors.White, marginHorizontal: 10, marginVertical: 5, fontFamily: Fonts.montserratMedium, fontSize: 16 }}>{'Update'}</Text>
                            </TouchableOpacity>
                          </View>
                          :
                          modalvalues == 'Changepassword' ?
                            <View >
                              <View style={{ flexDirection: 'row', marginTop: 12 }}>
                                <Image source={importImages.passwordImg}></Image>
                                <Text style={{ color: commonColors.Blue, fontFamily: Fonts.montserratMedium, fontSize: 16, marginStart: 10 }}>{'Change password'}</Text>
                              </View>
                              <TextInput
                                style={styles.popUpTextInputStyle}
                                placeholder={'Current password'}
                                placeholderTextColor={commonColors.Grey}
                                value={password}
                                secureTextEntry={true}

                                onChangeText={(value) => setPassword(value)}></TextInput>
                              <TextInput
                                style={styles.popUpTextInputStyle}
                                placeholder={'New password'}
                                placeholderTextColor={commonColors.Grey}
                                value={newPassword}
                                secureTextEntry={true}

                                onChangeText={(value) => setNewPassword(value)}></TextInput>
                              <TextInput
                                style={styles.popUpTextInputStyle}
                                placeholder={'Re-type new password'}
                                placeholderTextColor={commonColors.Grey}
                                value={confirmPassword}
                                secureTextEntry={true}
                                onChangeText={(value) => setConfirmPassword(value)}></TextInput>

                              <TouchableOpacity
                                style={{ backgroundColor: commonColors.Blue, borderRadius: 10, alignSelf: 'flex-end', marginTop: 10, marginBottom: 12 }}
                                onPress={() => UpdatePassword_API()}>
                                <Text style={{ color: commonColors.White, marginHorizontal: 10, marginVertical: 5, fontFamily: Fonts.montserratMedium, fontSize: 16 }}>{'Update'}</Text>
                              </TouchableOpacity>
                            </View>
                            :
                            modalvalues == 'Gender' ?
                              <View>
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
                                    onPress={() => actionclick('Gender')}>
                                    <Text style={{ color: commonColors.White, marginHorizontal: 10, marginVertical: 5, fontFamily: Fonts.montserratMedium, fontSize: 16 }}>{'Update'}</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                              :
                              modalvalues == 'Date' ?
                                <View>
                                  <View style={{ flexDirection: 'row', marginTop: 12 }}>
                                    <Image source={importImages.dateOfbirthImg}></Image>
                                    <Text style={{ color: commonColors.Blue, fontFamily: Fonts.montserratMedium, fontSize: 16, marginStart: 10 }}>{'Date of birth'}</Text>
                                  </View>
                                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 35, marginVertical: 20 }}>
                                    <TouchableOpacity onPress={() => setOpen(true)}
                                      style={{ backgroundColor: commonColors.LightGrey, height: 54.33, width: 54.33, justifyContent: 'center', alignItems: 'center' }}>
                                      <Text style={{ color: commonColors.Blue, fontSize: 14, fontFamily: Fonts.montserratMedium }}>{moment(date).format('DD').toString()}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setOpen(true)}
                                      style={{ backgroundColor: commonColors.LightGrey, height: 54.33, width: 54.33, justifyContent: 'center', alignItems: 'center' }}>
                                      <Text style={{ color: commonColors.Blue, fontSize: 14, fontFamily: Fonts.montserratMedium }}>{moment(date).format('MM').toString()}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setOpen(true)}
                                      style={{ backgroundColor: commonColors.LightGrey, height: 54.33, width: 54.33, justifyContent: 'center', alignItems: 'center' }}>
                                      <Text style={{ color: commonColors.Blue, fontSize: 14, fontFamily: Fonts.montserratMedium }}>{moment(date).format('YYYY').toString()}</Text>
                                    </TouchableOpacity>
                                  </View>
                                  <DatePicker
                                    modal
                                    open={open}
                                    date={new Date(date)}
                                    onConfirm={(date) => { setDate(date), setOpen(false) }}
                                    onCancel={() => { setOpen(false) }}
                                    mode='date'
                                    maximumDate={new Date()}
                                    textColor={commonColors.Blue}
                                    title={null}
                                  />
                                  <View style={{ marginBottom: 12 }}>
                                    <TouchableOpacity
                                      onPress={() => actionclick('Date')}
                                      style={{ backgroundColor: commonColors.Blue, borderRadius: 10, alignSelf: 'flex-end' }} >
                                      <Text style={{ color: commonColors.White, marginHorizontal: 10, marginVertical: 5, fontFamily: Fonts.montserratMedium, fontSize: 16 }}>{'Update'}</Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                                : modalvalues == 'Organization' ?
                                  <View>
                                    <TouchableOpacity onPress={() => closeIconFunction()} style={{ width: 30, height: 30 }}  >
                                      <Image source={importImages.closeicon} ></Image>
                                    </TouchableOpacity>

                                    <View style={[styles.modalHeaderView,]}>
                                      <Text style={{ color: commonColors.Blue, fontFamily: Fonts.montserratSemiBold, fontSize: Fonts.MediumSize }}>{'Organization'}</Text>
                                      <TouchableOpacity
                                        style={{ backgroundColor: commonColors.Blue, borderRadius: 10 }}
                                        onPress={() => onPressUpdateOrganization()}>
                                        <Text style={{ color: commonColors.White, marginHorizontal: 10, marginVertical: 5, fontFamily: Fonts.montserratMedium, fontSize: 16 }}>{'Update'}</Text>
                                      </TouchableOpacity>
                                    </View>
                                    <FlatList
                                      data={organizationList}
                                      renderItem={organizationTitleList}
                                      keyExtractor={(item) => item.id}
                                      ItemSeparatorComponent={itemSeparator}
                                      showsVerticalScrollIndicator={false}
                                    >
                                    </FlatList>
                                  </View>
                                  :
                                  null
                  }
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

      </View>);
  }


  /**
   * Flatlist footer continue button
   */
  const continueButton = () => {
    return (
      <View style={styles.continueButtonViewStyle}>
        {listArray.length > 0 ?
          <TouchableOpacity
            onPress={() => submitButtonValidation()}
            style={styles.continueButtonStyle}>
            <Text style={styles.continueTextStyle}>{'submit'}</Text>
          </TouchableOpacity>
          : null}
      </View>
    )
  }

  /**
   * Render Method
   */
  return (
    <View style={{ backgroundColor: colors.homebackground, flex: 1 }}>
      <Header
        leftBtnOnPress={() => navigation.goBack()}
        leftBtn={<Image source={icons.BackImage}></Image>}
        style={{ backgroundColor: colors.homebackground }}
      />
      <Text
        style={[styles.signUpTextStyle, { color: colors.homeTextbackground }]}>{'PROFILE'}</Text>
      <View style={styles.container}>
        <KeyboardAwareFlatList
          data={listArray}
          style={{ marginTop: 20 }}
          renderItem={signUpList1}
          keyboardShouldPersistTaps={'handled'}
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
 * UI of MyProfile Screen
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
    marginBottom: 20,
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
    alignItems: 'flex-start',
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
    borderBottomWidth: 1,
    borderColor: commonColors.Grey,
  },

  textInputStyle: {
    borderBottomWidth: 0,
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
    marginTop: 0
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
  modalHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  popUpTextInputStyle: {
    borderBottomWidth: 0.4,
    borderBottomColor: commonColors.Grey,
    color: commonColors.Blue,
    fontSize: 16,
    fontFamily: Fonts.montserratMedium,
    marginTop: 10,
    alignSelf: 'center',
    width: deviceWidth - 80
  },
  renderView: {
    marginVertical: 7,
  },
})

