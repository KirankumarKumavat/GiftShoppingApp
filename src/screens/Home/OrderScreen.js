import { React, showSimpleAlert, Request, FlatList, moment, useState, importImages, useEffect, useRef, StyleSheet, Text, View, Header, Image, TouchableWithoutFeedback, Fonts, commonColors, deviceHeight, deviceWidth, ConstantsText, importIconsWhite, Modal, ImagePickerView, useTheme, SwitchView, BallIndicator, WebView, TouchableOpacity, Button, ProgressBar, SectionList } from '../../utils/importLibrary'
export default function PointsDetailsScreen({ route, navigation }) {
    const { ColorName, colors, icons, setScheme } = useTheme();
    const [isModalVisible, setModalVisible] = useState(false);
    const [orderData, setOrderData] = useState([])

    /**
     * Life cycle method 
     */
    useEffect(() => {
        getOrderDetailsList()
    }, []);

    /**
     * Api Intigration
     */
    const getOrderDetailsList = async () => {
        setModalVisible(true)
        let param = {
            id: route.params.value
        }
        let response = await Request.post('get-order-detail.php', param)
        if (response.success == true) {
            setOrderData(response.data)
            setModalVisible(false)
        }
        else {
            setModalVisible(false)
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
                        <Text style={styles.nametext}>{item.name}</Text>
                        <View style={{ alignItems: 'flex-start', width: '50%', }}>
                            <Text style={[styles.datatext,]}>{item.value}</Text>
                        </View>
                    </View>
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
            }}>ORDER</Text>
            <View style={styles.Subcontainer}>
                <View style={{ marginTop: 30 }}>
                    <SectionList
                        sections={orderData}
                        style={{ flex: 1, marginBottom: 20 }}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => item + index}
                        renderItem={renderItem}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={styles.textViewStyle}>
                                <Text style={styles.orderText}>{title}</Text>
                            </View>
                        )}
                    >
                    </SectionList>
                </View>
            </View>
            {isModalVisible &&
                <BallIndicator visible={isModalVisible} />
            }
        </View>
    );
}

/**
 * UI of Order Screen
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
        marginTop: 5,
        borderWidth: 0.33,
        borderRadius: 5 / 2,
        width: deviceWidth - 25,
        borderColor: commonColors.Grey,
    },

    textViewStyle: {
        marginTop: 11,
        width: deviceWidth - 40,
    },

    orderText: {
        color: commonColors.Blue,
        fontSize: 16,
        fontFamily: Fonts.montserratSemiBold,
    },

    nametext: {
        fontFamily: Fonts.montserratMedium,
        fontSize: 12,
        color: commonColors.Blue,
    },

    datatext: {
        fontFamily: Fonts.montserratMedium,
        fontSize: 12,
        color: commonColors.Blue,
    },
})


