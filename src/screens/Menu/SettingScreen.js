import { React, TouchableOpacity, showSimpleAlert, FlatList, useState, CommonActions, useEffect, StyleSheet, Text, View, Header, Image, importImages, commonColors, Request, TouchableWithoutFeedback, Fonts, Colors, deviceHeight, deviceWidth, ConstantsText, importIconsWhite, Modal, ImagePickerView, useTheme, SwitchView, BallIndicator, StorageService, Alert } from '../../utils/importLibrary'
export default function SettingScreen({ route, navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const { ColorName, colors, icons, setScheme } = useTheme();
  const [modalVisibles, setModalVisibles] = useState(false);

  /**
   * Flatlist data
   */
  const DATA = [
    {
      id: '1',
      icon: importImages.myProfile,
      name: 'My Profile',
      url: ''
    },
    // {
    //   id: '2',
    //   icon: importImages.webProfile,
    //   name: 'Visit our Website',
    //   url: 'https://www.giftscenter.com'
    // },
    {
      id: '3',
      icon: importImages.facebookImage,
      name: 'Like us on Facebook',
      url: ''

    },
    {
      id: '4',
      icon: importImages.instaImage,
      name: 'Follow us on Instagram',
      url: ''

    },
    {
      id: '5',
      icon: importImages.aboutGigftImage,
      name: 'About Shine',
      url: 'https://www.giftscenter.com/loyalty-program'
    },
    {
      id: '6',
      icon: '',
      name: '',
      url: ''
    }
  ]

  /**
   * Life cycle method 
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action
    });
  }, []);

  /** 
   * Api Intigration and navigate to screens accordingly
   */
  const action_click = async (item, index) => {
    if (item.id == 2) {
      navigation.navigate('AboutScreen', { value: item.url, name: item.name })
    }
    else if (item.id == 3 || item.id == 4) {
      let response = await Request.post('get-setting.php')
      navigation.navigate('AboutScreen', { value: item.id == 3 ? response.data[0].option_value : response.data[1].option_value, name: item.name })
    }
    else if (item.id == 5) {
      navigation.navigate('AboutTierScreen')

    }
    else {
      navigation.navigate('MyProfileScreen')
    }
  }

  /**
   * Flatlist render item
   * @param {*} item 
   * @param {*} index 
   */
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.flatListViewStyle}>

        <Image source={item.icon} style={styles.imageIcon} resizeMode={'contain'}></Image>
        <TouchableOpacity
          onPress={() => action_click(item, index)}
        >
          <Text style={styles.textStyle}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /**
   * Flatlist item separator
   */
  const itemSeparatorComponent = ({ item }) => {
    return (
      <View style={styles.lineSeprator}></View>
    );
  }

  /**
   * Logout popup box
   */
  const alertBox = () => {
    Alert.alert(
      ConstantsText.appName,
      ConstantsText.logOutMessage,
      [
        { text: "Ok", onPress: () => onPressLogout() },
        { text: "Cancel", onPress: () => { } }
      ],
      { cancelable: false }
    );
  }

  /** 
   * Api Intigration and navigate to Auth screen with clear StorageService
   */
  const onPressLogout = async () => {
    setModalVisibles(true)
    let response = await Request.post('logout.php')
    setModalVisibles(false)
    if (response.success == true) {
      await StorageService.clear()
      setScheme('white')
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: "AuthSelection" }]
      });
      navigation.dispatch(resetAction);
      // showSimpleAlert(response.message)
    }
    else {
      if (response) {
        showSimpleAlert(response.message)
      }
    }
  }

  const onPressCancel = () => {
    setModalVisibles(!modalVisibles);

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
          headerTitle={'SETTINGS'}
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
        <FlatList
          style={styles.flatListStyle}
          data={DATA}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeparatorComponent}
          keyExtractor={(item, index) => index.toString()}
        />

        <View style={styles.centeredView} >
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibles}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisibles(!modalVisibles);
            }}>
            <TouchableWithoutFeedback
              onPress={() => setModalVisibles(false)}            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.appNameText}>{ConstantsText.appName}</Text>
                  <Text style={styles.logOutMessageText}>{ConstantsText.logOutMessage}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 15, marginBottom: 20 }}>
                    <TouchableOpacity style={styles.okButtonStyle} onPress={() => onPressLogout()}  >
                      <Text style={styles.OkmodalText}>{'Ok'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CancelButtonStyle} onPress={() => onPressCancel()} >
                      <Text style={styles.CancelmodalText}>{'Cancel'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>

        <TouchableOpacity
          // onPress={alertBox}
          onPress={() => setModalVisibles(true)}
          style={styles.continueButtonStyle}>
          <Text style={styles.continueTextStyle}>{'LOGOUT'}</Text>
        </TouchableOpacity>
      </View>
      {isModalVisible &&
        <BallIndicator visible={isModalVisible} />
      }
    </View>
  );
}

