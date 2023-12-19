import { React, useState, useEffect, useRef, importImages, DatePicker, KeyboardAwareFlatList, FlatList, Alert, StyleSheet, Text, OTPInputView, TextInput, View, Header, Image, TouchableWithoutFeedback, TouchableOpacity, Fonts, commonColors, deviceHeight, deviceWidth, ConstantsText, importIconsWhite, Modal, ImagePickerView, useTheme, SwitchView, BallIndicator, WebView, Dimensions } from '../utils/importLibrary'
export default function ProgressBar(props) {
    const { ColorName, colors, icons, setScheme } = useTheme();
    const percent = props.percent;

    return (
        <View style={[styles.container, props.style]}>
            <View style={[{ width: percent > 4? percent +"%" : '11%', alignItems: 'flex-end'}]}>
                <View style={{ alignItems: 'center', minWidth: 35}}>
                    <Text style={[{ color: colors.homeTextbackground ,fontFamily: Fonts.montserratMedium,fontSize:12,textAlign:'center',}, props.percentageTextStyle]}>{props.values}</Text>
                    <View style={[[styles.thumbContainer, { backgroundColor: colors.homeTextbackground }, props.thumbContainerStyle]]}>
                    </View>
                </View>
            </View>
            <View style={[styles.inActiveBar, { backgroundColor: colors.homeTextbackground }]}>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        width: deviceWidth - 50,
        alignSelf: "center"

    },

    title: {
        color: commonColors.White,
        fontFamily: Fonts.montserratBold
    },
    inActiveBar: {
        height: 3,
        backgroundColor: commonColors.Blue,
        borderRadius: 3,
        width: deviceWidth - 50,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: "center",
        //marginTop: 10
    },
    activeBar: {
        height: "100%",
        backgroundColor: commonColors.White,
        borderBottomLeftRadius: 3,
        borderTopLeftRadius: 3,
    },
    thumbContainer: {
        borderRadius: 20,
        backgroundColor: commonColors.Blue,
        width: 2,
        height: 15,
        //height: 25,
        //marginBottom: -2
        //marginBottom: 20,
    },

});