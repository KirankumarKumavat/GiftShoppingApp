/**
 * All libraries of app
 */
import React, { Component, useState, useEffect, useContext, useCallback, useReducer, useRef } from 'react';
import {
   AppState, AppRegistry, ScrollView, StyleSheet, View, SafeAreaView, Text, TextInput, Image, TouchableWithoutFeedback, TouchableOpacity,
   useWindowDimensions, Button, Platform, Dimensions, Modal, Easing, Animated, Alert, ActivityIndicator, FlatList, Keyboard, SectionList,
   DeviceEventEmitter, NativeAppEventEmitter, Clipboard, I18nManager
} from 'react-native';
import { Shape, Path, Surface } from '@react-native-community/art';
import { NavigationContainer, getFocusedRouteNameFromRoute, useFocusEffect, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
import ImagePicker from 'react-native-image-crop-picker';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { KeyboardAwareScrollView, KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import NetInfo from "@react-native-community/netinfo";
import PhoneInput from "react-native-phone-number-input";
import RNQRGenerator from 'rn-qr-generator';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { WebView } from 'react-native-webview';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import messaging from '@react-native-firebase/messaging';
import { showMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message";
import PushNotification from '../utils/PushNotification';
import SmsRetriever from 'react-native-sms-retriever';
import RenderHtml from 'react-native-render-html';
import CountDown from 'react-native-countdown-component';

/**
 * All paths of components and utils
 */
import { importImages, importIconsWhite, importIconsSilver, importIconsBlue, importIconsCommon } from './importImages'
import NavigationService from './NavigationService'
import { ConstantsText, ConstantsKey, deviceWidth, deviceHeight, statusbarHeight, deviceType } from '../constants'
import { whiteThemeColors, silverThemeColors, blueThemeColors, commonColors } from './colorThemes';
import { Fonts } from './font'
import Header from '../components/Header'
import BallIndicator from '../components/BallIndicator'
import SwitchView from '../components/SwitchView'
import ImagePickerView from '../components/ImagePickerView'
import ProgressBar from '../components/ProgressBar'
import { ThemeProvider, useTheme } from '../components/ThemeProvider';
import Route from '../navigators/Route'
import Request from '../api/Request';
import apiConfigs from '../api/apiConfig'
import showSimpleAlert from '../utils/showSimpleAlert'
import StorageService from '../utils/StorageService'
import HelperFunction, { isValidEmail } from '../utils/HelperFunction'

export {
   ScrollView,
   ActivityIndicator,
   AppState,
   useState,
   useEffect,
   useContext,
   useCallback,
   useReducer,
   useRef,
   NavigationContainer,
   createNativeStackNavigator,
   getFocusedRouteNameFromRoute,
   createBottomTabNavigator,
   useFocusEffect,
   Header,
   React,
   Component,
   AppRegistry,
   StyleSheet,
   View,
   Alert,
   TouchableWithoutFeedback,
   TouchableOpacity,
   Text,
   TextInput,
   SafeAreaView,
   Image,
   Button,
   Icon,
   Dimensions,
   Modal,
   importImages,
   importIconsWhite,
   importIconsSilver,
   importIconsBlue,
   importIconsCommon,
   ConstantsText,
   ConstantsKey,
   deviceWidth,
   deviceHeight,
   statusbarHeight,
   commonColors,
   Fonts,
   DeviceInfo,
   Platform,
   ImagePicker,
   ImagePickerView,
   ThemeProvider,
   whiteThemeColors,
   silverThemeColors,
   blueThemeColors,
   useTheme,
   Route,
   SwitchView,
   Animated,
   Shape,
   Path,
   Easing,
   Surface,
   BallIndicator,
   OTPInputView,
   FlatList,
   SectionList,
   KeyboardAwareScrollView,
   KeyboardAwareFlatList,
   DatePicker,
   ProgressBar,
   moment,
   deviceType,
   Request,
   apiConfigs,
   NetInfo,
   showSimpleAlert,
   StorageService,
   PhoneInput,
   RNQRGenerator,
   CommonActions,
   QRCodeScanner,
   RNCamera,
   WebView,
   Keyboard,
   Table,
   TableWrapper,
   Row,
   Rows,
   Col,
   Cols,
   Cell,
   HelperFunction,
   isValidEmail,
   messaging,
   showMessage,
   FlashMessage,
   PushNotification,
   SmsRetriever,
   DeviceEventEmitter,
   NativeAppEventEmitter,
   Clipboard,
   NavigationService,
   RenderHtml,
   useWindowDimensions,
   CountDown,
   I18nManager
}