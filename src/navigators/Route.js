import { React, useEffect, useFocusEffect, useState, SafeAreaView, NavigationService, TouchableWithoutFeedback, createNativeStackNavigator, useTheme, NavigationContainer, createBottomTabNavigator, createDrawerNavigator, Icon, getFocusedRouteNameFromRoute, View, commonColors, Image, importImages, Platform } from '../utils/importLibrary'

/** IMPORTING SCREENS */

// Splash Screen
import SplashScreen from '../screens/Auth/SplashScreen'

// Auth Screens
import LoginScreen from '../screens/Auth/LoginScreen'
import AuthSelection from '../screens/Auth/AuthSelection'
import VerificationScreen from '../screens/Auth/VerificationScreen'
import SignUpScreen from '../screens/Auth/SignUpScreen'
import QrCodeScreen from '../screens/Auth/QrCodeScreen'

// Home Screens
import HomeScreen from '../screens/Home/HomeScreen'
import PointsScreen from '../screens/Home/PointsScreen'
import SpentScreen from '../screens/Home/SpentScreen'
import NotificationScreen from '../screens/Home/NotificationScreen'
import TierScreen from '../screens/Home/TierScreen'
import PointsDetailsScreen from '../screens/Home/PointsDetailsScreen'
import OrderScreen from '../screens/Home/OrderScreen'

// Card Screen
import CardScreen from '../screens/Card/CardScreen'

// Cart Screen
import CartScreen from '../screens/Cart/CartScreen'

// Scanner Screen
import ScannerScreen from '../screens/Scanner/ScannerScreen'

// Menu Screens
import SettingScreen from '../screens/Menu/SettingScreen'
import AboutScreen from '../screens/Menu/AboutScreen'
import AboutTierScreen from '../screens/Menu/AboutTierScreen'
import MyProfileScreen from '../screens/Menu/MyProfileScreen'
import { StatusBar } from 'react-native'
import InitialScreen from '../screens/Auth/InitialScreen'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
var colorThemes = ''

/**
 * Stack navigation screens
 */
const StackNavigator = () => {
    // console.log('props ==>',props);
    return (
        <Stack.Navigator initialRouteName='InitialScreen'>
            <Stack.Screen name={'InitialScreen'} component={InitialScreen} options={{ headerShown: false,  }} />

            <Stack.Screen name={'SplashScreen'} component={SplashScreen} options={{ headerShown: false, orientation: "portrait", presentation: 'card', animation: 'fade_from_bottom' }} />

            <Stack.Screen name={'AuthSelection'} component={AuthSelection} options={{ headerShown: false, }} />
            <Stack.Screen name={'LoginScreen'} component={LoginScreen} options={{ headerShown: false, }} />
            <Stack.Screen name={'QrCodeScreen'} component={QrCodeScreen} options={{ headerShown: false, }} />
            <Stack.Screen name={'VerificationScreen'} component={VerificationScreen} options={{ headerShown: false, }} />
            <Stack.Screen name={'SignUpScreen'} component={SignUpScreen} options={{ headerShown: false, }} />
            <Stack.Screen name={'TabNavigator'} component={TabNavigator} options={{ headerShown: false, }} />
            <Stack.Screen name={'PointsScreen'} component={PointsScreen} options={{ headerShown: false, }} />
            <Stack.Screen name={'SpentScreen'} component={SpentScreen} options={{ headerShown: false, }} />
            <Stack.Screen name={'AboutScreen'} component={AboutScreen} options={{ headerShown: false, }} />
            <Stack.Screen name={'AboutTierScreen'} component={AboutTierScreen} options={{ headerShown: false, }} />
            <Stack.Screen name={'MyProfileScreen'} component={MyProfileScreen} options={{ headerShown: false, }} />
            <Stack.Screen name={'NotificationScreen'} component={NotificationScreen} options={{ headerShown: false, }} />
            <Stack.Screen name={'TierScreen'} component={TierScreen} options={{ headerShown: false, }} />
            <Stack.Screen name={'PointsDetailsScreen'} component={PointsDetailsScreen} options={{ headerShown: false, }} />
            <Stack.Screen name={'OrderScreen'} component={OrderScreen} options={{ headerShown: false, }} />

        </Stack.Navigator>
    )
}

/**
 * Tab navigation screens
 */
const TabNavigator = () => {
    // console.log('props ==>', props);

    return (
        <Tab.Navigator
            initialRouteName='HomeScreen'
            backBehavior='initialRoute'
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'HomeScreen') {
                        iconName = focused ? importImages.homeiconactive : importImages.homeiconinactive
                    }
                    else if (route.name === 'CardScreen') {
                        iconName = focused ? importImages.cardiconactive : importImages.cardiconinactive
                    }
                    // else if (route.name === 'ScannerScreen') {
                    //     iconName = focused ? importImages.scannericonactive : importImages.scannericoninactive
                    // }
                    else if (route.name === 'CartScreen') {
                        iconName = focused ? importImages.carticonactive : importImages.carticoninactive
                    }
                    else if (route.name === 'SettingScreen') {
                        iconName = focused ? importImages.menuiconactive : importImages.menuiconinactive
                    }
                    return <Image source={iconName}
                    />;
                },
                tabBarStyle: { backgroundColor: commonColors.White },
                // tabBarActiveTintColor: commonColors.Blue,
                // tabBarInactiveTintColor: commonColors.tabBarInactiveTintColor,
                tabBarShowLabel: false,
            })}
        >
            <Tab.Screen name={'HomeScreen'} component={HomeScreen} options={{ headerShown: false, }} />
            <Tab.Screen name={'CardScreen'} component={CardScreen} options={{ headerShown: false, }} />
            {/* <Tab.Screen name={'ScannerScreen'} component={ScannerScreen} options={{ headerShown: false, }} /> */}
            {/* <Tab.Screen name={'CartScreen'} component={CartScreen} options={{ headerShown: false, }} /> */}
            <Tab.Screen name={'SettingScreen'} component={SettingScreen} options={{ headerShown: false, }} />
        </Tab.Navigator>
    )
}

/**
 * Navigation of all screens
 */
export default function Route(props, route) {
    console.log('props ==>', props);
    console.log('route ==>', route);

    const [nameroute, setnameroute] = useState('')
    const { ColorName, colors, icons, setScheme } = useTheme();
    colorThemes = colors

    let SafeAreaVisible = true;

    let navigationContainerRef = null

    return (

        <View style={{ flex: 1, backgroundColor: commonColors.White }}>

            <SafeAreaView style={{ flex: 0, backgroundColor: colors.homebackground }} />

            <SafeAreaView style={{ backgroundColor: nameroute.action == 'SplashScreen' ? colors.homebackground : commonColors.White, flex: 1 }}>

                <NavigationContainer independent={true}
                    onStateChange={() => {
                        var trackEventparam = { action: navigationContainerRef.getCurrentRoute().name }
                        console.log('trackEventparam', trackEventparam);
                        setnameroute(trackEventparam)

                    }}
                    ref={navigator => { NavigationService.setTopLevelNavigator(navigator), navigationContainerRef = navigator }}
                >
                    <StackNavigator />
                </NavigationContainer>
            </SafeAreaView>
        </View>
    );
}
