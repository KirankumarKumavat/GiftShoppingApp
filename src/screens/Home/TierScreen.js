import { React, ScrollView, Text, Table, TableWrapper, Row, Rows, Col, BallIndicator, Cols, Cell, useState, useEffect, View, importImages, PhoneInput, StyleSheet, TouchableOpacity, Image, Alert, Fonts, TextInput, commonColors, deviceWidth, Request, useWindowDimensions, RenderHtml, showSimpleAlert, Header, useTheme, FlatList } from '../../utils/importLibrary';
import { defaultSystemFonts } from 'react-native-render-html';

export default function TierScreen({ route, navigation }) {
    const { ColorName, colors, icons, setScheme } = useTheme();
    const [isModalVisible, setModalVisible] = useState(false);
    const [tableHead, setTableHead] = useState([['', 'WHITE', 'SILVER', 'BLUE']]);
    const [artical, setartical] = useState({});
    const [tableData, setTableData] = useState(
        [
            // ['Spenditure[JOD]', 'Discount Or Points',
            //     'Free Shipping Standard', 'Birthday Gift', 'Share your purchase', 'Rating'],
            // ['<500', '%5 Or %10', 'Min. JOD xx', <Image source={importImages.crossImage} style={{ marginLeft: 10 }} />,
            //     'x Points', 'x Points'],
            // ['50 - 1000', '%10 Or %15', 'Min. JOD xx', 'xx Points', 'x Points', 'x Points'],
            // ['>1000', '%20 Or %25', 'No min.', 'xx Points', 'x Points', 'x Points'],
        ]
    )
    const { width } = useWindowDimensions();
    const [arrayheight, setarrayheight] = useState([]);
    /** 
     * Life cycle method 
     */
    useEffect(() => {
        getSpentList()
    }, []);

    /** 
     * Api Intigration 
     */
    const getSpentList = async () => {
        setModalVisible(true)
        setarrayheight([])
        let response = await Request.post('get-tier.php')
        console.log('responseresponse==>', response);
        setModalVisible(false)
        if (response.success == true) {

            var data = response.data.tiers
            var namearray = data[0].rewards
            var whitearray = data[1].rewards
            var silverarray = data[2].rewards
            var bluarray = data[3].rewards
            var array0 = [], array1 = [], array2 = [], array3 = []
            namearray.map((item, index) => {
                array0.push(item)
                array1.push(whitearray[index])
                array2.push(silverarray[index])
                array3.push(bluarray[index])
                arrayheight.push(50)
            })
            console.log("array0, array1, array2, array3", array0, array1, array2, array3);
            var array = [array0, array1, array2, array3]
            console.log("array", array);

            // var array = [
            //     [namearray['0'], namearray['1'], namearray['2'], namearray['3'],namearray['4'], namearray['5']],
            //     [whitearray['0'], whitearray['1'], whitearray['2'], whitearray['3'],
            //     whitearray['4'], whitearray['5']],
            //     [silverarray['0'], silverarray['1'], silverarray['2'], silverarray['3'], silverarray['4'], silverarray['5']],
            //     [bluarray['0'], bluarray['1'], bluarray['2'], bluarray['3'], bluarray['4'], bluarray['5']],
            // ]
            setarrayheight(arrayheight)
            setartical(response.data.articale)
            setTableData(array)
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
            }}>{'TIER'}</Text>
            <View style={styles.Subcontainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {/* <View style={styles.textContainer}>
                        <Text style={styles.textgiftStyle}>{artical != undefined ? artical.article_name : ''}</Text>
                    </View> */}
                    <RenderHtml
                        contentWidth={width}
                        source={{ html: artical.article_content }}
                        systemFonts={[...defaultSystemFonts, 'Montserrat-Bold', 'Montserrat-Regular']}
                        tagsStyles={{
                            p: { fontWeight: '400', fontFamily: Fonts.montserratRegular,  },
                            h1: { fontWeight: '600', fontFamily: Fonts.montserratBold,  },
                            h4: { fontFamily: Fonts.montserratBold, fontWeight: '600',},
                            em: { fontWeight: '400', fontFamily: Fonts.montserratRegular, },
                            i: {
                               fontStyle: "italic",
                               backgroundColor:'green'
                            },
                        }}
                    />
                    <View style={styles.lineStyle}></View>

                    <View style={styles.tableContanier}>
                        <Table borderStyle={{}}>
                            {
                                tableHead.map((rowData, index) => (
                                    <TableWrapper key={index} style={{ flexDirection: 'row', }}>
                                        {
                                            rowData.map((cellData, cellIndex) => (
                                                console.log("cellData====>", cellData),
                                                <Cell key={cellIndex} data={cellData} textStyle={cellIndex == 3 ? styles.texth : styles.text} style={cellIndex == 0 ? [styles.title, {}] : cellIndex == 1 ? [styles.stylewhiteh, { height: 22, marginBottom: 15,backgroundColor:commonColors.Grey }] : cellIndex == 2 ? [styles.stylesilverh, { height: 22, marginBottom: 15, backgroundColor: commonColors.lightGreen }] : [styles.stylesblueh, { height: 22, marginBottom: 15, backgroundColor: commonColors.Blue }]} />
                                            ))
                                        }
                                    </TableWrapper>
                                ))
                            }
                            <TableWrapper style={styles.wrapper}>
                                {
                                    tableData.map((rowData, index) => (
                                        console.log("rowData", rowData),
                                        <Col data={rowData} style={index == 0 ? styles.title : index == 1 ? styles.stylewhite : index == 2 ? styles.stylesilver : styles.stylesblue} heightArr={arrayheight} textStyle={styles.tableTitletext} />
                                    ))
                                }
                            </TableWrapper>
                        </Table>
                    </View>
                </ScrollView>
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
        // paddingTop: 34,
    },

    TierTextStyle: {
        color: commonColors.Blue,
        fontFamily: Fonts.montserratMedium,
        fontSize: 24,
        marginLeft: 25,
    },

    textgiftStyle: {
        alignSelf: 'center',
        color: commonColors.White,
        fontSize: 16,
        fontFamily: Fonts.montserratBold
    },

    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.4,
        height: 25,
        width: deviceWidth - 80,
        alignSelf: 'center',
        backgroundColor: commonColors.Blue,
        borderRadius: 3
    },

    texthowitStyle: {
        marginVertical: 15,
        fontSize: 16,
        fontFamily: Fonts.montserratMedium,
        color: commonColors.Blue,
        alignSelf: 'center',
    },

    rewardsTextStyle: {
        fontFamily: Fonts.montserratMedium,
        alignSelf: 'center',
        fontSize: 12,
        color: commonColors.Blue,
    },

    earnpointsTectStyle: {
        fontFamily: Fonts.montserratMedium,
        marginTop: 5,
        alignSelf: 'center',
        fontSize: 12,
        color: commonColors.Blue,
    },

    earnEverydayPontsStyle: {
        fontFamily: Fonts.montserratMedium,
        marginTop: 7,
        alignSelf: 'center',
        fontSize: 12,
        color: commonColors.Blue,
    },

    redeemTextStyle: {
        fontFamily: Fonts.montserratMedium,
        alignSelf: 'center',
        fontSize: 12,
        color: commonColors.Blue,
    },

    firstTextStyle: {
        fontFamily: Fonts.montserratMedium,
        alignSelf: 'center',
        fontSize: 12,
        color: commonColors.Blue,
    },

    expireTextStyle: {
        fontFamily: Fonts.montserratMedium,
        alignSelf: 'center',
        fontSize: 12,
        color: commonColors.Blue,
        marginTop: 10
    },

    lineStyle: {
        marginTop: 20,
        borderBottomColor: commonColors.Blue,
        borderBottomWidth: 1,
        width: deviceWidth - 180,
        alignSelf: 'center'
    },

    whiteTextStyle: {
        borderRadius: 4,
        borderWidth: 0.4,
        height: 20,
        width: deviceWidth - 400,
        fontSize: 14,
        fontFamily: Fonts.montserratBold,
        color: commonColors.Blue
    },

    silverTextStyle: {
        borderRadius: 4,
        borderWidth: 0.4,
        height: 20,
        width: deviceWidth - 400,
        fontSize: 14,
        fontFamily: Fonts.montserratBold,
        color: commonColors.Blue
    },

    blueTextStyle: {
        borderRadius: 4,
        borderWidth: 0.4,
        height: 20,
        width: deviceWidth - 350,
        fontSize: 14,
        backgroundColor: commonColors.Blue,
        fontFamily: Fonts.montserratBold,
        color: commonColors.White
    },

    nametextStyle: {
        fontSize: 10,
        color: commonColors.Blue
    },

    nametextStyle1: {
        fontSize: 10,
        color: commonColors.Blue
    },

    tableContanier: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },

    head: {
        height: 25,
    },

    wrapper: {
        flexDirection: 'row'
    },

    subWrapper: {
        flex: 3,
        borderWidth: 0.5,
        borderRadius: 5,
        shadowColor: 'gray',
        shadowOpacity: 0.8,
        shadowRadius: 12,
    },

    title: {
        flex: 2,
    },

    row: {
        height: 50,
    },

    text: {
        textAlign: 'center',
        fontFamily: Fonts.montserratBold,
        fontSize: 14,
        color: commonColors.White,
    },

    texth: {
        textAlign: 'center',
        fontFamily: Fonts.montserratBold,
        fontSize: 14,
        color: commonColors.White,
    },

    tableTitletext: {
        fontFamily: Fonts.montserratMedium,
        fontSize: 10,
        color: commonColors.Blue,
    },

    textwhitebluesilver: {
        height: 15,
        width: (deviceWidth - 400) / 2,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'gray',
        shadowOpacity: 0.8,
        shadowRadius: 12,
        backgroundColor: commonColors.White,
        elevation: 8,
        color: commonColors.Blue,
        fontSize: 14,
        textAlign: 'center',
        fontFamily: Fonts.montserratBold,
    },

    stylewhite: {
        flex: 1,
        alignItems: 'center',
        shadowColor: 'gray',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 8,
        elevation: 8,
    },

    stylewhiteh: {
        flex: 1,
        alignItems: 'center',
        shadowColor: 'gray',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderRadius: 4,
        elevation: 8,
    },

    stylesilver: {
        flex: 1,
        alignItems: 'center',
        shadowColor: 'gray',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        elevation: 8,
        marginStart: 10
    },

    stylesilverh: {
        flex: 1,
        alignItems: 'center',
        shadowColor: 'gray',
        shadowOpacity: 1,
        shadowRadius: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 4,
        elevation: 8,
        marginStart: 10
    },

    stylesblue: {
        flex: 1,
        alignItems: 'center',
        shadowColor: 'gray',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        backgroundColor: '#D9DFE5',
        borderRadius: 8,
        elevation: 8,
        marginStart: 10
    },

    stylesblueh: {
        flex: 1,
        alignItems: 'center',
        shadowColor: 'gray',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        backgroundColor: '#D9DFE5',
        borderRadius: 4,
        elevation: 8,
        marginStart: 10
    },
})