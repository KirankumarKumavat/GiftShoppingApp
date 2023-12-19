import { React, FlatList, useCallback, useState, ActivityIndicator, moment, importImages, useEffect, useRef, Request, StyleSheet, showSimpleAlert, Text, View, Header, Image, TouchableWithoutFeedback, Fonts, commonColors, deviceHeight, deviceWidth, ConstantsText, importIconsWhite, Modal, ImagePickerView, useTheme, SwitchView, BallIndicator, WebView, TouchableOpacity, Button, ProgressBar } from '../../utils/importLibrary'
export default function PointsScreen({ route, navigation }) {
    const { ColorName, colors, icons, setScheme } = useTheme();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisibleFirst, setModalVisibleFirst] = useState(false);
    const [pointsData, setPointsData] = useState([])
    const [pagenumber, setspagenumber] = useState(10)
    const [shouldFetch, setShouldFetch] = useState(true);
    const [LastRecored, setLastRecored] = useState(0);
    const { viewAll } = route.params

    /**
     * Life cycle method 
     */
    useEffect(() => {
        if (shouldFetch) {
            getPointsList()
        }
    }, [shouldFetch]);

    /** 
     * Api Intigration 
     */
    const getPointsList = async () => {
        const getallComplete = LastRecored == pointsData.length ? false : true
        if (LastRecored > 0) {
            setModalVisibleFirst(getallComplete)
        }
        else {
            setModalVisible(true)
        }
        let obj = { limit: pagenumber }
        let response = await Request.post('get-points.php', obj)
        if (LastRecored > 0) {
            setModalVisibleFirst(false)
        }
        else {
            setModalVisible(false)
        }
        if (response.success == true) {
            setPointsData(response.data)
            if (viewAll != '') {
                setShouldFetch(false);
                setLastRecored(response.total_records)
                setspagenumber(pagenumber + 10)
            }
        }
        else {
            if (response) {
                showSimpleAlert(response.message)
            }
        }
    }
    const fetchMore = () => {
        setShouldFetch(true)
    };

    /**
     * Flatlist render item
     * @param {*} item 
     */
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.transactionView}>
                <TouchableOpacity onPress={() => navigation.navigate('PointsDetailsScreen', { value: item.id })}>
                    <View style={styles.subtransactionView}>
                        <Text style={styles.nametextStyle}>{item.point_type}</Text>
                        <Text style={styles.pointStyle}>{item.points + ' POINTS'}</Text>
                    </View>
                    <Text style={styles.dateTextStyle}>{moment(item.added_date).format('DD MMM YYYY')}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * Flatlist footer render item
     */
    const renderFooter = () => {
        return (
            //Footer View with Load More button
            <View style={styles.footer}>
                {isModalVisibleFirst ?
                    <ActivityIndicator color={commonColors.Blue} style={{ marginLeft: 8 }}
                        size={'large'}
                        hidesWhenStopped={true} />
                    : null}
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
            }}>POINTS</Text>
            <View style={styles.Subcontainer}>
                {pointsData.length > 0 ? <View style={styles.textViewStyle}>
                    <Text style={styles.transactionText} >TRANSACTIONS</Text>
                    {viewAll == '' ?
                        <TouchableOpacity onPress={() => navigation.push('PointsScreen', { viewAll: 'Yes' })}>
                            <Text style={styles.viewAlltext}>VIEW ALL</Text>
                        </TouchableOpacity>
                        : null}
                </View> : null}
                <FlatList
                    data={pointsData}
                    renderItem={renderItem}
                    onEndReachedThreshold={0.01}
                    onEndReached={fetchMore}
                    style={{ flex: 1 }}
                    bounces={false}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.transactionText}>{'No points history found'}</Text>
                    )}
                    contentContainerStyle={pointsData.length > 0 ? {} : { flexGrow: 1, justifyContent: 'center' }}
                    ListFooterComponent={renderFooter}
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
 * UI of Points Screen
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

    textViewStyle: {
        flexDirection: 'row',
        marginTop: 40,
        width: deviceWidth - 40,
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    transactionText: {
        color: commonColors.Blue,
        fontSize: 20,
        fontFamily: Fonts.montserratMedium
    },

    viewAlltext: {
        color: commonColors.Blue,
        fontSize: 12,
        fontFamily: Fonts.montserratRegular,
    },

    transactionView: {
        marginTop: 22,
        width: deviceWidth - 40,
    },

    subtransactionView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    nametextStyle: {
        color: commonColors.Blue,
        fontSize: 16,
        fontFamily: Fonts.montserratMedium,
    },

    dateTextStyle: {
        color: commonColors.Blue,
        fontSize: 12,
        fontFamily: Fonts.montserratMedium,
    },

    pointStyle: {
        color: commonColors.Blue,
        fontSize: 12,
        fontFamily: Fonts.montserratRegular,
    },

    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})


