import { React, FlatList, useState, useEffect, Request, StorageService, showSimpleAlert, useRef, StyleSheet, Text, View, Header, Image, TouchableWithoutFeedback, Fonts, commonColors, deviceHeight, deviceWidth, ConstantsText, importIconsWhite, Modal, ImagePickerView, useTheme, SwitchView, BallIndicator, WebView, TouchableOpacity, Button, ProgressBar } from '../../utils/importLibrary'
export default function HomeScreen({ route, navigation }) {
  const { ColorName, colors, icons, setScheme } = useTheme();
  const [isModalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState('')

  /**
   * Flatlist array data
   */
  const [DATA, setData] = useState([
    {
      id: '1',
      name: 'NOTIFICATIONS',
      title: '',
      Button: 'BROWSE'
    },
    {
      id: '2',
      name: 'TIER',
      title: 'WHITE',
      Button: 'BROWSE'
    },
    {
      id: '3',
      name: 'POINTS',
      title: '0',
      Button: 'HISTORY'
    },
    {
      id: '4',
      name: 'SPENT',
      title: '0 JOD',
      Button: 'HISTORY'
    }
  ])

  /** 
   * Navigation of sub screen of HomeScreen  
   */
  const navigationindex = (index) => {
    if (index == 0) {
      navigation.navigate('NotificationScreen')
    }
    else if (index == 1) {
      navigation.navigate('TierScreen')
    }
    else if (index == 2) {
      navigation.navigate('PointsScreen', { viewAll: '' })
    }
    else if (index == 3) {
      navigation.navigate('SpentScreen', { viewAll: '' })
    }
  }

  /** 
   * Life cycle method 
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      // Call any action.
      getNotificationList()
    });
  }, []);

  /**
   * Api Intigration
   */
  const getNotificationList = async () => {

    setModalVisible(true)
    let response = await Request.post('get-home-data.php')
    setModalVisible(false)
    if (response.success == true) {
      const colorname = response.data.spent_total_without_format > 1000 ? 'blue' : response.data.spent_total_without_format > 500 ? 'silver' : 'white'
      setScheme(colorname)
      setUserData(response.data)
    }
    else {
      if (response) {
        showSimpleAlert(response.message)
      }
    }
  }

  /**
   * Flatlist render Method
   * @param {*} item 
   * @param {*} index
   */
  const renderItem = ({ item, index }) => {
    let spent = userData.spent_total == undefined ? '' : userData.spent_total + ' JOD'
    let tier = userData.spent_total_without_format > 1000 ? 'BLUE' : userData.spent_total_without_format > 500 ? 'SILVER' : 'WHITE'
    let point = userData.point_total == undefined ? '' : userData.point_total
    let notification = userData.notification == undefined ? 0 : userData.notification
    return (
      <View style={styles.boxStyle}>
        <View style={styles.boxConatiner}>
          <Text style={styles.nameText}>{item.name}</Text>
          <Text style={item.id == 1 ? styles.smallTitleText : styles.bigTitleText}>{index == 1 ? tier : index == 2 ? point : index == 3 ? spent : userData.latest_notification}</Text>
          <TouchableOpacity onPress={() => navigationindex(index)}>
            <View style={styles.textBoxView}>
              <Text style={styles.buttonTextStyle}>{item.Button}</Text>
            </View>
          </TouchableOpacity>
          {index == 0 && notification > 0 ? <View style={{ backgroundColor: 'rgba(255, 0, 0, 1)', height: 16, width: 16, borderRadius: 16 / 2, position: 'absolute', top: -8, right: -8, alignItems: 'center', }}><Text style={{ color: 'white', fontFamily: Fonts.montserratBold, fontSize: 10 }}>{notification}</Text></View> : null}

        </View>
      </View>
    );
  }
  const tier = userData.spent_total == undefined ? '' : userData.spent_total_without_format > 1000 ? userData.spent_total + '\nJOD' : userData.spent_total + ' JOD'
  const tierActive = userData.spent_total == undefined ? 0 : userData.spent_total_without_format
  const cal_per_tier = Number(userData.spent_total_without_format == undefined ? 1 : userData.spent_total_without_format > 1000 ? 100 : userData.spent_total_without_format / 1000 * 100).toFixed(0)

  /**
   * Render Method
   */
  return (
    <View style={{ backgroundColor: colors.homebackground, flex: 1, justifyContent: 'space-between', }}>
      <View style={{ flex: 0.18, justifyContent: 'center', alignItems: 'center' }}>

        <View style={{
          width: deviceWidth - 20,
          borderRadius: 5,
          shadowColor: commonColors.Black,
          shadowOpacity: 0.4,
          shadowRadius: 5,
          backgroundColor: colors.homebackground,
          elevation: 8,
        }}>
          <ProgressBar percent={cal_per_tier} style={{ marginBottom: 5, marginTop: 5, }} values={tier} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: deviceWidth - 50, alignSelf: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.activeTextTopColor, { color: colors.homeTextbackground }]}>{'0 JOD'}</Text>
              <Text style={[tierActive < 500 ? styles.activeTextColor : styles.InactiveTextColor, { color: colors.homeTextbackground }]}>{'WHITE'}</Text>

            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={[styles.activeTextTopColor, { color: colors.homeTextbackground }]}>{'500 JOD'}</Text>
              <Text style={[tierActive < 1000 && tierActive > 500 ? styles.activeTextColor : styles.InactiveTextColor, { color: colors.homeTextbackground }]}>{'SILVER'}</Text>
            </View>
            <View style={{ alignItems: 'center', marginBottom: 5 }}>
              <Text style={[styles.activeTextTopColor, { color: colors.homeTextbackground }]}>{'1000 JOD'}</Text>
              <Text style={[tierActive > 1000 ? styles.activeTextColor : styles.InactiveTextColor, { color: colors.homeTextbackground }]}>{'BLUE'}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.Subcontainer}>
        <FlatList
          contentContainerStyle={styles.flatListStyle}
          data={DATA}
          renderItem={renderItem}
          numColumns={2}
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
        >
        </FlatList>
      </View>
      {isModalVisible &&
        <BallIndicator visible={isModalVisible} />
      }
    </View>
  );
}

