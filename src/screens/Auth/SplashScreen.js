import { React, View, Text, Fragment, importImages, Image, useEffect, useTheme, commonColors, StorageService, CommonActions } from '../../utils/importLibrary'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SplashScreen({ route, navigation }) {
   console.log('route ===>', route);
   const { ColorName, colors, icons, setScheme } = useTheme();
   
   /** 
   * Life cycle method 
   */
   useEffect((props) => {
      console.log('props ===>',props);
      load()
   }
   )

   /**
    * Session management of screens
    */
   const load = async () => {
      const userData = await StorageService.getItem(StorageService.STORAGE_KEYS.USER_DETAILS);
      if (userData != null) {
         setTimeout(function () {
            setScheme('white')
            const resetAction = CommonActions.reset({
               index: 0,
               routes: [{ name: "TabNavigator" }]
            });
            navigation.dispatch(resetAction);
         }, 3000);
      }
      else {
         setTimeout(function () {
            const resetAction = CommonActions.reset({
               index: 0,
               routes: [{ name: "AuthSelection" }]
            });
            navigation.dispatch(resetAction);
         }, 3000);
      }
   }

   /**
    * Render Method
    */
   return (
      // <View>
      //    <SafeAreaView style={{ flex: 0, backgroundColor: 'red' }} />
      //    <SafeAreaView style={{ flex: 1, backgroundColor: 'yellow' }}>
      //       <View style={{ flex: 1, backgroundColor: 'green' }} />
      //    </SafeAreaView>
      // </View>
      
      <SafeAreaView style={{ backgroundColor: commonColors.Blue, flex: 1, justifyContent: 'center', }}

      >
         <Image source={importImages.splashImg} style={{ alignSelf: 'center', height: 270, width: 270 }} />
      </SafeAreaView>

      // <View style={{ flex: 1 }}>
      //    <View style={{ flex: 1 }}>
      //       <SafeAreaView style={{ flex: 1 }}>
      //          <View style={{ flex: 1 }}>
      //             <Text>Content Goes here</Text>
      //          </View>
      //       </SafeAreaView>
      //    </View>
      //    <View style={{ flexDirection: 'row', flex: 0 }}>
      //       <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }} />
      //       <SafeAreaView style={{ flex: 1, backgroundColor: 'green' }} />
      //    </View>
      // </View>
   );
}