import { React, FlatList, useCallback, ActivityIndicator, moment, useState, importImages, useEffect, useRef, Request, showSimpleAlert, StyleSheet, Text, View, Header, Image, TouchableWithoutFeedback, Fonts, commonColors, deviceHeight, deviceWidth, ConstantsText, importIconsWhite, Modal, ImagePickerView, useTheme, SwitchView, BallIndicator, WebView, TouchableOpacity, Button, ProgressBar } from '../../utils/importLibrary'
export default function SpentScreen({ route, navigation }) {
    const { ColorName, colors, icons, setScheme } = useTheme();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisibleFirst, setModalVisibleFirst] = useState(false);
    const [spentData, setspentData] = useState([])
    const [pagenumber, setspagenumber] = useState(10)
    const [shouldFetch, setShouldFetch] = useState(true);
    const [LastRecored, setLastRecored] = useState(0);
    const { viewAll } = route.params

    /**
     * Life cycle method 
     */
    useEffect(() => {
        if (shouldFetch) {
            getSpentList()
        }
    }, [shouldFetch]);

    /** 
     * Api Intigration 
     */
    const getSpentList = async () => {
        const getallComplete = LastRecored == spentData.length ? false : true
        if (LastRecored > 0) {
            setModalVisibleFirst(getallComplete)
        }
        else {
            setModalVisible(true)
        }
        let obj = { limit: pagenumber }
        let response = await Request.post('get-spent-data.php', obj)
        if (LastRecored > 0) {
            setModalVisibleFirst(false)
        }
        else {
            setModalVisible(false)
        }
        if (response.success == true) {
            setspentData(response.data.records)
            if (viewAll != '') {
                setShouldFetch(false);
                setLastRecored(response.data.total_records)
                setspagenumber(pagenumber + 5)
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
    const renderItem = ({ item }) => {
        return (
            <View style={styles.transactionView}>
                <TouchableOpacity onPress={() => navigation.navigate('OrderScreen', { value: item.id })}>
                    <View style={styles.subtransactionView}>
                        <Text style={styles.nametextStyle}>{item.store_name}</Text>
                        <Text style={styles.pointStyle}>{Number(item.amount).toFixed(2) + ' JOD'}</Text>
                    </View>
                    <Text style={styles.dateTextStyle}>{moment(item.sale_date).format('DD MMM YYYY')}</Text>
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
        <View style={{ backgroundColor: colors.homebackground, flex: 1, justifyContent: 'space-between' }}>
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
            }}>SPENT</Text>
            <View style={styles.Subcontainer}>
                {spentData.length > 0 ? <View style={styles.textViewStyle}>
                    <Text style={styles.transactionText} >TRANSACTIONS</Text>
                    {viewAll == '' ?
                        <TouchableOpacity onPress={() => navigation.push('SpentScreen', { viewAll: 'Yes' })}>
                            <Text style={styles.viewAlltext}>VIEW ALL</Text>
                        </TouchableOpacity>
                        : null}
                </View>
                    : null}
                <FlatList
                    data={spentData}
                    renderItem={renderItem}
                    onEndReachedThreshold={0.01}
                    onEndReached={fetchMore}
                    style={{}}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={() => (
                        <Text style={styles.transactionText}>{'No spending history found'}</Text>
                    )
                    }
                    contentContainerStyle={spentData.length > 0 ? {} : { flexGrow: 1, justifyContent: 'center' }}
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
 * UI of Spent Screen
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
        fontFamily: Fonts.montserratRegular
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




