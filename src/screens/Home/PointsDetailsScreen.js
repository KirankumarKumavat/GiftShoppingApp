import { React, FlatList, useState, importImages, useEffect, useRef, moment, StyleSheet, Text, View, Header, Image, showSimpleAlert, TouchableWithoutFeedback, Fonts, commonColors, deviceHeight, deviceWidth, ConstantsText, importIconsWhite, Modal, ImagePickerView, useTheme, SwitchView, WebView, TouchableOpacity, Button, ProgressBar, BallIndicator, Request } from '../../utils/importLibrary'
export default function PointsDetailsScreen({ route, navigation, item }) {
    const { ColorName, colors, icons, setScheme } = useTheme();
    const [isModalVisible, setModalVisible] = useState(false)
    const [detailsData, setDetailsData] = useState([])

    /**
     * Life cycle method 
     */
    useEffect(() => {
        PointsDetails_Api()
    }, []);

    /** 
     * Api Intigration 
     */
    const PointsDetails_Api = async () => {
        let params = {
            id: route.params.value
        }
        setModalVisible(true)
        let response = await Request.post('get-point-detail.php', params)
        setModalVisible(false)
        if (response.success == true) {
            setDetailsData([response.data])
        }
        else {
            if (response) {
                showSimpleAlert(response.message)
            }
        }
    }

    /**
     * Flatlist render method
     * @param {*} item 
     */
    const renderItem = ({ item, index }) => {
        return (
            <View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
                        <Text style={styles.pointstext}>{'Point Type'}</Text>
                        <View style={{ alignItems: 'flex-start', width: '50%' }}>
                            <Text style={styles.datatext}>{item.point_type}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
                        <Text style={styles.pointstext}>{'Point In'}</Text>
                        <View style={{ alignItems: 'flex-start', width: '50%' }}>
                            <Text style={styles.datatext}>{item.point_in}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
                        <Text style={styles.pointstext}>{'Point Out'}</Text>
                        <View style={{ alignItems: 'flex-start', width: '50%' }}>
                            <Text style={styles.datatext}>{item.point_out}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
                        <Text style={styles.pointstext}>{'Invoice No.'}</Text>
                        <View style={{ alignItems: 'flex-start', width: '50%' }}>
                            <Text style={styles.datatext}>{item.invoice_no}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
                        <Text style={styles.pointstext}>{'Created Date'}</Text>
                        <View style={{ alignItems: 'flex-start', width: '50%' }}>
                            <Text style={styles.datatext}>{moment(item.created_date).format('YYYY/MM/DD')}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
                        <Text style={styles.pointstext}>{'Valid Date'}</Text>
                        <View style={{ alignItems: 'flex-start', width: '50%' }}>
                            <Text style={styles.datatext}>{moment(item.valid_date).format('YYYY/MM/DD')}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginTop: 5, marginBottom: 5 }}>
                        <Text style={styles.pointstext}>{'Point Balance'}</Text>
                        <View style={{ alignItems: 'flex-start', width: '50%' }}>
                            <Text style={styles.datatext}>{item.point_balance}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    /**
     * render Method
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
            }}>POINTS</Text>
            <View style={styles.Subcontainer}>

                <View style={styles.textViewStyle}>
                    {detailsData.length > 0 ?
                        <Text style={styles.transactionText}>POINTS DETAILS</Text>
                        : null}
                </View>
                <FlatList
                    data={detailsData}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                >
                </FlatList>
            </View>
            {isModalVisible && <BallIndicator visible={true}></BallIndicator>}
        </View >
    );
}

/**
 * UI of PointsDetails Screen
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
        alignItems: 'center',
        justifyContent: 'center'
    },

    container: {
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 10,
        borderWidth: 0.33,
        borderRadius: 5 / 2,
        width: deviceWidth - 25,
        borderColor: commonColors.Grey,
    },

    textViewStyle: {
        flexDirection: 'row',
        marginTop: 40,
        width: deviceWidth - 40,
    },

    transactionText: {
        color: commonColors.Blue,
        fontSize: 20,
        fontFamily: Fonts.montserratMedium
    },

    pointstext: {
        fontFamily: Fonts.montserratMedium,
        fontSize: 14,
        color: commonColors.Blue,
    },

    datatext: {
        fontFamily: Fonts.montserratMedium,
        fontSize: 14,
        color: commonColors.Blue,
    }
})


