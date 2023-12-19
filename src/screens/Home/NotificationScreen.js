import { React, Text, useState, useEffect, AppState, moment, View, importImages, useFocusEffect, PhoneInput, StyleSheet, BallIndicator, TouchableOpacity, Image, Alert, Fonts, TextInput, commonColors, deviceWidth, Request, showSimpleAlert, Header, useTheme, FlatList } from '../../utils/importLibrary';
export default function NotificationScreen({ route, navigation }) {
    const { ColorName, colors, icons, setScheme } = useTheme();
    const [isModalVisible, setModalVisible] = useState(false);
    const [notificationData, setnotificationData] = useState([])
    let appState = AppState.currentState

    /** 
     * Life cycle method 
    */
    useEffect(() => {
        AppState.addEventListener('change', _handleAppStateChange);
        getNotificationList()
    }, []);

    /**
     * Api Intigration
     */
    const getNotificationList = async () => {
        setModalVisible(true)
        let response = await Request.post('get-notifications.php')
        console.log('responseresponsennnn',response);
        setModalVisible(false)
        if (response.success == true) {
            setnotificationData(response.data)
        }
        else {
            if (response) {
                showSimpleAlert(response.message)
            }
        }
    }

    /**
     * _handleAppStateChange function set notification in all state of app
     * @param {*} nextAppState 
     */
    const _handleAppStateChange = (nextAppState) => {
        if (appState.match(/inactive|background/) && nextAppState === 'active') {
            getNotificationList()
        }
        appState = nextAppState;
    }

    /**
     * Flatlist render method
     * @param {*} item 
     * @returns 
     */
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.transcationView}>
                <Text style={styles.dateStyle}>{moment(item.created_at, 'YYYY-MM-DD hh:mm:ss').format('ddd DD MMM hh:mm a').toString()}</Text>
                <View style={styles.databoxTextStyle}>
                    <Text style={styles.dataText}>{item.title}</Text>
                    <Text style={styles.discountText}>{item.content}</Text>
                    {item.image != '' ?
                        <Image source={{ uri: item.image }} style={styles.iconStyle2} resizeMode='stretch' />
                        : null}
                    {item.visit != '' ? <Text style={styles.visitTextStyle}>{item.visit}</Text> : <View style={{ marginTop: 10 }}></View>}
                    <TouchableOpacity onPress={() => navigation.navigate('AboutScreen', { value: item.link })}>
                        <Text style={styles.linkText}>{item.link}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
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
            <Text style={{
                color: colors.homeTextbackground,
                fontSize: 24,
                marginLeft: 40,
                fontFamily: Fonts.montserratMedium,
                marginBottom: 30
            }}>{'NOTIFICATIONS'}</Text>
            <View style={styles.Subcontainer}>
                <FlatList
                    style={{ marginTop: 25 }}
                    data={notificationData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.transactionText}>{'No notifications found'}</Text>
                    )}
                    contentContainerStyle={notificationData.length > 0 ? {} : { flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
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
 * UI of Notification screen
 */
const styles = StyleSheet.create({
    Subcontainer: {
        flex: 1,
        backgroundColor: commonColors.White,
        shadowColor: commonColors.Black,
        shadowOpacity: 0.4,
        shadowRadius: 5,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        elevation: 8,
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

    transactionText: {
        color: commonColors.Blue,
        fontSize: 20,
        fontFamily: Fonts.montserratMedium
    },

    transcationView: {
        marginBottom: 20,
        alignSelf: 'center'
    },

    dateStyle: {
        marginLeft: 12,
        fontSize: 10,
        color: commonColors.Blue,
        fontFamily: Fonts.montserratRegular,
    },

    databoxTextStyle: {
        marginTop: 6,
        width: deviceWidth - 40,
        borderRadius: 12,
        shadowColor: 'gray',
        shadowOpacity: 1,
        shadowRadius: 6,
        backgroundColor: commonColors.White,
        elevation: 8,
        alignSelf: 'center'
    },

    dataText: {
        fontSize: 14,
        marginHorizontal: 10,
        marginTop: 10,
        fontFamily: Fonts.montserratSemiBold,
        color: commonColors.Blue,
    },

    discountText: {
        fontSize: 12,
        marginHorizontal: 10,
        fontFamily: Fonts.montserratRegular,
        color: commonColors.Blue,
        textAlign: 'justify'
    },

    iconStyle2: {
        height: 100,
        width: deviceWidth - 120,
        borderRadius: 5,
        marginHorizontal: 10,
        marginTop: 10,
    },

    linkText: {
        marginHorizontal: 10,
        marginBottom: 10,
        fontSize: 12,
        color: "#0086FF",
        fontFamily: Fonts.montserratRegular
    },

    visitTextStyle: {
        marginHorizontal: 10,
        color: commonColors.Blue,
        fontSize: 10,
        marginTop: 10,
        fontFamily: Fonts.montserratSemiBold
    }

})