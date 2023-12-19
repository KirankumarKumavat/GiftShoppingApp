
import { React, TextInput, Text, View, ThemeProvider, Image, deviceWidth, deviceHeight, Route, StyleSheet, commonColors, Fonts, importImages, PushNotification, FlashMessage, I18nManager, useEffect, SafeAreaView, NavigationService } from './src/utils/importLibrary'
import { renderFlashMessageIcon, } from "react-native-flash-message";

export default function App(props) {

  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.allowFontScaling = false;
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;
  const renderFlashMessageIcon = (icon = 'success', style = {}, customProps = {}) => {
    switch (icon) {
      case 'appIcon': // casting for your custom icons and render then
        return (
          <Image source={importImages.appIcon} style={styles.iconStyle} />
        );
      default:
        return renderFlashMessageIcon(icon, style, customProps);
    }
  }
  const renderCustomContent = (message) => {
    if (message.backgroundColor != '') {
      return (
        <View style={{ marginStart: 10, }}>
          <Text style={styles.discountText}>{message.color}</Text>
          <Image source={{ uri: message.backgroundColor }} style={styles.iconStyle2} resizeMode='stretch' />
        </View>
      );
    }
    else {
      return (
        <View style={{ marginStart: 10, }}>
          <Text style={styles.discountText}>{message.color}</Text>
        </View>
      );
    }

  }
  return (
      <ThemeProvider>
        <Route />
        <FlashMessage
          style={styles.flashmessage}
          floating={true}
          hideStatusBar={false}
          duration={5000}
          position="top"
          renderFlashMessageIcon={renderFlashMessageIcon}
          renderCustomContent={renderCustomContent}

        />
        <PushNotification />
      </ThemeProvider>
  );
}
const styles = StyleSheet.create({
  flashmessage: {
    backgroundColor: 'white',
    borderRadius: 20
  },
  iconStyle: {
    height: 30,
    width: 30
  },
  iconStyle2: {
    height: 100,
    width: deviceWidth - 120,
    alignSelf: 'center',
    borderRadius: 5

  },

  discountText: {
    fontSize: 12,
    marginBottom: 10,
    marginTop: 5,
    fontFamily: Fonts.montserratRegular,
    color: commonColors.Blue,
    textAlign: 'justify',
    width: deviceWidth - 120,
  },
})