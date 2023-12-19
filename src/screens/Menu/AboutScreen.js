import { React, TouchableOpacity, WebView, FlatList, useState, CommonActions, useEffect, StyleSheet, Text, View, Header, Image, importImages, commonColors, TouchableWithoutFeedback, Fonts, Colors, deviceHeight, deviceWidth, ConstantsText, importIconsWhite, Modal, ImagePickerView, useTheme, SwitchView, BallIndicator, StorageService } from '../../utils/importLibrary'

export default function AboutScreen({ route, navigation }) {
    const { value, name } = route.params

    /**
     * Render Method
     */
    return (
        <View style={{ backgroundColor: commonColors.White, flex: 1 }}>
            <Header
                leftBtnOnPress={() => navigation.goBack()}
                leftBtn={<Image source={importImages.blueBackArrowImage}></Image>}
                style={{ backgroundColor: commonColors.White, justifyContent: 'center' }}
                headerTitle={name}
                titleStyle={styles.fontStyle}
            />
            <WebView source={{ uri: value }}></WebView>
        </View>
    )
}

/**
 * UI of About Screen
 */
const styles = StyleSheet.create({
    fontStyle: {
        alignSelf: 'center',
        fontSize: 18,
        fontFamily: Fonts.montserratBold,
        color: commonColors.Blue,
        textTransform: 'capitalize'
    },
})