/**
 * UI of HomeScreen
 */
const styles = StyleSheet.create({
  container: {
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

  boxConatiner: {
    height: 180,
    width: (deviceWidth - 30) / 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOpacity: 0.8,
    shadowRadius: 12,
    backgroundColor: commonColors.White,
    elevation: 8,
  },

  nameText: {
    fontSize: 12,
    color: commonColors.Blue,
    fontFamily: Fonts.montserratRegular
  },

  boxStyle: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },

  flatListStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    width: deviceWidth
  },

  bigTitleText: {
    alignSelf: 'center',
    marginTop: 5,
    color: commonColors.Blue,
    fontSize: 24,
    fontFamily: Fonts.montserratMedium
  },

  smallTitleText: {
    alignSelf: 'center',
    color: commonColors.Blue,
    fontSize: 16,
    fontFamily: Fonts.montserratMedium
  },

  textBoxView: {
    height: 25,
    width: 80,
    borderRadius: 3,
    borderWidth: 0.66,
    alignSelf: 'center',
    marginVertical: 10,
    borderColor: commonColors.Blue
  },

  buttonTextStyle: {
    marginTop: 3,
    color: commonColors.Blue,
    alignSelf: 'center',
    fontSize: 14,
    fontFamily: Fonts.montserratRegular
  },

  viewContain: {
    borderRadius: 5,
    shadowColor: commonColors.Black,
    shadowOpacity: 0.4,
    shadowRadius: 5,
  },

  numberStyle: {
    color: commonColors.Blue,
    marginHorizontal: 15,
    fontFamily: Fonts.montserratMedium,
    fontSize: 12
  },

  numberStyleJod: {
    color: commonColors.Blue,
    fontFamily: Fonts.montserratMedium,
    fontSize: 12,
    marginHorizontal: 10,
  },

  numberStyleMiddle: {
    fontFamily: Fonts.montserratMedium,
    color: commonColors.Blue,
    fontSize: 12,
  },

  whitetyle: {
    color: commonColors.Blue,
    fontFamily: Fonts.montserratRegular,
    marginHorizontal: 5,
    fontSize: 14
  },

  silverMiddle: {
    fontFamily: Fonts.montserratRegular,
    color: commonColors.Blue,
    fontSize: 14,
  },

  blueStyle: {
    fontFamily: Fonts.montserratBold,
    color: commonColors.Blue,
    fontSize: 14,
  },

  activeTextColor: {
    fontFamily: Fonts.montserratBold,
    fontSize: 14,
  },

  InactiveTextColor: {
    fontFamily: Fonts.montserratRegular,
    fontSize: 14,
  },

  activeTextTopColor: {
    fontFamily: Fonts.montserratMedium,
    fontSize: 12,
  },
})