/**
 * UI of Setting Screen
 */
const styles = StyleSheet.create({
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

  container: {
    backgroundColor: commonColors.Blue,
    justifyContent: 'flex-end',
  },

  backButtonImage: {
    marginLeft: 30,
    bottom: 50
  },

  SettingStyle: {
    color: commonColors.Blue,
    fontSize: 24,
    marginLeft: 40,
    bottom: 70,
    fontFamily: Fonts.montserratMedium
  },

  flatListStyle: {
    alignSelf: 'flex-start'
  },

  flatListViewStyle: {
    flexDirection: 'row',
    marginLeft: 30,
    marginTop: 35
  },

  imageIcon: {
    marginRight: 30,
    height: 23,
    width: 23,

    alignSelf: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    alignSelf: 'center',
    fontSize: 16,
    color: commonColors.Blue,
    fontFamily: Fonts.montserratMedium,
  },

  lineSeprator: {
    borderBottomWidth: 0.5,
    marginLeft: 80,
    padding: 2,
    borderColor: commonColors.Grey
  },

  continueButtonStyle: {
    backgroundColor: commonColors.Blue,
    marginVertical: 20,
    width: deviceWidth - 45,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10
  },

  continueTextStyle: {
    color: commonColors.White,
    fontSize: 20,
    textTransform: 'uppercase',
    fontFamily: Fonts.montserratMedium
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',

    // backgroundColor:'#000'
    // shadowColor: '#000',

  },
  modalView: {
    marginTop:250,
    // height: 120,
    width: deviceWidth - 105,
    backgroundColor: commonColors.White,
    borderRadius: 20,
    // padding: 45,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  OkmodalText: {
    alignSelf: 'center',
    color: commonColors.White,
    fontSize:16,
    fontFamily: Fonts.montserratMedium,
  },
  CancelmodalText: {
    alignSelf: 'center',
    color: commonColors.White,
    fontSize: 16,
    fontFamily: Fonts.montserratMedium,
  },
  okButtonStyle: {
    // borderWidth: 1,
    borderColor: commonColors.DarkGrey,
    width: (deviceWidth - 80) / 4,
    textAlign: 'center',
    padding: 7,
    borderRadius: 5,
    backgroundColor: commonColors.Blue,
  },
  CancelButtonStyle: {
    // borderWidth: 1,
    borderColor: commonColors.DarkGrey,
    width: (deviceWidth - 80) / 4,
    textAlign: 'center',
    padding: 7,
    borderRadius: 5,
    backgroundColor: commonColors.Blue,
  },
  appNameText: {
    color: commonColors.Blue,
    fontSize: 22,
    fontFamily: Fonts.montserratMedium,
    marginTop: 20
  },
  logOutMessageText: {
    marginTop: 5,
    fontFamily: Fonts.montserratMedium,
    textAlign: 'center',
    color:commonColors.Blue
  }
})



